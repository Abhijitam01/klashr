import { HttpError } from "../../../core/http";
import { Api } from "../../api";
import { useState } from 'react';
import { AuthenticationHook } from '../authentication.hook';
export const useAuthenticationLogin = () => {
    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [errors, setErrors] = useState([]);
    const authenticationToken = AuthenticationHook.useToken();
    const login = async (values) => {
        setLoading(true);
        setErrors([]);
        try {
            const { token } = await Api.Authentication.login(values);
            authenticationToken.setToken(token);
            setSuccess(true);
        }
        catch (error) {
            const code = HttpError.getCode(error);
            const isIncorrect = code === 2;
            if (isIncorrect) {
                setErrors(['Incorrect email or password']);
            }
            else {
                setErrors(['Something went wrong']);
            }
        }
        setLoading(false);
    };
    return {
        login,
        isLoading,
        isSuccess,
        errors,
    };
};
