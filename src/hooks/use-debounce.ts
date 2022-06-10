import { useState, useEffect } from 'react';

const useDebounce = <T>(value: T, delay: number) => {
    const [debounced, setDebounced] = useState<T>(value);

    useEffect(() => {
        const ref = setTimeout(() => {
            setDebounced(value);
        }, delay);

        return () => {
            clearTimeout(ref);
        };
    }, [value, delay]);

    return debounced;
};

export default useDebounce;
