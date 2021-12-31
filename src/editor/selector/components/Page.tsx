import {Component, ReactNode} from 'react';
import {PageModel} from '../../../model/PageModel';
import {Line} from './Line';
import {OnPieceSelect} from '../../events/OnPieceSelect';

type Properties = {
    model: PageModel;
    onPieceSelect: OnPieceSelect;
};

export class Page extends Component<Properties, {}>
{
    public render(): ReactNode
    {
        return (
            <div className={'markupper-page'}>
                {
                    this
                        .props
                        .model
                        .lines
                        .map(
                            (line, index) => <Line
                                key={index}
                                model={line}
                                onPieceSelect={this.props.onPieceSelect}
                            />
                        )
                }
            </div>
        );
    }
}