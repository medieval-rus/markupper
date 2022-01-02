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

type Properties = {
    piece: PieceModelInterface;
    onPieceTypeChange: OnPieceTypeChange;
    addNewAnalysis: (piece: WordPieceModel) => void;
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
    }

    public render(): ReactNode
    {
        return (
            <div className={'markupper-attributor-piece'}>
                <div className={'markupper-attributor-piece-label'}>{this.props.piece.value}</div>
                <div className={'markupper-attributor-attributes-container'}>
                    <Attribute name={Translator.translate('attributor.piece.attribute.pieceType')}>
                        <SingleListValueHolder
                            values={PieceType.getPieceTypes().map(pieceType => [pieceType.key, pieceType.name])}
                            selectedValue={PieceType.getPieceTypeByModel(this.props.piece).key}
                            onValueChange={this.onPieceTypeChange.bind(this, this.props.piece)}
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

    private onPieceTypeChange(piece: PieceModelInterface, pieceType: string): void
    {
        this.props.onPieceTypeChange(piece, pieceType);
    }

    private addNewAnalysis(): void
    {
        if (this.props.piece instanceof WordPieceModel) {
            this.props.addNewAnalysis(this.props.piece);
        }
    }
}