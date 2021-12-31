import {PieceModelInterface} from '../../model/pieces/PieceModelInterface';
import {NonePieceModel} from '../../model/pieces/NonePieceModel';
import {WordPieceModel} from '../../model/pieces/WordPieceModel';
import {PunctuationPieceModel} from '../../model/pieces/PunctuationPieceModel';

type PieceTypeConverter = (other: PieceModelInterface) => PieceModelInterface;

export class PieceType
{
    private static readonly pieceTypes: PieceType[] = [
        new PieceType('без разметки', NonePieceModel, NonePieceModel.fromOtherType),
        new PieceType('слово', WordPieceModel, WordPieceModel.fromOtherType),
        new PieceType('пунктуация', PunctuationPieceModel, PunctuationPieceModel.fromOtherType),
    ];

    public static getPieceTypeByName(pieceTypeName: string): PieceType
    {
        const pieceType = PieceType.pieceTypes.find(pieceType => pieceType.name === pieceTypeName);

        if (undefined === pieceType) {
            throw new Error(`Unknown piece type name '${pieceTypeName}'.`);
        }

        return pieceType;
    }

    public static getPieceTypeByModel(pieceModel: PieceModelInterface): PieceType
    {
        const pieceType = PieceType.pieceTypes.find(pieceType => pieceType.isModelOfThisType(pieceModel));

        if (undefined === pieceType) {
            throw new Error(`Unknown piece type model '${typeof pieceModel}'.`);
        }

        return pieceType;
    }

    public static getPieceTypeNames(): string[]
    {
        return PieceType.pieceTypes.map(pieceType => pieceType.name);
    }

    private readonly _name: string;
    private readonly _modelType: Function;
    private readonly _factory: PieceTypeConverter;

    public constructor(name: string, modelType: Function, factory: PieceTypeConverter)
    {
        this._name = name;
        this._modelType = modelType;
        this._factory = factory;
    }

    public get name(): string
    {
        return this._name;
    }

    public get modelType(): Function
    {
        return this._modelType;
    }

    public get factory(): PieceTypeConverter
    {
        return this._factory;
    }

    public isModelOfThisType(model: PieceModelInterface): boolean
    {
        return model.constructor === this.modelType;
    }
}