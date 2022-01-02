import {PageModel} from './PageModel';
import {PieceState} from '../editor/states/PieceState';
import {SerializableInterface} from './SerializableInterface';
import {AnalysisModel} from './pieces/AnalysisModel';
import {WordPieceModel} from './pieces/WordPieceModel';

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
            .flatMap(page => page.lines)
            .flatMap(line => line.pieces);
    }

    public get analyses(): AnalysisModel[]
    {
        return this
            .pieces
            .flatMap(pieceState => {
                if (pieceState.model instanceof WordPieceModel) {
                    return pieceState.model.analyses;
                }

                return [];
            });
    }
}