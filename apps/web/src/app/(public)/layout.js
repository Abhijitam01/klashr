'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { NavigationLayout } from "../../layouts/NavigationLayout";
import { AuthenticationGuard } from "../../modules/authentication";
export default function PublicLayout({ children }) {
    return (_jsx(AuthenticationGuard, { type: "public", children: _jsx(NavigationLayout, { children: children }) }));
}
