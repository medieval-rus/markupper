import {Component, ReactNode} from 'react';
import {LineModel} from '../../../model/LineModel';
import {Piece} from './Piece';
import {OnPieceSelect} from '../../events/OnPieceSelect';

type Properties = {
    model: LineModel;
    onPieceSelect: OnPieceSelect;
};

export class Line extends Component<Properties, {}>
{
    public render(): ReactNode
    {
        return (
            <div className={'markupper-selector-line'}>
                {
                    this
                        .props
                        .model
                        .pieces
                        .map(
                            (piece, index) => <Piece
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