import { produce } from "immer"
import { Alert } from "react-native"
import { useChunkStore } from "../db/chunkState"
import { Buffer } from "buffer"

export const receiveFileAck = async (data: any, socket:any, setReceivedFiles: any) => {
    const {setChunkStore, chunkStore} = useChunkStore.getState();
    if(chunkStore) {
        Alert.alert("There are files which need to be received wait Bro!");
        return
    }

    setReceivedFiles((prevData: any) => {
        produce(prevData, (draft: any) => {
            draft.push(data);
        })
    })

    setChunkStore({
        id: data?.id,
        totalChunks: data?.totalChunks,
        name: data?.name,
        size: data?.size,
        mimeType: data?.mimeType,
        chunkArray: []
    })

    if(!socket) {
        console.log("Socket no available");
        return
    }

    try {
        await new Promise((resolve) => setTimeout(resolve, 10));
        console.log("FILE RECEIVED");
        socket.write(JSON.stringify({event: 'send_chunk_ack', chunkNo: 0}));
        console.log("REQUESTED FOR FIRST CHUNK");
    } catch (error) {
        console.error("Error sending file:", error);
        
    }
}

export const sendChunkAck = async (chunkIndex: any, socket: any, setTotalSentBytes: any, setSentFiles: any) => {
    const {currentChunkSet, resetCurrentChunkSet} = useChunkStore.getState();

    if(!currentChunkSet) {
        Alert.alert('There are no chunks to be sent');
        return;
    }

    if(!socket) {
        console.error('Socket not available');
        return
    }

    const totalChunks = currentChunkSet?.totalChunk;
    try {
        await new Promise((resolve) => setTimeout(resolve, 10));
        socket.write(
            JSON.stringify({
                event: 'receive_chunk_ack',
                chunk: currentChunkSet?.chunkArray[chunkIndex].toString('base64'),
                chunkNo: chunkIndex,
            })
        )

        setTotalSentBytes((prev: number) => prev + currentChunkSet.chunkArray[chunkIndex]?.length);
        if(chunkIndex + 2 > totalChunks) {
            console.log("ALL CHUNKS SENT SUCCESSFULLY");
            setSentFiles((prevFiles: any) => {
                produce(prevFiles, (draftFiles: any) => {
                    const fileIndex = draftFiles.findIndex((f: any) => f.id === currentChunkSet.id);

                    if(fileIndex !== -1) {
                        draftFiles[fileIndex].available = true
                    }
                })
            })
            resetCurrentChunkSet();
        }
    } catch (error) {
        console.error("Error sending file:", error);
    }
}

export const  receiveChunkAck = async (
    chunk: any,
    chunkNo: any,
    socket: any,
    setTotalReceivedBytes: any,
    generateFile: any

) => {
    const {chunkStore, setChunkStore, resetChunkStore} = useChunkStore.getState();

    if(!chunkStore) {
        console.log("chunk store is null");
        return
    }

    try {
        const bufferChunk = Buffer.from(chunk, 'base64');
        const updatedChunkArray = [...(chunkStore.chunkArray || [])];

        setChunkStore({
            ...chunkStore,
            chunkArray: updatedChunkArray,
        })

        setTotalReceivedBytes((prevValue: number) => prevValue + bufferChunk.length)
    } catch (error) {
        console.error("error updating chunk", error);
    }

    if(!socket) {
        console.log("socket not available");
        return
    }

    if(chunkNo + 1 === chunkStore.totalChunk) {
        console.log("All chunks received");
        generateFile();
        resetChunkStore();
        return
    }

    try {
        await new Promise((resolve) => setTimeout(resolve, 10));
        console.log("REQUESTED FOR NEXT CHUNK ", chunkNo + 1);
        socket.write(JSON.stringify({event: 'send_chunk_ack', chunkNo: chunkNo + 1}))
    } catch (error) {
        console.error("error sending file:", error);
        
    }
}