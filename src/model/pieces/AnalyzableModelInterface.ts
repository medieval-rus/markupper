import {AnalysisModel} from './AnalysisModel';

export interface AnalyzableModelInterface
{
    get analyses(): AnalysisModel[];

    addAnalysis(analysisModel: AnalysisModel): void;

    removeAnalysis(analysisModel: AnalysisModel): void;
}