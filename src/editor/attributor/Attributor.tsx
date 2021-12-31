import {Component, ReactNode} from 'react';
import {Attribute} from './components/Attribute';
import {PieceState} from '../states/PieceState';
import {PieceModelInterface} from '../../model/pieces/PieceModelInterface';
import {SingleListValueHolder} from './components/value-holders/SingleListValueHolder';
import {PieceType} from '../../services/domain/PieceType';

type Properties = {
    pieceModels: PieceState[];
    onPieceTypeChange: (pieceModel: PieceModelInterface, pieceType: string) => void;
};

export class Attributor extends Component<Properties, {}>
{
    public constructor(props: Properties)
    {
        super(props);
        this.onPieceTypeChange = this.onPieceTypeChange.bind(this);
    }

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
                    <Attribute name={'Тип'}>
                        <SingleListValueHolder
                            values={Attributor.getPieceTypes()}
                            selectedValue={Attributor.getPieceType(pieceModel)}
                            onValueChange={this.onPieceTypeChange.bind(this, pieceModel)}
                        />
                    </Attribute>
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

    private static getPieceType(pieceModel: PieceModelInterface): string
    {
        return PieceType.getPieceTypeByModel(pieceModel).key;
    }

    private static getPieceTypes(): [string, string][]
    {
        return PieceType.getPieceTypes().map(pieceType => [pieceType.key, pieceType.name]);
    }
}