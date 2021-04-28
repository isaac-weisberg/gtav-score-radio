import { LoaderService, ILoaderService } from "../service/LoaderService";
import { IATATSongLoaderService, ATATSongLoaderService } from "../workflows/atat/ATATSongLoaderService";
import { ATATSongMetaLoaderService, IATATSongMetaLoaderService } from "../workflows/atat/ATATSongMetaLoaderService";

export interface HasArrayBufferLoaderService {
    loaderService: ILoaderService
}
export interface HasSongLoaderService {
    songLoaderService: IATATSongLoaderService
}
export interface HasSongMetaLoaderService {
    songMetaLoaderService: IATATSongMetaLoaderService
}

export type GlobalDI = HasArrayBufferLoaderService
    & HasSongLoaderService
    & HasSongMetaLoaderService

export function createGlobalDIDefault(): GlobalDI {
    const loaderService = new LoaderService()

    return {
        loaderService: loaderService,
        songLoaderService: new ATATSongLoaderService(loaderService),
        songMetaLoaderService: new ATATSongMetaLoaderService(loaderService)
    }
}