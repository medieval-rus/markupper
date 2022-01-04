import {Component, ReactNode} from 'react';
import {DropdownList} from 'react-widgets/esm';
import {PieceType} from '../../../../services/domain/PieceType';

type Properties<TValue> = {
    values: TValue[];
    selectedValue: TValue;
    onValueChange: (value: PieceType) => void;
    keyExtractor: (value: TValue) => string;
    labelExtractor: (value: TValue) => string;
};

export class SingleListValueHolder<TValue> extends Component<Properties<TValue>, {}>
{
    public constructor(props: Properties<TValue>)
    {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render(): ReactNode
    {
        return (
            <div
                className={'markupper-attributor-attribute-value'}
            >
                <DropdownList
                    value={this.props.selectedValue}
                    data={this.props.values}
                    dataKey={this.props.keyExtractor}
                    textField={this.props.labelExtractor}
                    onChange={this.onChange}
                />
            </div>
        );
    }

    private onChange(pieceType: PieceType): void
    {
        this.props.onValueChange(pieceType);
    }
}