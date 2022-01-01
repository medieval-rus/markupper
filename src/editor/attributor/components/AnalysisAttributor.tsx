import {Component, Fragment, ReactNode} from 'react';
import {Attribute} from './Attribute';
import {Translator} from '../../../services/Translator';
import {SingleValueHolder} from './value-holders/SingleValueHolder';
import {Lemma} from '../../../services/domain/Lemma';
import {PartOfSpeech} from '../../../services/domain/PartOfSpeech';
import {AnalysisModel} from '../../../model/pieces/AnalysisModel';

type Properties = {
    analysis: AnalysisModel;
    onLemmaChange: (analysis: AnalysisModel, lemma: string | null) => void;
    onPartOfSpeechChange: (analysis: AnalysisModel, partOfSpeech: string | null) => void;
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
            <Fragment>
                <Attribute name={Translator.translate('attributor.attribute.analysis.lemma')}>
                    <SingleValueHolder
                        value={this.props.analysis.lemma ?? ''}
                        suggestedValues={Lemma.getKnownLemmas()}
                        onValueChange={this.onLemmaChange}
                    />
                </Attribute>
                <Attribute name={Translator.translate('attributor.attribute.analysis.partOfSpeech')}>
                    <SingleValueHolder
                        value={this.props.analysis.partOfSpeech ?? ''}
                        suggestedValues={PartOfSpeech.getKnownPartsOfSpeech()}
                        onValueChange={this.onPartOfSpeechChange}
                    />
                </Attribute>
            </Fragment>
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