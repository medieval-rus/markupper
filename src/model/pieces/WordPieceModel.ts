import {PieceModelInterface} from './PieceModelInterface';
import {AnalysisModel} from './AnalysisModel';
import {AnalyzableModelInterface} from './AnalyzableModelInterface';

export class WordPieceModel implements PieceModelInterface, AnalyzableModelInterface
{
    private readonly _value: string;

    private readonly _analyses: AnalysisModel[];

    public constructor(value: string, analyses: AnalysisModel[])
    {
        this._value = value;
        this._analyses = analyses;

    }

    public static fromOtherType(other: PieceModelInterface): PieceModelInterface
    {
        return new WordPieceModel(other.value, []);
    }

    public serialize(): any
    {
        return {
            value: this._value,
            analyses: this._analyses.map(analysis => analysis.serialize()),
        };
    }

    public static deserialize(pieceData: any): PieceModelInterface
    {
        return new WordPieceModel(
            pieceData.value,
            pieceData.analyses.map((analysisData: any) => AnalysisModel.deserialize(analysisData))
        );
    }

    public get value(): string 
    {
        return this._value;
    }

    public get analyses(): AnalysisModel[]
    {
        return this._analyses;
    }

    public addAnalysis(analysisModel: AnalysisModel): void
    {
        this._analyses.push(analysisModel);
    }

    public removeAnalysis(analysisModel: AnalysisModel): void
    {
        const index = this._analyses.indexOf(analysisModel);

        if (index > -1) {
            this._analyses.splice(index, 1);
        }
    }
}
