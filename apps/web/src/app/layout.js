'use client';
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { ConfigurationProvider } from "../core/configuration";
import { CoreStoreProvider } from "../core/store";
import { DesignSystem, MrbHtml, MrbMain } from "../designSystem";
import { MichelangeloProvider } from "../libraries/michelangelo";
import { AuthenticationProvider } from "../modules/authentication";
import { GoogleOauth } from "../modules/googleOauth";
import { SocketProvider } from '../core/socket';
export default function AppLayout({ children }) {
    return (_jsx(_Fragment, { children: _jsx(DesignSystem.Provider, { children: _jsx(MrbHtml, { children: _jsx(DesignSystem.Nested, { children: _jsx(ConfigurationProvider, { children: _jsx(GoogleOauth.Provider, { children: _jsx(CoreStoreProvider, { children: _jsx(AuthenticationProvider, { children: _jsx(SocketProvider, { children: _jsx(MichelangeloProvider, { children: _jsx(MrbMain, { name: "klashr", children: children }) }) }) }) }) }) }) }) }) }) }));
}
