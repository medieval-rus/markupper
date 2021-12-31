import {ChangeEvent, Component, ReactNode} from 'react';

type Properties = {
    values: [string, string][];
    selectedValue: string;
    onValueChange: (value: string) => void
};

export class SingleListValueHolder extends Component<Properties, {}>
{
    public constructor(props: Properties)
    {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render(): ReactNode
    {
        return (
            <select onChange={this.onChange} value={this.props.selectedValue}>
                {
                    this
                        .props
                        .values
                        .map(
                            value =>
                                <option key={value[0]} value={value[0]}>
                                    {value[1]}
                                </option>
                        )
                }
            </select>
        );
    }

    private onChange(event: ChangeEvent<HTMLSelectElement>): void
    {
        this.props.onValueChange(event.target.value);
    }
}