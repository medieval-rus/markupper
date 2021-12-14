import {Component, ReactNode} from 'react';
import {Attribute} from './components/Attribute';
import {NonePieceModel} from '../../model/pieces/NonePieceModel';
import {WordPieceModel} from '../../model/pieces/WordPieceModel';
import {PunctuationPieceModel} from '../../model/pieces/PunctuationPieceModel';
import {PieceState} from '../states/PieceState';
import {PieceModelInterface} from '../../model/pieces/PieceModelInterface';

type Properties = {
    pieceModels: Set<PieceState>;
};

export class Attributor extends Component<Properties, {}>
{
    public render(): ReactNode
    {
        let selectedPieces: PieceModelInterface[] = [];

        for (const pieceState of this.props.pieceModels) {
            if (pieceState.isSelected) {
                selectedPieces.push(pieceState.piece);
            }
        }

        if (selectedPieces.length === 0) {
            return Attributor.renderEmpty();
        }

        if (selectedPieces.length > 1) {
            return Attributor.renderMany(selectedPieces);
        }

        return Attributor.renderSingle(selectedPieces[0]);
    }

    private static getPieceType(pieceModel: PieceModelInterface): string
    {
        switch (pieceModel.constructor) {
            case NonePieceModel:
                return 'без разметки';
            case WordPieceModel:
                return 'слово';
            case PunctuationPieceModel:
                return 'пунктуация';
            default:
                throw new Error(`Unknown piece type ${typeof pieceModel}.`);
        }
    }

    private static renderEmpty(): ReactNode
    {
        return <div className={'markupper-attributor'}/>;
    }

    private static renderSingle(pieceModel: PieceModelInterface): ReactNode
    {
        return (
            <div className={'markupper-attributor'}>
                <div className={'markupper-attributor-label'}>
                    {pieceModel.value}
                </div>
                <div className={'markupper-attributes-container'}>
                    <Attribute name={'Тип'} value={Attributor.getPieceType(pieceModel)}/>
                </div>
            </div>
        );
    }

    private static renderMany(pieceModels: PieceModelInterface[])
    {
        return (
            <div className={'markupper-attributor'}>
                <div className={'markupper-attributor-label'}>
                    {pieceModels.map(pieceModel => `'${pieceModel.value}'`).join(', ')}
                </div>
            </div>
        );
    }
}