import {PieceModelInterface} from '../../model/pieces/PieceModelInterface';
import {PieceType} from '../../services/domain/PieceType';

export type OnPieceTypeChange = (piece: PieceModelInterface, pieceType: PieceType) => void;