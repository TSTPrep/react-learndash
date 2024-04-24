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
    if (viewType === 'student') {
        if (op === 'deletion') {
            return (
                <span
                    onMouseEnter={e =>
                        mouseEnter(e.target as HTMLElement, 'Delete this word')
                    }
                    onMouseLeave={() => mouseLeave()}
                    className='deletion'
                >
                    {word}
                </span>
            );
        }

        if (op === 'replacement') {
            return (
                <>
                    <span
                        onMouseEnter={e =>
                            mouseEnter(e.target as HTMLElement, 'Correct: ' + replace)
                        }
                        onMouseLeave={() => mouseLeave()}
                        className='incorrect'
                    >
                        {word}
                    </span>
                </>
            );
        }
    }

    if (!replace) {
        if (viewType === 'student' && op === 'addition') {
            return null;
        }

        if (viewType === 'corrected' && op === 'deletion') {
            return null;
        }

        return <span className={op}>{word}</span>;
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
