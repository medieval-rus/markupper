import {Component, ReactNode} from 'react';
import {TextModel} from '../../../model/TextModel';
import {PageModel} from '../../../model/PageModel';
import {Page} from './Page';
import {OnPieceSelect} from '../../events/OnPieceSelect';
import {PieceState} from '../../states/PieceState';

type Properties = {
    model: TextModel<PieceState>;
    onPieceSelect: OnPieceSelect;
};

export class Text extends Component<Properties, {}>
{
    public render(): ReactNode
    {
        return (
            <div className={'markupper-text'}>
                {
                    this
                        .props
                        .model
                        .pages
                        .map(
                            (page: PageModel<PieceState>, index: number): ReactNode => <Page
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