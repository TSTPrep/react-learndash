import { Evaluation } from '../../redux/features/api.types';
import { PopperState } from './EvaluationResponseP';
import { SentenceViewType } from './Sentence';

type SentenceFragmentProps = {
    data: Evaluation.SentenceFragmentData;
    viewType: SentenceViewType;
    mouseEnter: (element: HTMLElement, state: PopperState) => void;
    mouseLeave: () => void;
};

export default function SentenceFragment({
    data,
    viewType,
    mouseEnter,
    mouseLeave,
}: SentenceFragmentProps) {
    if (data.op === 'nochange') {
        return <span className={data.op}>{data.word}</span>;
    }

    if (data.op === 'addition') {
        if (viewType === 'student') {
            return null;
        }

        return (
            <span
                onMouseEnter={e =>
                    mouseEnter(e.target as HTMLElement, {
                        indicator: data.indicator,
                        feedback: data.feedback,
                        mistake: data.word,
                        indication: 'Add',
                    })
                }
                onMouseLeave={() => mouseLeave()}
                className='addition'
            >
                {data.word}
            </span>
        );
    }

    if (data.op === 'deletion') {
        if (viewType === 'corrected') {
            return null;
        }

        return (
            <span
                onMouseEnter={e =>
                    mouseEnter(e.target as HTMLElement, {
                        indicator: data.indicator,
                        feedback: data.feedback,
                        mistake: data.word,
                        indication: 'Delete',
                    })
                }
                onMouseLeave={() => mouseLeave()}
                className='deletion'
            >
                {data.word}
            </span>
        );
    }

    if (viewType === 'inline') {
        return (
            <span
                onMouseEnter={e =>
                    mouseEnter(e.target as HTMLElement, {
                        indicator: data.indicator,
                        feedback: data.feedback,
                        mistake: data.word,
                        correction: data.replace,
                        indication: 'Replace',
                    })
                }
                onMouseLeave={() => mouseLeave()}
                className='replacement'
            >
                <span className='incorrect'>{data.word}</span>
                <span className='correct'>{data.replace}</span>
            </span>
        );
    }

    return (
        <span
            onMouseEnter={e =>
                mouseEnter(e.target as HTMLElement, {
                    indicator: data.indicator,
                    feedback: data.feedback,
                    mistake: data.word,
                    correction: data.replace,
                    indication: 'Replace',
                })
            }
            onMouseLeave={() => mouseLeave()}
            className={viewType === 'student' ? 'incorrect' : 'correct'}
        >
            {viewType === 'student' ? data.word : data.replace}
        </span>
    );
}
