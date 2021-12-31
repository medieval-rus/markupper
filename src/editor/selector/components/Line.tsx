import {Component, ReactNode} from 'react';
import {LineModel} from '../../../model/LineModel';
import {Piece} from './Piece';
import {OnPieceSelect} from '../../events/OnPieceSelect';
import {PieceState} from '../../states/PieceState';

type Properties = {
    model: LineModel<PieceState>;
    onPieceSelect: OnPieceSelect;
};

export class Line extends Component<Properties, {}>
{
    public render(): ReactNode
    {
        return (
            <div className={'markupper-line'}>
                {
                    this
                        .props
                        .model
                        .pieces
                        .map(
                            (piece: PieceState, index: number): ReactNode => <Piece
                                key={index}
                                model={piece.model}
                                isSelected={piece.isSelected}
                                onPieceSelect={this.props.onPieceSelect}
                            />
                        )
                }
            </div>
        );
    }
}