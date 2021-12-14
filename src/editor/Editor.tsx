import {Component, ReactNode} from 'react';
import {Attributor} from './attributor/Attributor';
import {Selector} from './selector/Selector';
import {TextModel} from '../model/TextModel';
import {PieceModelInterface} from '../model/pieces/PieceModelInterface';
import {PieceState} from './states/PieceState';
import {PageModel} from '../model/PageModel';
import {LineModel} from '../model/LineModel';

type Properties = {
    textModel: TextModel<PieceModelInterface>;
};

type State = {
    textModel: TextModel<PieceState>;
    pieces: Set<PieceState>;
};

export class Editor extends Component<Properties, State>
{
    public state: State = this.CreateState();

    public constructor(props: Properties)
    {
        super(props);
        this.onPieceSelect = this.onPieceSelect.bind(this);
    }

    public render(): ReactNode {
        return (
            <div className={'markupper-editor'}>
                <Selector textModel={this.state.textModel} onPieceSelect={this.onPieceSelect}/>
                <Attributor pieceModels={this.state.pieces}/>
            </div>
        );
    }

    private onPieceSelect(newPieceModel: PieceModelInterface): void
    {
        this.setState((previousState: Readonly<State>): State => {

            for (const pieceState of previousState.textModel.pieces) {
                if (pieceState.piece === newPieceModel) {
                    pieceState.toggle();
                }
            }

            return {
                textModel: previousState.textModel,
                pieces: previousState.pieces,
            };
        });
    }

    private CreateState(): State
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