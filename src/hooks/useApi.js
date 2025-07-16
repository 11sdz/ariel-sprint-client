import { useEffect, useState } from "react";
import axios from "axios";

export function useApi(url, options = {}) {
    const {
        method = "GET",
        body = null,
        headers = { "Content-Type": "application/json" },
        immediate = true,
    } = options;

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(immediate);
    const [trigger, setTrigger] = useState(0);

    // Store the current request data dynamically (for mutate)
    const [requestBody, setRequestBody] = useState(body);

    useEffect(() => {
        if (!immediate && trigger === 0) return;

        setLoading(true);
        setError(null);

        axios({
            url,
            method,
            headers,
            data: requestBody,
        })
            .then((response) => setData(response.data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [url, method, immediate, trigger, requestBody]);

    const refetch = () => setTrigger((prev) => prev + 1);

    // For POST/PUT/etc: send new data
    const mutate = (newData) => {
        setRequestBody(newData);
        setTrigger((prev) => prev + 1);
    };

    return { data, loading, error, refetch, mutate };
}
