import {PageModel} from './PageModel';

export class TextModel<TPieceModel>
{
    private readonly _pages: PageModel<TPieceModel>[];

    public constructor(pages: PageModel<TPieceModel>[])
    {
        this._pages = pages;
    }

    public get pages(): PageModel<TPieceModel>[]
    {
        return this._pages;
    }

    public get pieces(): TPieceModel[]
    {
        return this
            ._pages
            .flatMap(pageModel => pageModel.lines)
            .flatMap(lineModel => lineModel.pieces);
    }
}