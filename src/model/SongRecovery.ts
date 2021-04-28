import { Static } from 'runtypes'
import { SongRecoveryPlanDTO } from './SongRecoveryDTO'

export interface SongMagicTrackNumberRecoveryPlan {
    kind: 'SongMagicTrackNumberRecoveryPlan',
    masterString: string,
    templatedSubstring: string,
    count: number
}

export type SongRecoveryPlan = SongMagicTrackNumberRecoveryPlan

export function songRecoveryPlanFromDTO(dto: Static<typeof SongRecoveryPlanDTO>): SongRecoveryPlan {
    switch (dto.kind) {
        case 'SongMagicTrackNumberRecoveryPlan':
            return {
                kind: 'SongMagicTrackNumberRecoveryPlan',
                masterString: dto.masterString,
                templatedSubstring: dto.templatedSubstring,
                count: dto.count,
            }
    }
}