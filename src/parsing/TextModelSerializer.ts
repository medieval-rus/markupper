import {TextModel} from '../model/TextModel';

export class TextModelSerializer
{
    public serialize(textModel: TextModel): string
    {
        return JSON.stringify(textModel.serialize(), null, 2);
    }

    public deserialize(text: string): TextModel
    {
        const serialized = JSON.parse(text);

        return TextModel.deserialize(serialized)
    }
}