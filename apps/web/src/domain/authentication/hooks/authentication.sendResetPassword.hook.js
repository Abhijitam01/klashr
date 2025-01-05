import { HttpError } from "../../../core/http";
import { Api } from "../../api";
import { useState } from 'react';
export const useAuthenticationSendResetPassword = () => {
    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [errors, setErrors] = useState([]);
    const sendEmail = async (email) => {
        setLoading(true);
        setErrors([]);
        try {
            await Api.Authentication.sendResetPassword(email);
            setSuccess(true);
        }
        catch (error) {
            // We avoid indicating if the email exists for security reasons
            console.log(error);
            const messages = HttpError.getValidationMessages(error);
            if (messages.length > 0) {
                setErrors(messages);
            }
            else {
                setErrors(['Something went wrong']);
            }
        }
        setLoading(false);
    };
    return {
        sendEmail,
        isLoading,
        isSuccess,
        errors,
    };
};
