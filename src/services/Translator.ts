export abstract class Translator
{
    private static readonly dictionary: any = {
        attributor: {
            attribute: {
                piece: {
                    pieceType: 'Тип',
                    addNewAnalysis: 'Добавить разбор',
                },
                analysis: {
                    lemma: 'Лемма',
                    partOfSpeech: 'Часть речи'
                }
            }
        }
    };

    public static translate(key: string): string
    {
        let target: any = Translator.dictionary;

        for (const subKey of key.split('.')) {
            target = target[subKey];
        }

        if (typeof target !== 'string') {
            throw new Error(`Translation key ${key} doesn't exist.`)
        }

        return target;
    }
}