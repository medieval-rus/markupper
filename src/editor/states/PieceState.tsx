import {PieceModelInterface} from '../../model/pieces/PieceModelInterface';

export class PieceState
{
    private _model: PieceModelInterface;
    private _isSelected: boolean;

    public constructor(model: PieceModelInterface, isSelected: boolean)
    {
        this._model = model;
        this._isSelected = isSelected;
    }

    public get model(): PieceModelInterface
    {
        return this._model;
    }

    public set model(value: PieceModelInterface)
    {
        this._model = value;
    }

    public get isSelected(): boolean
    {
        return this._isSelected;
    }

    public set isSelected(value: boolean)
    {
        this._isSelected = value;
    }

    public toggleIsSelected(): boolean
    {
        return this._isSelected = !this.isSelected;
    }
}