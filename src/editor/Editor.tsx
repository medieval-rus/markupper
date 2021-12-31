import {Component, ReactNode} from 'react';
import {Attributor} from './attributor/Attributor';
import {Selector} from './selector/Selector';
import {TextModel} from '../model/TextModel';
import {PieceModelInterface} from '../model/pieces/PieceModelInterface';
import {PieceState} from './states/PieceState';
import {PageModel} from '../model/PageModel';
import {LineModel} from '../model/LineModel';
import {KeyboardListener} from '../services/KeyboardListener';
import {PieceType} from '../services/domain/PieceType';

type Properties = {
    keyboardListener: KeyboardListener;
    textModel: TextModel<PieceModelInterface>;
};

type State = {
    textModel: TextModel<PieceState>;
    pieces: Set<PieceState>;
};

export class Editor extends Component<Properties, State>
{
    public state: State = this.createState();

    public constructor(props: Properties)
    {
        super(props);
        this.onPieceSelect = this.onPieceSelect.bind(this);
        this.onPieceTypeChange = this.onPieceTypeChange.bind(this);
    }

    public render(): ReactNode
    {
        return (
            <div className={'markupper-editor'}>
                <Selector textModel={this.state.textModel} onPieceSelect={this.onPieceSelect}/>
                <Attributor pieceModels={this.state.pieces} onPieceTypeChange={this.onPieceTypeChange}/>
            </div>
        );
    }

    private onPieceSelect(selectedPieceModel: PieceModelInterface): void
    {
        this.setState((previousState: Readonly<State>): State => {

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
                pieces: previousState.pieces,
            };
        });
    }

    private onPieceTypeChange(pieceModel: PieceModelInterface, pieceTypeName: string): void
    {
        const pieceType = PieceType.getPieceTypeByName(pieceTypeName);

        this.setState((previousState: Readonly<State>): State => {

            previousState.textModel.pieces.forEach(piece => {

                if (piece.model === pieceModel && !pieceType.isModelOfThisType(piece.model)) {
                    piece.model = pieceType.factory(pieceModel);
                }
            });

            return {
                textModel: previousState.textModel,
                pieces: previousState.pieces,
            };
        });
    }

    private createState(): State
    {
        const model = new TextModel<PieceState>(
            this
                .props
                .textModel
                .pages
                .map(
                    pageModel => new PageModel<PieceState>(
                        pageModel
                            .lines
                            .map(
                                lineModel => new LineModel<PieceState>(
                                    lineModel
                                        .pieces
                                        .map(piece => new PieceState(piece, false))
                                )
                            )
                    )
                )
        );

        return {
            textModel: model,
            pieces: new Set<PieceState>(model.pieces),
        };
    }
}