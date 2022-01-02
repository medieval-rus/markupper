import {Component, ReactNode} from 'react';
import {PieceModelInterface} from '../../../model/pieces/PieceModelInterface';
import {OnPieceSelect} from '../../events/OnPieceSelect';
import {PieceType} from '../../../services/domain/PieceType';

type Properties = {
    model: PieceModelInterface;
    isSelected: boolean;
    onPieceSelect: OnPieceSelect;
};

export class Piece extends Component<Properties, {}>
{
    public constructor(props: Properties)
    {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    public render(): ReactNode
    {
        return (
            <div
                className={
                    'markupper-selector-piece ' +
                    `markupper-selector-piece__${PieceType.getPieceTypeByModel(this.props.model).key} ` +
                    `${this.props.isSelected ? 'markupper-selector-piece-selected' : ''}`
                }
                onClick={this.onClick}
            >
                {this.props.model.value}
            </div>
        );
    }

    private onClick(): void
    {
        this.props.onPieceSelect(this.props.model);
    }
}