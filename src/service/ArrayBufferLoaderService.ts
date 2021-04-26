export interface IArrayBufferLoaderService {
    loadArrayBufferFrom(path: string): Promise<ArrayBuffer>
}

export class ArrayBufferLoaderService implements IArrayBufferLoaderService {
    async loadArrayBufferFrom(path: string): Promise<ArrayBuffer> {
        const resp = await fetch(path)
        if (resp.status == 404) {
            throw '404'
        }
        return await resp.arrayBuffer()
    }
}