import {ChangeEvent, Component, ReactNode} from 'react';

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
            <input
                className={'markupper-attribute-value'}
                value={this.props.value}
                onChange={this.onChange}
                placeholder={this.props.suggestedValues.join(', ')}
            />
        );
    }

    private onChange(event: ChangeEvent<HTMLInputElement>): void
    {
        this.props.onValueChange(event.target.value);
    }
}