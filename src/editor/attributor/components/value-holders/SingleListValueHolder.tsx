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
            <select
                className={'markupper-attribute-value'}
                value={this.props.selectedValue}
                onChange={this.onChange}
            >
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