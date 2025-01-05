import { HttpError } from "../../../core/http";
import { Api } from "../..";
import { useState } from 'react';
import { AuthenticationHook } from '../authentication.hook';
export const useAuthenticationRegister = () => {
    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [errors, setErrors] = useState([]);
    const authenticationToken = AuthenticationHook.useToken();
    const register = async (values) => {
        setLoading(true);
        setErrors([]);
        try {
            const { token } = await Api.Authentication.register(values);
            authenticationToken.setToken(token);
            setSuccess(true);
        }
        catch (error) {
            const code = HttpError.getCode(error);
            const isIncorrect = code === 3;
            if (isIncorrect) {
                setErrors(['This email is not available']);
            }
            else {
                const messages = HttpError.getValidationMessages(error);
                if (messages.length > 0) {
                    setErrors(messages);
                }
                else {
                    setErrors(['Something went wrong']);
                }
            }
        }
        setLoading(false);
    };
    return {
        register,
        isLoading,
        isSuccess,
        errors,
    };
};
