import { Evaluation } from '../../redux/features/api.types';
import { SentenceViewType } from './Sentence';

type SentenceFragmentProps = Evaluation.SentenceFragmentData & {
    viewType: SentenceViewType;
    mouseEnter: (element: HTMLElement, text: string) => void;
    mouseLeave: () => void;
};

export default function SentenceFragment({
    op,
    word,
    replace,
    viewType,
    mouseEnter,
    mouseLeave,
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

    if (viewType === 'student') {
        return (
            <>
                <span
                    onMouseEnter={e => mouseEnter(e.target as HTMLElement, replace)}
                    onMouseLeave={() => mouseLeave()}
                    className='incorrect'
                >
                    {word}
                </span>
            </>
        );
    }

    if (viewType === 'corrected') {
        return (
            <>
                {/* <span className='incorrect'>{word}</span> */}
                <span className='correct'>{replace}</span>
            </>
        );
    }

    return (
        <>
            <span className='incorrect'>{word}</span>
            <span className='correct'>{replace}</span>
        </>
    );
}
