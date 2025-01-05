import { HttpError } from "../../../core/http";
import { Api } from "../../api";
import { useState } from 'react';
import { AuthenticationHook } from '../authentication.hook';
export const useAuthenticationGoogle = () => {
    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [errors, setErrors] = useState([]);
    const authenticationToken = AuthenticationHook.useToken();
    const googleCallback = async (response) => {
        setLoading(true);
        setErrors([]);
        try {
            const { token } = await Api.Authentication.googleCallback(response);
            authenticationToken.setToken(token);
            setSuccess(true);
        }
        catch (error) {
            const code = HttpError.getCode(error);
            const isIncorrect = code === 1;
            if (isIncorrect) {
                setErrors(['Could not login with Google']);
            }
            else {
                setErrors(['Something went wrong']);
            }
        }
        setLoading(false);
    };
    return {
        googleCallback,
        isLoading,
        isSuccess,
        errors,
    };
};
