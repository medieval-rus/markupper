import {LineModel} from './LineModel';
import {SerializableInterface} from './SerializableInterface';

export class PageModel implements SerializableInterface
{
    private readonly _lines: LineModel[];

    public constructor(lines: LineModel[])
    {
        this._lines = lines;
    }

    public serialize(): any
    {
        return {
            lines: this._lines.map(line => line.serialize()),
        };
    }

    public static deserialize(pageData: any): PageModel
    {
        return new PageModel(pageData.lines.map((line: any) => LineModel.deserialize(line)))
    }

    public get lines(): LineModel[]
    {
        return this._lines;
    }
}