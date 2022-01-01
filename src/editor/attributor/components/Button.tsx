import {Component, ReactNode} from 'react';

type Properties = {
    text: string;
    onClick: () => void;
};

export class Button extends Component<Properties, {}>
{
    public render(): ReactNode
    {
        return (
            <button type={'button'} className={'btn'} onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
}