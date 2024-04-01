import { useEffect, useState } from 'react';

export default function Timer() {
    const [seconds, setSeconds] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => setSeconds(s => s + 1), 1000);

        return () => clearInterval(interval);
    }, []);

    return <span className='timer'>{seconds}</span>;
}
