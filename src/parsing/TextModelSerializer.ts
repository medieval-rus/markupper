import {TextModel} from '../model/TextModel';
import {instanceToPlain, plainToInstance} from 'class-transformer';
import {PieceModelInterface} from '../model/pieces/PieceModelInterface';

export class TextModelSerializer
{
    public serialize(textModel: TextModel<PieceModelInterface>): string
    {
        return JSON.stringify(instanceToPlain(textModel));
    }

    public deserialize(text: string): TextModel<PieceModelInterface>
    {
        return plainToInstance(TextModel, JSON.parse(text)) as TextModel<PieceModelInterface>;
    }
}