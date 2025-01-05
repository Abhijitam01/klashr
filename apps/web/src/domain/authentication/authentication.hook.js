import { useAuthenticationGoogle } from './hooks/authentication.google.hook';
import { useAuthenticationLogin } from './hooks/authentication.login.hook';
import { useAuthenticationRegister } from './hooks/authentication.register.hook';
import { useAuthenticationResetPassword } from './hooks/authentication.resetPassword.hook';
import { useAuthenticationSendResetPassword } from './hooks/authentication.sendResetPassword.hook';
import { useAuthenticationToken } from './hooks/authentication.token.hook';
export var AuthenticationHook;
(function (AuthenticationHook) {
    AuthenticationHook.useLogin = useAuthenticationLogin;
    AuthenticationHook.useRegister = useAuthenticationRegister;
    AuthenticationHook.useGoogle = useAuthenticationGoogle;
    AuthenticationHook.useSendResetPassword = useAuthenticationSendResetPassword;
    AuthenticationHook.useResetPassword = useAuthenticationResetPassword;
    AuthenticationHook.useToken = useAuthenticationToken;
})(AuthenticationHook || (AuthenticationHook = {}));
