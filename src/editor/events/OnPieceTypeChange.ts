import {PieceModelInterface} from '../../model/pieces/PieceModelInterface';

export type OnPieceTypeChange = (piece: PieceModelInterface, pieceType: string) => void;