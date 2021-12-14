export class LineModel<TPieceModel>
{
    private readonly _pieces: TPieceModel[];

    public constructor(pieces: TPieceModel[])
    {
        this._pieces = pieces;
    }

    public get pieces(): TPieceModel[]
    {
        return this._pieces;
    }
}