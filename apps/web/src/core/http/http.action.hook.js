import { useSnackbar } from 'notistack';
import { useState } from 'react';
export const useHttpAction = (options = {}) => {
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState(options.defaultData);
    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [error, setError] = useState();
    const run = async (query) => {
        setLoading(true);
        try {
            const data = await query();
            setData(data);
            setSuccess(true);
        }
        catch (error) {
            setError(error.message);
            enqueueSnackbar(error.message);
        }
        setLoading(false);
    };
    const clear = () => {
        setData(options.defaultData);
        setLoading(false);
        setError(undefined);
    };
    return {
        data,
        isLoading,
        isSuccess,
        error,
        run,
        clear,
    };
};
