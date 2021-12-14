import {PieceModelInterface} from './PieceModelInterface';

export class WordPieceModel implements PieceModelInterface
{
    private readonly _value: string;

    public constructor(value: string)
    {
        this._value = value;
    }

    public get value(): string 
    {
        return this._value;
    }
}
