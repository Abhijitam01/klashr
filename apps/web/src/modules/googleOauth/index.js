import { jsx as _jsx } from "react/jsx-runtime";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useConfiguration } from "../../core/configuration";
export var GoogleOauth;
(function (GoogleOauth) {
    GoogleOauth.useClientId = () => {
        const { googleClientId } = useConfiguration();
        return googleClientId;
    };
    GoogleOauth.useActive = () => {
        return !!GoogleOauth.useClientId();
    };
    GoogleOauth.Provider = ({ children }) => {
        const clientId = GoogleOauth.useClientId();
        if (!GoogleOauth.useActive()) {
            return children;
        }
        return (_jsx(GoogleOAuthProvider, { clientId: clientId, children: children }));
    };
})(GoogleOauth || (GoogleOauth = {}));
