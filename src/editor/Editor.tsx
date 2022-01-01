import {Component, ReactNode} from 'react';
import {Attributor} from './attributor/Attributor';
import {Selector} from './selector/Selector';
import {TextModel} from '../model/TextModel';
import {PieceModelInterface} from '../model/pieces/PieceModelInterface';
import {KeyboardListener} from '../services/KeyboardListener';
import {PieceType} from '../services/domain/PieceType';
import {TextModelSerializer} from '../parsing/TextModelSerializer';
import {OnModelChange} from '../OnModelChange';
import {AnalysisModel} from '../model/pieces/AnalysisModel';
import {WordPieceModel} from '../model/pieces/WordPieceModel';

type Properties = {
    keyboardListener: KeyboardListener;
    modelSerializer: TextModelSerializer;
    textModel: TextModel;
    onModelChange: OnModelChange;
};

type State = {
    textModel: TextModel;
};

export class Editor extends Component<Properties, State>
{
    public state: State = {
        textModel: this.props.textModel,
    };

    public constructor(props: Properties)
    {
        super(props);
        this.onPieceSelect = this.onPieceSelect.bind(this);
        this.onPieceTypeChange = this.onPieceTypeChange.bind(this);
        this.addNewAnalysis = this.addNewAnalysis.bind(this);
        this.onLemmaChange = this.onLemmaChange.bind(this);
        this.onPartOfSpeechChange = this.onPartOfSpeechChange.bind(this);
    }

    public render(): ReactNode
    {
        this.props.onModelChange(this.props.modelSerializer.serialize(this.state.textModel));

        return (
            <div className={'markupper-editor'}>
                <Selector textModel={this.state.textModel} onPieceSelect={this.onPieceSelect}/>
                <Attributor
                    pieceModels={this.state.textModel.pieces}
                    onPieceTypeChange={this.onPieceTypeChange}
                    addNewAnalysis={this.addNewAnalysis}
                    onLemmaChange={this.onLemmaChange}
                    onPartOfSpeechChange={this.onPartOfSpeechChange}
                />
            </div>
        );
    }

    private onPieceSelect(selectedPieceModel: PieceModelInterface): void
    {
        this.setState(previousState => {

            const clickedPiece = previousState
                .textModel
                .pieces
                .find(piece => piece.model === selectedPieceModel);

            const otherSelectedPieces = previousState
                .textModel
                .pieces
                .filter(piece => piece.isSelected && piece !== clickedPiece);

            const isClickedPieceSelected = clickedPiece.isSelected;

            if (!this.props.keyboardListener.isControlPressed) {
                if (otherSelectedPieces.length === 0) {
                    clickedPiece.toggleIsSelected();
                } else {
                    if (!isClickedPieceSelected) {
                        clickedPiece.toggleIsSelected();
                    }

                    for (const pieceState of otherSelectedPieces) {
                        pieceState.isSelected = false;
                    }
                }
            } else {
                clickedPiece.toggleIsSelected();
            }

            return {
                textModel: previousState.textModel,
            };
        });
    }

    private onPieceTypeChange(pieceModel: PieceModelInterface, pieceTypeName: string): void
    {
        const pieceType = PieceType.getPieceTypeByKey(pieceTypeName);

        this.setState(previousState => {

            previousState.textModel.pieces.forEach(piece => {

                if (piece.model === pieceModel && !pieceType.isModelOfThisType(piece.model)) {
                    piece.model = pieceType.convert(pieceModel);
                }
            });

            return {
                textModel: previousState.textModel,
            };
        });
    }

    private addNewAnalysis(pieceModel: WordPieceModel): void
    {
        this.setState(previousState => {

            previousState.textModel.pieces.forEach(piece => {

                const existingPieceModel = piece.model;

                if (existingPieceModel === pieceModel && existingPieceModel instanceof WordPieceModel) {
                    existingPieceModel.addAnalysis(new AnalysisModel(null, null));
                }
            });

            return {
                textModel: previousState.textModel,
            };
        });
    }

    private onLemmaChange(analysis: AnalysisModel, lemma: string | null): void
    {
        this.setState(previousState => {

            previousState.textModel.analyses.forEach(existingAnalysis => {

                if (existingAnalysis === analysis) {
                    existingAnalysis.lemma = lemma;
                }
            });

            return {
                textModel: previousState.textModel,
            };
        });
    }

    private onPartOfSpeechChange(analysis: AnalysisModel, partOfSpeech: string | null): void
    {
        this.setState(previousState => {

            previousState.textModel.analyses.forEach(existingAnalysis => {

                if (existingAnalysis === analysis) {
                    existingAnalysis.partOfSpeech = partOfSpeech;
                }
            });

            return {
                textModel: previousState.textModel,
            };
        });
    }
}