import {PageModel} from './PageModel';
import {PieceState} from '../editor/states/PieceState';
import {SerializableInterface} from './SerializableInterface';

export class TextModel implements SerializableInterface
{
    private readonly _pages: PageModel[];

    public constructor(pages: PageModel[])
    {
        this._pages = pages;
    }

    public serialize(): any
    {
        return {
            pages: this._pages.map(page => page.serialize()),
        };
    }

    public static deserialize(textData: any): TextModel
    {
        return new TextModel(textData.pages.map((page: any) => PageModel.deserialize(page)));
    }

    public get pages(): PageModel[]
    {
        return this._pages;
    }

    public get pieces(): PieceState[]
    {
        return this
            ._pages
            .flatMap(pageModel => pageModel.lines)
            .flatMap(lineModel => lineModel.pieces);
    }
}