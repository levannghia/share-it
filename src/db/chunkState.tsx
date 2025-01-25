import {create} from 'zustand'
import {Buffer} from 'buffer'

interface chunkState {
    chunkStore: {
        id: string | null;
        name: string;
        totalChunk: number;
        chunkArray: Buffer[];
    } | null;
    currentChunkSet: {
        id: string | null;
        totalChunk: number;
        chunkArray: Buffer[];
    } | null;
    setChunkStore: (chunkStore: any) => void;
    resetChunkStore: () => void;
    setCurrentChunkSet: (chunkStoreSet: any) => void;
    resetCurrentChunkSet: () => void;
}

export const useChunkStore = create<chunkState>((set) => ({
    chunkStore: null,
    currentChunkSet: null,
    setChunkStore: (value) => set(() => ({chunkStore: value})),
    resetChunkStore: () => set(() => ({chunkStore: null})),
    setCurrentChunkSet: (value) => set(() => ({currentChunkSet: value})),
    resetCurrentChunkSet: () => () => set(() => ({currentChunkSet: null})),
}));