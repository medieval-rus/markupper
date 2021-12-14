import {Component, ReactNode} from 'react';

type Properties = {
    name: string | null;
    value: string | null;
};

export class Attribute extends Component<Properties, {}>
{
    public render(): ReactNode
    {
        return (
            <div className={'markupper-attribute'}>
                <div className={'markupper-attribute-name'}>{this.props.name}</div>
                <div className={'markupper-attribute-value'}>{this.props.value}</div>
            </div>
        );
    }
}