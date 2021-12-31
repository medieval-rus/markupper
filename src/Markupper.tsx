import './markupper.scss'
import * as ReactDOM from 'react-dom';
import {TextModel} from './model/TextModel';
import {RawTextParser} from './parsing/RawTextParser';
import {TextModelSerializer} from './parsing/TextModelSerializer';
import {Editor} from './editor/Editor';
import {KeyboardListener} from './services/KeyboardListener';
import {OnModelChange} from './OnModelChange';

export class Markupper
{
    private static parser: RawTextParser = new RawTextParser();
    private static serializer: TextModelSerializer = new TextModelSerializer();

    private readonly textModel: TextModel;

    public constructor(textModel: TextModel)
    {
        this.textModel = textModel;
    }

    public run(containerElement: HTMLDivElement, onModelChange: OnModelChange): void
    {
        const keyboardListener = new KeyboardListener();
        keyboardListener.init();

        ReactDOM.render(
            <Editor
                keyboardListener={keyboardListener}
                modelSerializer={Markupper.serializer}
                textModel={this.textModel}
                onModelChange={onModelChange}
            />,
            containerElement
        );
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