import {SerializableInterface} from '../SerializableInterface';

export class AnalysisModel implements SerializableInterface
{
    private _lemma: string | null;
    private _partOfSpeech: string | null;

    public constructor(lemma: string | null, partOfSpeech: string | null)
    {
        this._lemma = lemma;
        this._partOfSpeech = partOfSpeech;
    }

    public serialize(): any
    {
        return {
            lemma: this._lemma,
            partOfSpeech: this._partOfSpeech,
        };
    }

    public static deserialize(analysisData: any): AnalysisModel
    {
        return new AnalysisModel(analysisData.lemma, analysisData.partOfSpeech);
    }

    public get lemma(): string | null
    {
        return this._lemma;
    }

    public set lemma(value: string)
    {
        this._lemma = value;
    }

    public get partOfSpeech(): string | null
    {
        return this._partOfSpeech;
    }

    public set partOfSpeech(value: string)
    {
        this._partOfSpeech = value;
    }
}