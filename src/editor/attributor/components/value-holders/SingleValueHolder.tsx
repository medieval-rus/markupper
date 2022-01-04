import {Component, ReactNode} from 'react';
import {Combobox} from 'react-widgets/esm';

type Properties = {
    value: string | null;
    suggestedValues: string[] | null;
    onValueChange: (value: string | null) => void
};

export class SingleValueHolder extends Component<Properties, {}>
{
    public constructor(props: Properties)
    {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render(): ReactNode
    {
        return (
            <div className={'markupper-attributor-attribute-value'}>
                <Combobox
                    hideEmptyPopup={true}
                    value={this.props.value}
                    data={this.props.suggestedValues}
                    onChange={this.onChange}
                />
            </div>
        );
    }

    private onChange(dataItem: string): void
    {
        this.props.onValueChange(dataItem);
    }
}