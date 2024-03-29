import SentenceFragment, { SentenceFragmentData } from './SentenceFragment';

export type SentenceData = SentenceFragmentData[];

type SentenceProps = {
    index: number;
    data: SentenceData;
};

export default function Sentence({ index, data }: SentenceProps) {
    return (
        <span className={`s${index}`}>
            {data.map((d, i) => (
                <SentenceFragment key={i} {...d} />
            ))}
        </span>
    );
}
