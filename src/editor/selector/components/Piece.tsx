import {Component, ReactNode} from 'react';
import {PieceModelInterface} from '../../../model/pieces/PieceModelInterface';
import {NonePieceModel} from '../../../model/pieces/NonePieceModel';
import {WordPieceModel} from '../../../model/pieces/WordPieceModel';
import {PunctuationPieceModel} from '../../../model/pieces/PunctuationPieceModel';
import {OnPieceSelect} from '../../events/OnPieceSelect';

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
                className={`markupper-piece ${this.getPieceTypeDependentClass()} ${this.getSelectDependentClass()}`}
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

    private getPieceTypeDependentClass(): string
    {
        switch (this.props.model.constructor) {
            case NonePieceModel:
                return 'markupper-piece__none';
            case WordPieceModel:
                return 'markupper-piece__word';
            case PunctuationPieceModel:
                return 'markupper-piece__punctuation';
            default:
                throw new Error(`Unknown piece type ${typeof this.props.model}.`)
        }
    }

    private getSelectDependentClass(): string
    {
        return this.props.isSelected ? 'markupper-piece-selected' : '';
    }
}