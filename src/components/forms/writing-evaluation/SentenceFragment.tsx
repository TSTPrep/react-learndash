import { Evaluation } from '../../../redux/features/api.types';

type SentenceFragmentProps = Evaluation.SentenceFragmentData;

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
