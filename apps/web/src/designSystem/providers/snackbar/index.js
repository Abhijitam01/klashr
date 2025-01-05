import { jsx as _jsx } from "react/jsx-runtime";
import { SnackbarProvider } from 'notistack';
/**
 * @provider Snackbar
 * @description Notistack is a React library which makes it super easy to display notifications on your web apps
 * @usage `const { enqueueSnackbar } = useSnackbar()`
 * @import import { useSnackbar } from 'notistack'
 * @function {(message: string, {variant: 'error' | 'success' | 'info'}) => void} enqueueSnackbar - Display a toast to the user

 */
export var Snackbar;
(function (Snackbar) {
    class Instance {
        static isSetup = false;
        static enqueueSnackbarRef;
        static async setup(useSnackbar) {
            if (this.isSetup) {
                return;
            }
            this.enqueueSnackbarRef = useSnackbar.enqueueSnackbar;
            this.isSetup = true;
        }
        static enqueueSnackbar(message, options) {
            return this.enqueueSnackbarRef(message, {
                ...options,
                style: { whiteSpace: 'pre-line', fontFamily: 'Helvetica Neue' },
            });
        }
    }
    Snackbar.Instance = Instance;
    Snackbar.Provider = ({ children }) => {
        return _jsx(SnackbarProvider, { maxSnack: 3, children: children });
    };
})(Snackbar || (Snackbar = {}));
