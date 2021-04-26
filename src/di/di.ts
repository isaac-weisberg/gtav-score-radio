import { ArrayBufferLoaderService, IArrayBufferLoaderService } from "../service/ArrayBufferLoaderService";
import { ISongLoaderService, SongLoaderService } from "../service/SongLoaderService";

export interface HasArrayBufferLoaderService {
    arrayBufferLoaderService: IArrayBufferLoaderService
}

export interface HasSongLoaderService {
    songLoaderService: ISongLoaderService
}

export type GlobalDI = HasArrayBufferLoaderService
    & HasSongLoaderService

export function createGlobalDIDefault(): GlobalDI {
    const arrayBufferLoaderService = new ArrayBufferLoaderService()

    return {
        arrayBufferLoaderService: arrayBufferLoaderService,
        songLoaderService: new SongLoaderService(arrayBufferLoaderService)
    }
}