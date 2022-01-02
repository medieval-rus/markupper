import {AnalysisModel} from '../../model/pieces/AnalysisModel';

export type OnLemmaChange = (analysis: AnalysisModel, lemma: string | null) => void;
