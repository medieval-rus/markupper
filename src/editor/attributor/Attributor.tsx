import {Component, ReactNode} from 'react';
import {PieceState} from '../states/PieceState';
import {PieceModelInterface} from '../../model/pieces/PieceModelInterface';
import {WordPieceModel} from '../../model/pieces/WordPieceModel';
import {PieceAttributor} from './components/PieceAttributor';
import {OnPartOfSpeechChange} from '../events/OnPartOfSpeechChange';
import {OnLemmaChange} from '../events/OnLemmaChange';
import {OnPieceTypeChange} from '../events/OnPieceTypeChange';
import {AnalysisModel} from '../../model/pieces/AnalysisModel';

type Properties = {
    pieces: PieceState[];
    onPieceTypeChange: OnPieceTypeChange;
    addNewAnalysis: (piece: WordPieceModel) => void;
    removeAnalysis: (piece: WordPieceModel, analysis: AnalysisModel) => void;
    onLemmaChange: OnLemmaChange;
    onPartOfSpeechChange: OnPartOfSpeechChange;
};

export class Attributor extends Component<Properties, {}>
{
    public render(): ReactNode
    {
        const selectedPieces: PieceModelInterface[] = [];

        for (const pieceState of this.props.pieces) {
            if (pieceState.isSelected) {
                selectedPieces.push(pieceState.model);
            }
        }

        return (
            <div className={'markupper-attributor'}>
                {
                    selectedPieces.length > 1 &&
                    <div className={'markupper-attributor-piece-label'}>
                        {selectedPieces.map(piece => `'${piece.value}'`).join(', ')}
                    </div>
                }
                {
                    selectedPieces.length === 1 &&
                    <PieceAttributor
                        piece={selectedPieces[0]}
                        onPieceTypeChange={this.props.onPieceTypeChange}
                        addNewAnalysis={this.props.addNewAnalysis}
                        removeAnalysis={this.props.removeAnalysis}
                        onLemmaChange={this.props.onLemmaChange}
                        onPartOfSpeechChange={this.props.onPartOfSpeechChange}
                    />
                }
            </div>
        );
    }
}