import useFetch from "./useFetch";
import { useEffect, useState } from "react";

const useDynamicFetch = (id, mediaType) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/${mediaType}/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();

    }, [id, mediaType]);

    return { data, loading, error };
};

export default useDynamicFetch;
