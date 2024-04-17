import { Evaluation } from '../../redux/features/api.types';
import SentenceFragment from './SentenceFragmentP';

export type SentenceData = Evaluation.SentenceData;
export type SentenceViewType = 'student' | 'corrected' | 'inline';

type SentenceProps = {
    index: number;
    data: SentenceData;
    viewType: SentenceViewType;
    mouseEnter: (element: HTMLElement, text: string) => void;
    mouseLeave: () => void;
};

export default function Sentence({
    index,
    data,
    viewType,
    mouseEnter,
    mouseLeave,
}: SentenceProps) {
    return (
        <span className={`s${index}`}>
            {data.map((d, i) => (
                <SentenceFragment
                    key={i}
                    viewType={viewType}
                    mouseEnter={mouseEnter}
                    mouseLeave={mouseLeave}
                    {...d}
                />
            ))}
        </span>
    );
}
