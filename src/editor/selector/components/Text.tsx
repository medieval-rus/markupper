import {Component, ReactNode} from 'react';
import {TextModel} from '../../../model/TextModel';
import {Page} from './Page';
import {OnPieceSelect} from '../../events/OnPieceSelect';

type Properties = {
    model: TextModel;
    onPieceSelect: OnPieceSelect;
};

export class Text extends Component<Properties, {}>
{
    public render(): ReactNode
    {
        return (
            <div className={'markupper-selector-text'}>
                {
                    this
                        .props
                        .model
                        .pages
                        .map(
                            (page, index) => <Page
                                key={index}
                                model={page}
                                onPieceSelect={this.props.onPieceSelect}
                            />
                        )
                }
            </div>
        );
    }
}