import {PieceModelInterface} from './PieceModelInterface';

export class PunctuationPieceModel implements PieceModelInterface
{
    private readonly _value: string;

    public constructor(value: string)
    {
        this._value = value;
    }

    public static fromOtherType(other: PieceModelInterface): PieceModelInterface
    {
        return new PunctuationPieceModel(other.value);
    }

    public serialize(): any
    {
        return {
            value: this._value
        }
    }

    public static deserialize(pieceData: any): PieceModelInterface
    {
        return new PunctuationPieceModel(pieceData.value);
    }

    public get value(): string 
    {
        return this._value;
    }
}