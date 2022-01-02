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
            <div className={'markupper-attributor-attribute'}>
                <div className={'markupper-attributor-attribute-name'}>{this.props.name}</div>
                {this.props.children}
            </div>
        );
    }
}