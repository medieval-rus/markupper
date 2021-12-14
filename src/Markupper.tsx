import './markupper.scss'
import * as ReactDOM from 'react-dom';
import {TextModel} from './model/TextModel';
import {RawTextParser} from './parsing/RawTextParser';
import {TextModelSerializer} from './parsing/TextModelSerializer';
import {Editor} from './editor/Editor';
import {PieceModelInterface} from './model/pieces/PieceModelInterface';

export class Markupper
{
    private static parser: RawTextParser = new RawTextParser();
    private static serializer: TextModelSerializer = new TextModelSerializer();

    private readonly textModel: TextModel<PieceModelInterface>;

    public constructor(textModel: TextModel<PieceModelInterface>)
    {
        this.textModel = textModel;
    }

    public run(containerElement: HTMLDivElement): void
    {
        ReactDOM.render(
            <Editor textModel={this.textModel}/>,
            containerElement
        );
    }

    public serialize(): string
    {
        return Markupper.serializer.serialize(this.textModel);
    }

    public static deserialize(text: string): Markupper
    {
        return new Markupper(Markupper.serializer.deserialize(text));
    }

    public static parse(text: string): Markupper
    {
        return new Markupper(Markupper.parser.parse(text));
    }
}