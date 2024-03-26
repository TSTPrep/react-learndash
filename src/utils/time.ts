import { useEffect, useState } from 'react';

const msInSecond = 1000;
const msInMinute = 60 * 1000;
const msInAHour = 60 * msInMinute;
const msInADay = 24 * msInAHour;

type TimeParts<T extends string | number> = {
    days: T;
    hours: T;
    minutes: T;
    seconds: T;
};

const getPartsofTimeDuration = (duration: number): TimeParts<number> => {
    const days = Math.floor(duration / msInADay);
    const hours = Math.floor((duration % msInADay) / msInAHour);
    const minutes = Math.floor((duration % msInAHour) / msInMinute);
    const seconds = Math.floor((duration % msInMinute) / msInSecond);
    return { days, hours, minutes, seconds };
};

const formatNumber = (n: number): string => n.toString().padStart(2, '0');

const formatTimeParts = (timeParts: TimeParts<number>): TimeParts<string> => ({
    days: formatNumber(timeParts.days),
    hours: formatNumber(timeParts.hours),
    minutes: formatNumber(timeParts.minutes),
    seconds: formatNumber(timeParts.seconds),
});

const Time = endDateTime => {
    const date = new Date().toLocaleTimeString();
    const [time, setTime] = useState(date);

    const now = Date.now(); // Number of milliseconds from begining of time
    const future = new Date(endDateTime);
    const timeDif = future.getTime() - now;
    let timeParts = formatTimeParts(getPartsofTimeDuration(timeDif));

    useEffect(() => {
        const timeout = setTimeout(() => {
            const date = new Date();
            setTime(date.toLocaleTimeString());
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, [time]);

    return timeParts;
};
export default Time;
