import { LoaderService, ILoaderService } from "../service/LoaderService";
import { ISongLoaderService, SongLoaderService } from "../service/SongLoaderService";
import { ISongMetaLoaderService, SongMetaLoaderService } from "../service/SongMetaLoaderService";

export interface HasArrayBufferLoaderService {
    loaderService: ILoaderService
}
export interface HasSongLoaderService {
    songLoaderService: ISongLoaderService
}
export interface HasSongMetaLoaderService {
    songMetaLoaderService: ISongMetaLoaderService
}

export type GlobalDI = HasArrayBufferLoaderService
    & HasSongLoaderService
    & HasSongMetaLoaderService

export function createGlobalDIDefault(): GlobalDI {
    const loaderService = new LoaderService()

    return {
        loaderService: loaderService,
        songLoaderService: new SongLoaderService(loaderService),
        songMetaLoaderService: new SongMetaLoaderService(loaderService)
    }
}