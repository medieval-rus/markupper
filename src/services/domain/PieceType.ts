import {PieceModelInterface} from '../../model/pieces/PieceModelInterface';
import {NonePieceModel} from '../../model/pieces/NonePieceModel';
import {WordPieceModel} from '../../model/pieces/WordPieceModel';
import {PunctuationPieceModel} from '../../model/pieces/PunctuationPieceModel';

type PieceTypeConverter = (other: PieceModelInterface) => PieceModelInterface;

type PieceTypeDeserializer = (pieceData: any) => PieceModelInterface;

export class PieceType
{
    private static readonly pieceTypes: PieceType[] = [
        new PieceType('none', 'без разметки', NonePieceModel, NonePieceModel.fromOtherType, NonePieceModel.deserialize),
        new PieceType('word', 'слово', WordPieceModel, WordPieceModel.fromOtherType, WordPieceModel.deserialize),
        new PieceType('punctuation', 'пунктуация', PunctuationPieceModel, PunctuationPieceModel.fromOtherType, PunctuationPieceModel.deserialize),
    ];

    public static getPieceTypeByKey(pieceTypeKey: string): PieceType
    {
        const pieceType = PieceType.pieceTypes.find(pieceType => pieceType.key === pieceTypeKey);

        if (undefined === pieceType) {
            throw new Error(`Unknown piece type key '${pieceTypeKey}'.`);
        }

        return pieceType;
    }

    public static getPieceTypeByModel(piece: PieceModelInterface): PieceType
    {
        const pieceType = PieceType.pieceTypes.find(pieceType => pieceType.isModelOfThisType(piece));

        if (undefined === pieceType) {
            throw new Error(`Unknown piece type model '${typeof piece}'.`);
        }

        return pieceType;
    }

    public static getPieceTypes(): PieceType[]
    {
        return PieceType.pieceTypes;
    }

    private readonly _key: string;
    private readonly _name: string;
    private readonly _modelType: Function;
    private readonly _convert: PieceTypeConverter;
    private readonly _deserialize: PieceTypeDeserializer;

    public constructor(
        key: string,
        name: string,
        modelType: Function,
        converter: PieceTypeConverter,
        deserializer: PieceTypeDeserializer,
    )
    {
        this._key = key;
        this._name = name;
        this._modelType = modelType;
        this._convert = converter;
        this._deserialize = deserializer;
    }

    public get key(): string
    {
        return this._key;
    }

    public get name(): string
    {
        return this._name;
    }

    public get modelType(): Function
    {
        return this._modelType;
    }

    public get convert(): PieceTypeConverter
    {
        return this._convert;
    }

    public get deserialize(): PieceTypeDeserializer
    {
        return this._deserialize;
    }

    public isModelOfThisType(model: PieceModelInterface): boolean
    {
        return model.constructor === this.modelType;
    }
}