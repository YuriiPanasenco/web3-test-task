import {useState, useEffect} from 'react';


export default function useDebounce<T>(value: T, delay: number): [[T][0], () => void] {
    const [query, setQuery] = useState(value);
    const [timer, setTimer] = useState(null);

    const enter = () => {
        clearTimeout(timer);
        setQuery(value);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setQuery(value);
        }, delay);
        setTimer(timer);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return [
        query,
        enter
    ];
}
