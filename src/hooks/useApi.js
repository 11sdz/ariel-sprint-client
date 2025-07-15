import { useEffect, useState } from 'react';
import axios from 'axios'

export function useApi(url, options = {}) {
    const { method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }, immediate = true } = options;

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(immediate);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        if (!immediate && trigger === 0) return;

        setLoading(true);
        setError(null);

        axios({
            url,
            method,
            headers,
            data: body,
        })
            .then((response) => setData(response.data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [url, method, immediate, trigger]);

    const refetch = () => setTrigger((prev) => prev + 1);

    return {data, loading, error, refetch};
}
