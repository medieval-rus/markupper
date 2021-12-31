import {Component, ReactNode} from 'react';
import {Text} from './components/Text';
import {TextModel} from '../../model/TextModel';
import {OnPieceSelect} from '../events/OnPieceSelect';

type Properties = {
    textModel: TextModel;
    onPieceSelect: OnPieceSelect;
};

export class Selector extends Component<Properties, {}>
{
    public render(): ReactNode
    {
        return (
            <div className={'markupper-selector'}>
                <Text model={this.props.textModel} onPieceSelect={this.props.onPieceSelect}/>
            </div>
        );
    }
}