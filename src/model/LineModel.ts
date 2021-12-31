import {PieceState} from '../editor/states/PieceState';
import {SerializableInterface} from './SerializableInterface';
import {PieceType} from '../services/domain/PieceType';

export class LineModel implements SerializableInterface
{
    private readonly _pieces: PieceState[];

    public constructor(pieces: PieceState[])
    {
        this._pieces = pieces;
    }

    public serialize(): any
    {
        return {
            pieces: this._pieces.map(piece => ({
                type: PieceType.getPieceTypeByModel(piece.model).key,
                data: piece.model.serialize()
            })),
        };
    }

    public static deserialize(lineData: any): LineModel
    {
        return new LineModel(
            lineData
                .pieces
                .map(
                    (pieceData: any) => new PieceState(
                        PieceType.getPieceTypeByKey(pieceData.type).deserialize(pieceData.data),
                        false
                    )
                )
        )
    }

    public get pieces(): PieceState[]
    {
        return this._pieces;
    }
}