import { HttpError } from "../../../core/http";
import { Api } from "../../api";
import { useState } from 'react';
export const useAuthenticationResetPassword = () => {
    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [errors, setErrors] = useState([]);
    const reset = async (token, password) => {
        setLoading(true);
        setErrors([]);
        try {
            await Api.Authentication.resetPassword(token, password);
            setSuccess(true);
        }
        catch (error) {
            const code = HttpError.getCode(error);
            const isIncorrect = code === 4;
            if (isIncorrect) {
                setErrors(['Your token has expired']);
            }
            else {
                setErrors(['Something went wrong']);
            }
        }
        setLoading(false);
    };
    return {
        reset,
        isLoading,
        isSuccess,
        errors,
    };
};
