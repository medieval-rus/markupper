import {Component, ReactNode} from 'react';
import {Attribute} from './Attribute';
import {Translator} from '../../../services/Translator';
import {SingleValueHolder} from './value-holders/SingleValueHolder';
import {Lemma} from '../../../services/domain/Lemma';
import {PartOfSpeech} from '../../../services/domain/PartOfSpeech';
import {AnalysisModel} from '../../../model/pieces/AnalysisModel';
import {OnPartOfSpeechChange} from '../../events/OnPartOfSpeechChange';
import {OnLemmaChange} from '../../events/OnLemmaChange';

type Properties = {
    analysis: AnalysisModel;
    onLemmaChange: OnLemmaChange;
    onPartOfSpeechChange: OnPartOfSpeechChange;
};

export class AnalysisAttributor extends Component<Properties, {}>
{
    public constructor(props: Properties)
    {
        super(props);
        this.onLemmaChange = this.onLemmaChange.bind(this);
        this.onPartOfSpeechChange = this.onPartOfSpeechChange.bind(this);
    }

    public render(): ReactNode
    {
        return (
            <div className={'markupper-attributor-analysis'}>
                <div className={'markupper-attributor-analysis-label'}>
                    {Translator.translate('attributor.analysis.label', {'%index%': this.props.analysis.name})}
                </div>
                <div className={'markupper-attributor-attributes-container'}>
                    <Attribute name={Translator.translate('attributor.analysis.attribute.lemma')}>
                        <SingleValueHolder
                            value={this.props.analysis.lemma ?? ''}
                            suggestedValues={Lemma.getKnownLemmas()}
                            onValueChange={this.onLemmaChange}
                        />
                    </Attribute>
                    <Attribute name={Translator.translate('attributor.analysis.attribute.partOfSpeech')}>
                        <SingleValueHolder
                            value={this.props.analysis.partOfSpeech ?? ''}
                            suggestedValues={PartOfSpeech.getKnownPartsOfSpeech()}
                            onValueChange={this.onPartOfSpeechChange}
                        />
                    </Attribute>
                </div>
            </div>
        );
    }

    private onLemmaChange(lemma: string): void
    {
        this.props.onLemmaChange(this.props.analysis, lemma.length === 0 ? null : lemma);
    }

    private onPartOfSpeechChange(partOfSpeech: string): void
    {
        this.props.onPartOfSpeechChange(this.props.analysis, partOfSpeech.length === 0 ? null : partOfSpeech);
    }
}