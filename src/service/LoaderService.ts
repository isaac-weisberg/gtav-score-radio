export interface ILoaderService {
    loadArrayBufferFrom(path: string): Promise<ArrayBuffer>

    loadJsonFrom(path: string): Promise<any>
}

export class LoaderService implements ILoaderService {
    async loadArrayBufferFrom(path: string): Promise<ArrayBuffer> {
        const resp = await fetch(path)
        if (resp.status == 404) {
            throw '404'
        }
        return await resp.arrayBuffer()
    }

    async loadJsonFrom(path: string): Promise<any> {
        const resp = await fetch(path)
        if (resp.status == 404) {
            throw '404'
        }
        return await resp.json()
    }
}