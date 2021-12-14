import {PieceModelInterface} from '../../model/pieces/PieceModelInterface';

export class PieceState
{
    private readonly _piece: PieceModelInterface;
    private _isSelected: boolean;

    public constructor(piece: PieceModelInterface, isSelected: boolean)
    {
        this._piece = piece;
        this._isSelected = isSelected;
    }

    public get piece(): PieceModelInterface
    {
        return this._piece;
    }

    public get isSelected(): boolean
    {
        return this._isSelected;
    }

    public toggle(): boolean
    {
        return this._isSelected = !this.isSelected;
    }
}