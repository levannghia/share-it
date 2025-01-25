import { View, Text } from 'react-native'
import React, { createContext, FC, useCallback, useContext, useState } from 'react'
import { useChunkStore } from '../db/chunkState';
import TCPSocket from 'react-native-tcp-socket';
import DeviceInfo from 'react-native-device-info';

interface TCPContextType {
    server: any;
    client: any;
    isConnected: boolean;
    connectedDevice: any;
    sentFiles: any;
    receivedFiles: any;
    totalSentBytes: number;
    totalReceivedBytes: number;
    startServer: (port: number) => void;
    connectToServer: (host: string, port: number, deviceName: string) => void;
    sendMessage: (message: string | Buffer) => void;
    sendFileAck: (file: any, type: 'file' | 'image') => void;
    disconnect: () => void;
}

const TCPContext = createContext<TCPContextType | undefined>(undefined)

export const useTCP = (): TCPContextType => {
    const context = useContext(TCPContext);
    if (!context) {
        throw new Error("useTCP must be used  within a TCP Provider");
    }

    return context;
}

export const TCPProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [server, setServer] = useState<any>(null);
    const [client, setClient] = useState<any>(null);
    const [isConnected, setIsConnected] = useState<any>(false);
    const [connectedDevice, setConnectedDevice] = useState<any>(null);
    const [serverSocket, setServerSocket] = useState<any>(null);
    const [sentFiles, setSentFiles] = useState<any>([]);
    const [receivedFiles, setReceivedFiles] = useState<any>([]);
    const [totalSentBytes, setTotalSentBytes] = useState<number>(0);
    const [totalReceivedBytes, setTotalReceivedBytes] = useState<number>(0);

    const { currentChunkSet, setCurrentChunkSet, chunkStore, setChunkStore } = useChunkStore();

    //START SERVER
    const startServer = useCallback((port: number) => {
        if (server) {
            console.log("server already running");
            return;
        }

        const newServer = TCPSocket.createServer((socket) => {
            console.log("Client Connected: ", socket.address());
            setServerSocket(socket);
            socket.setNoDelay(true);
            socket.readableHighWaterMark = 1024 * 1024 * 1;
            socket.writableHighWaterMark = 1024 * 1024 * 1;
            socket.on('data', async (data) => {
                console.log("data: ", data);
                const parsedData = JSON.parse(data?.toString());
                if (parsedData?.event === 'connect') {
                    setIsConnected(true);
                    setConnectedDevice(parsedData?.deviceName)
                }

            });
            socket.on('close', () => {
                console.log("client disconnect");
                setReceivedFiles([]);
                setSentFiles([]);
                setCurrentChunkSet(null);
                setTotalReceivedBytes(0);
                setChunkStore(null);
                setIsConnected(false);
            });
            socket.on('error', (err) => console.error("Socket error: ", err));
        });

        newServer.listen({ port, host: '0.0.0.0' }, () => {
            const address = newServer.address();
            console.log(`Server running on ${address?.address}: ${address?.port}`);

        })

        newServer.on('error', (err) => console.error("Server error: ", err));

        setServer(newServer);
    }, [server])

    //Start Client
    const connectToServer = useCallback((host: string, port: number, deviceName: string) => {
        const newClient = TCPSocket.connectTLS({
            host,
            port,
            cert: false
        }, () => {
            setIsConnected(true);
            setConnectedDevice(deviceName);
            const myDeviceName = DeviceInfo.getDeviceNameSync();
            newClient.write(JSON.stringify({ event: 'connect', deviceName: myDeviceName }))
        });

        newClient.setNoDelay(true);
        newClient.readableHighWaterMark = 1024 * 1024 * 1;
        newClient.writableHighWaterMark = 1024 * 1024 * 1;

        newClient.on('data', async (data) => {
            const parsedData = JSON.parse(data?.toString());

        })

        newClient.on('close', () => {
            console.log("connection closed");
            setReceivedFiles([]);
            setSentFiles([]);
            setCurrentChunkSet(null);
            setTotalReceivedBytes(0);
            setChunkStore(null);
            setIsConnected(false);
            
        })

        newClient.on('error', (err) => console.error("Client Error: ", err));
        setClient(newClient);
    }, [client])

    return (
        <TCPContext.Provider value={{
            server,
            client,
            isConnected,
            connectedDevice,
            sentFiles,
            receivedFiles,
            totalSentBytes,
            totalReceivedBytes,
            startServer,
            connectToServer,

        }}>
            {children}
        </TCPContext.Provider>
    )
}