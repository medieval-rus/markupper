export abstract class Translator
{
    private static readonly dictionary: any = {
        attributor: {
            analysis: {
                label: 'Разбор %index%',
                attribute: {
                    lemma: 'Лемма',
                    partOfSpeech: 'Часть речи'
                }
            },
            piece: {
                label: '%label%',
                attribute: {
                    pieceType: 'Тип',
                    addNewAnalysis: 'Добавить разбор',
                },
            }
        }
    };

    public static translate(key: string, values: {[key: string]: string} = {}): string
    {
        let target: any = Translator.dictionary;

        for (const subKey of key.split('.')) {
            target = target[subKey];
        }

        if (typeof target !== 'string') {
            throw new Error(`Translation key ${key} doesn't exist.`)
        }

        for (const [search, replace] of Object.entries(values)) {
            target = target.replace(search, replace)
        }

        return target;
    }
}