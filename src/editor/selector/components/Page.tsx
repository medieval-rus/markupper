import {Component, ReactNode} from 'react';
import {PageModel} from '../../../model/PageModel';
import {LineModel} from '../../../model/LineModel';
import {Line} from './Line';
import {OnPieceSelect} from '../../events/OnPieceSelect';
import {PieceState} from '../../states/PieceState';

type Properties = {
    model: PageModel<PieceState>;
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
                            (line: LineModel<PieceState>, index: number): ReactNode => <Line
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