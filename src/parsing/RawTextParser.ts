import {TextModel} from '../model/TextModel';
import {PageModel} from '../model/PageModel';
import {LineModel} from '../model/LineModel';
import {PieceModelInterface} from '../model/pieces/PieceModelInterface';
import {NonePieceModel} from '../model/pieces/NonePieceModel';
import {WordPieceModel} from '../model/pieces/WordPieceModel';
import {PunctuationPieceModel} from '../model/pieces/PunctuationPieceModel';
import {PieceState} from '../editor/states/PieceState';

export class RawTextParser
{
    public parse(text: string): TextModel
    {
        return new TextModel(
            text
                .split('\n\n')
                .map(
                    page => new PageModel(
                        page
                            .split('\n')
                            .map(
                                line => new LineModel(
                                    line
                                        .split(' ')
                                        .map(
                                            piece => {
                                                piece = piece.trim();

                                                if (piece === '') {
                                                    piece = null;
                                                }

                                                if (piece === null) {
                                                    return null;
                                                }

                                                return RawTextParser.predictPieceType(piece);
                                            }
                                        )
                                        .filter(piece => piece !== null)
                                        .map(piece => new PieceState(piece,false))
                                )
                            )
                            .filter(line => line.pieces.length > 0)
                    )
                )
                .filter(page => page.lines.length > 0)
        );
    }

    private static predictPieceType(piece: string): PieceModelInterface
    {
        if (/[а-яА-Я]+/.test(piece)) {
            return new WordPieceModel(piece, []);
        }

        if (/[·:…-]+/.test(piece)) {
            return new PunctuationPieceModel(piece);
        }

        return new NonePieceModel(piece);
    }
}