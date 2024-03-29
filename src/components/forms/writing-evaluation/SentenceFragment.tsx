export type SentenceFragmentType = 'nochange' | 'addition' | 'deletion' | 'replacement';
export type SingleFragmentType = 'nochange' | 'addition' | 'deletion';
export type DoubleFragmentType = 'replacement';

export type SentenceFragmentData =
    | {
          op: SingleFragmentType;
          word: string;
          replace?: undefined;
      }
    | {
          op: DoubleFragmentType;
          word: string;
          replace: string;
      };

type SentenceFragmentProps = SentenceFragmentData;

export default function SentenceFragment({ op, word, replace }: SentenceFragmentProps) {
    if (!replace) {
        return <span className={op}>{word}</span>;
    }

    return (
        <>
            <span className='incorrect'>{word}</span>
            <span className='correct'>{replace}</span>
        </>
    );
}
