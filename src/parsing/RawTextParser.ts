import {TextModel} from '../model/TextModel';
import {PageModel} from '../model/PageModel';
import {LineModel} from '../model/LineModel';
import {PieceModelInterface} from '../model/pieces/PieceModelInterface';
import {NonePieceModel} from '../model/pieces/NonePieceModel';

export class RawTextParser
{
    public parse(text: string): TextModel<PieceModelInterface>
    {
        return new TextModel(
            text
                .split('\n\n')
                .map(
                    (page: string): PageModel<PieceModelInterface> => new PageModel(
                        page
                            .split('\n')
                            .map(
                                (line: string): LineModel<PieceModelInterface> => new LineModel(
                                    line
                                        .split(' ')
                                        .map(
                                            (piece: string): PieceModelInterface | null => {
                                                piece = piece.trim();

                                                if (piece === '') {
                                                    piece = null;
                                                }

                                                if (piece === null) {
                                                    return null;
                                                }

                                                return new NonePieceModel(piece);
                                            }
                                        )
                                        .filter((piece: PieceModelInterface | null): boolean => piece !== null)
                                )
                            )
                    )
                )
        );
    }
}