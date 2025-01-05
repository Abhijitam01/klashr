'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { AuthenticationGuard } from "../../modules/authentication";
export default function LoginLayout({ children }) {
    return (_jsx(AuthenticationGuard, { type: "non-authenticated", children: children }));
}
