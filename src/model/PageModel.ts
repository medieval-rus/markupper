import {LineModel} from './LineModel';

export class PageModel<TPieceModel>
{
    private readonly _lines: LineModel<TPieceModel>[];

    public constructor(lines: LineModel<TPieceModel>[])
    {
        this._lines = lines;
    }

    public get lines(): LineModel<TPieceModel>[]
    {
        return this._lines;
    }
}