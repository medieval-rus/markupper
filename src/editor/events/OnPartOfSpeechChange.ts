import {AnalysisModel} from '../../model/pieces/AnalysisModel';

export type OnPartOfSpeechChange = (analysis: AnalysisModel, partOfSpeech: string | null) => void;
