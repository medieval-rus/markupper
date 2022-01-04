import {Component, ReactNode} from 'react';
import {Attribute} from './Attribute';
import {Translator} from '../../../services/Translator';
import {SingleListValueHolder} from './value-holders/SingleListValueHolder';
import {PieceType} from '../../../services/domain/PieceType';
import {WordPieceModel} from '../../../model/pieces/WordPieceModel';
import {AnalysisAttributor} from './AnalysisAttributor';
import {Button} from './Button';
import {PieceModelInterface} from '../../../model/pieces/PieceModelInterface';
import {OnPartOfSpeechChange} from '../../events/OnPartOfSpeechChange';
import {OnLemmaChange} from '../../events/OnLemmaChange';
import {OnPieceTypeChange} from '../../events/OnPieceTypeChange';
import {AnalysisModel} from '../../../model/pieces/AnalysisModel';

type Properties = {
    piece: PieceModelInterface;
    onPieceTypeChange: OnPieceTypeChange;
    addNewAnalysis: (piece: WordPieceModel) => void;
    removeAnalysis: (piece: WordPieceModel, analysis: AnalysisModel) => void;
    onLemmaChange: OnLemmaChange;
    onPartOfSpeechChange: OnPartOfSpeechChange;
};

export class PieceAttributor extends Component<Properties, {}>
{
    public constructor(props: Properties)
    {
        super(props);
        this.onPieceTypeChange = this.onPieceTypeChange.bind(this);
        this.addNewAnalysis = this.addNewAnalysis.bind(this);
        this.removeAnalysis = this.removeAnalysis.bind(this);
    }

    public render(): ReactNode
    {
        return (
            <div className={'markupper-attributor-piece'}>
                <div className={'markupper-attributor-piece-label'}>{this.props.piece.value}</div>
                <div className={'markupper-attributor-attributes-container'}>
                    <Attribute name={Translator.translate('attributor.piece.attribute.pieceType')}>
                        <SingleListValueHolder<PieceType>
                            selectedValue={PieceType.getPieceTypeByModel(this.props.piece)}
                            values={PieceType.getPieceTypes()}
                            onValueChange={this.onPieceTypeChange}
                            keyExtractor={(pieceType: PieceType): string => pieceType.key}
                            labelExtractor={(pieceType: PieceType): string => pieceType.name}
                        />
                    </Attribute>
                    {
                        this.props.piece instanceof WordPieceModel &&
                        this.props.piece.analyses.map(
                            (analysis, index) =>
                                <AnalysisAttributor
                                    key={index}
                                    analysis={analysis}
                                    onLemmaChange={this.props.onLemmaChange}
                                    onPartOfSpeechChange={this.props.onPartOfSpeechChange}
                                    onRemove={this.removeAnalysis}
                                />
                        )
                    }
                    {
                        this.props.piece instanceof WordPieceModel &&
                        <Button
                            text={Translator.translate('attributor.piece.attribute.addNewAnalysis')}
                            onClick={this.addNewAnalysis}
                        />
                    }
                </div>
            </div>
        );
    }

    private onPieceTypeChange(pieceType: PieceType): void
    {
        this.props.onPieceTypeChange(this.props.piece, pieceType);
    }

    private addNewAnalysis(): void
    {
        if (this.props.piece instanceof WordPieceModel) {
            this.props.addNewAnalysis(this.props.piece);
        }
    }

    private removeAnalysis(analysis: AnalysisModel): void
    {
        if (this.props.piece instanceof WordPieceModel) {
            this.props.removeAnalysis(this.props.piece, analysis);
        }
    }
}