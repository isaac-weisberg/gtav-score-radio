import { LoaderService, ILoaderService } from "../service/LoaderService";
import { ISongRecoveryService, SongRecoveryService } from "../service/SongRecoveryService";
import { ATATSongMetaLoaderService, IATATSongMetaLoaderService } from "../workflows/atat/ATATSongMetaLoaderService";

export interface HasArrayBufferLoaderService {
    loaderService: ILoaderService
}
export interface HasSongRecoveryService {
    songRecoveryService: ISongRecoveryService
}
export interface HasATATSongMetaLoaderService {
    atatSongMetaLoaderService: IATATSongMetaLoaderService
}

export type GlobalDI = HasArrayBufferLoaderService
    & HasSongRecoveryService
    & HasATATSongMetaLoaderService

export function createGlobalDIDefault(): GlobalDI {
    const loaderService = new LoaderService()

    return {
        loaderService: loaderService,
        songRecoveryService: new SongRecoveryService(loaderService),
        atatSongMetaLoaderService: new ATATSongMetaLoaderService(loaderService)
    }
}