import {Component, ReactNode} from 'react';
import {Attribute} from './components/Attribute';
import {PieceState} from '../states/PieceState';
import {PieceModelInterface} from '../../model/pieces/PieceModelInterface';
import {SingleListValueHolder} from './components/value-holders/SingleListValueHolder';
import {PieceType} from '../../services/domain/PieceType';
import {Translator} from '../../services/Translator';
import {Button} from './components/Button';
import {WordPieceModel} from '../../model/pieces/WordPieceModel';
import {AnalysisModel} from '../../model/pieces/AnalysisModel';
import {AnalysisAttributor} from './components/AnalysisAttributor';

type Properties = {
    pieceModels: PieceState[];
    onPieceTypeChange: (pieceModel: PieceModelInterface, pieceType: string) => void;
    addNewAnalysis: (pieceModel: WordPieceModel) => void;
    onLemmaChange: (analysis: AnalysisModel, lemma: string | null) => void;
    onPartOfSpeechChange: (analysis: AnalysisModel, partOfSpeech: string | null) => void;
};

export class Attributor extends Component<Properties, {}>
{
    public render(): ReactNode
    {
        const selectedPieces: PieceModelInterface[] = [];

        for (const pieceState of this.props.pieceModels) {
            if (pieceState.isSelected) {
                selectedPieces.push(pieceState.model);
            }
        }

        if (selectedPieces.length === 0) {
            return Attributor.renderEmpty();
        }

        if (selectedPieces.length > 1) {
            return Attributor.renderMany(selectedPieces);
        }

        return this.renderSingle(selectedPieces[0]);
    }

    private static renderEmpty(): ReactNode
    {
        return <div className={'markupper-attributor'}/>;
    }

    private renderSingle(pieceModel: PieceModelInterface): ReactNode
    {
        return (
            <div className={'markupper-attributor'}>
                <div className={'markupper-attributor-label'}>{pieceModel.value}</div>
                <div className={'markupper-attributes-container'}>
                    <Attribute name={Translator.translate('attributor.attribute.piece.pieceType')}>
                        <SingleListValueHolder
                            values={PieceType.getPieceTypes().map(pieceType => [pieceType.key, pieceType.name])}
                            selectedValue={PieceType.getPieceTypeByModel(pieceModel).key}
                            onValueChange={this.onPieceTypeChange.bind(this, pieceModel)}
                        />
                    </Attribute>
                    {
                        pieceModel instanceof WordPieceModel &&
                        pieceModel.analyses.map(
                            (analysis, index) =>
                                <AnalysisAttributor
                                    key={index}
                                    analysis={analysis}
                                    onLemmaChange={this.props.onLemmaChange}
                                    onPartOfSpeechChange={this.props.onPartOfSpeechChange}
                                />
                        )
                    }
                    {
                        pieceModel instanceof WordPieceModel &&
                        <Button
                            text={Translator.translate('attributor.attribute.piece.addNewAnalysis')}
                            onClick={this.addNewAnalysis.bind(this, pieceModel)}
                        />
                    }
                </div>
            </div>
        );
    }

    private static renderMany(pieceModels: PieceModelInterface[]): ReactNode
    {
        return (
            <div className={'markupper-attributor'}>
                <div className={'markupper-attributor-label'}>
                    {pieceModels.map(pieceModel => `'${pieceModel.value}'`).join(', ')}
                </div>
            </div>
        );
    }

    private onPieceTypeChange(pieceModel: PieceModelInterface, pieceType: string): void
    {
        this.props.onPieceTypeChange(pieceModel, pieceType);
    }

    private addNewAnalysis(pieceModel: WordPieceModel): void
    {
        this.props.addNewAnalysis(pieceModel);
    }
}