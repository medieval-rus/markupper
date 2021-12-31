import {Component, ReactChild, ReactNode} from 'react';

type Properties = {
    name: string | null;
    children: ReactChild;
};

export class Attribute extends Component<Properties, {}>
{
    public render(): ReactNode
    {
        return (
            <div className={'markupper-attribute'}>
                <div className={'markupper-attribute-name'}>{this.props.name}</div>
                {this.props.children}
            </div>
        );
    }
}