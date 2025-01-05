import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
export const useHttpQuery = (query, options = {}) => {
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState(options.defaultData);
    const [isLoading, setLoading] = useState(options.defaultLoading ?? true);
    const [error, setError] = useState();
    const [pageIndex, setPageIndex] = useState(1);
    const nextPage = () => {
        setPageIndex(pageIndex + 1);
    };
    const previousPage = () => {
        if (pageIndex > 1) {
            setPageIndex(pageIndex - 1);
        }
    };
    const run = async () => {
        setLoading(true);
        try {
            const queryOptions = {
                pagination: { page: pageIndex, countItems: 50 },
            };
            const data = await query({ queryOptions });
            setData(data);
        }
        catch (error) {
            setError(error.message);
            enqueueSnackbar(error.message);
        }
        setLoading(false);
    };
    useEffect(() => {
        run();
    }, []);
    return {
        data,
        isLoading,
        error,
        run,
        setData,
        pagination: {
            index: pageIndex,
            previous: previousPage,
            next: nextPage,
            set: setPageIndex,
        },
    };
};
