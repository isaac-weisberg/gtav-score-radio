import * as YAML from 'yaml'

export interface ILoaderService {
    loadArrayBufferFrom(path: string): Promise<ArrayBuffer>

    loadYamlFrom(path: string): Promise<any>
}

export class LoaderService implements ILoaderService {
    async loadArrayBufferFrom(path: string): Promise<ArrayBuffer> {
        const resp = await fetch(path)
        if (resp.status == 404) {
            throw '404'
        }
        return await resp.arrayBuffer()
    }

    async loadYamlFrom(path: string): Promise<any> {
        const resp = await fetch(path)
        if (resp.status == 404) {
            throw '404'
        }
        const text = await resp.text()

        return YAML.parse(text)
    }

    async loadJsonFrom(path: string): Promise<any> {
        const resp = await fetch(path)
        if (resp.status == 404) {
            throw '404'
        }
        return await resp.json()
    }
}