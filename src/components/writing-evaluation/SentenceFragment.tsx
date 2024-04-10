import { Evaluation } from '../../redux/features/api.types';
import { SentenceViewType } from './Sentence';

type SentenceFragmentProps = Evaluation.SentenceFragmentData & {
    viewType: SentenceViewType;
};

export default function SentenceFragment({
    op,
    word,
    replace,
    viewType,
}: SentenceFragmentProps) {
    if (!replace) {
        if (viewType === 'student' && op === 'addition') {
            return null;
        }

        if (viewType === 'corrected' && op === 'deletion') {
            return null;
        }

        return <span className={op}>{word}</span>;
    }

    return (
        <>
            {viewType !== 'corrected' && <span className='incorrect'>{word}</span>}
            {viewType !== 'student' && <span className='correct'>{replace}</span>}
        </>
    );
}
