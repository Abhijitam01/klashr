import { jsx as _jsx } from "react/jsx-runtime";
/**
 * @provider Configuration
 * @description A useConfiguration provider to retrieve .env variables
 * @import import { useConfiguration } from '@web/core/configuration'
 * @usage { envVariable } = useConfiguration()
 */
import { Utility } from "../../libraries/utility";
import { createContext, useContext, useEffect, useState, } from 'react';
import { HttpService } from '../http';
const ConfigurationContext = createContext(undefined);
export const useConfiguration = () => {
    return useContext(ConfigurationContext);
};
export const ConfigurationProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [values, setValues] = useState({});
    let apiBaseUrl = values.API_BASE_URL ?? 'http://localhost:3099';
    useEffect(() => {
        fetch('/next-api/configuration')
            .then(res => res.json())
            .then((configuration) => {
            setValues(configuration);
            const apiBaseUrlRaw = configuration.API_BASE_URL ?? 'http://localhost:3099';
            apiBaseUrl = Utility.removeTrailingSlash(apiBaseUrlRaw) + '/api';
            HttpService.api.setBaseUrl(apiBaseUrl);
        })
            .catch(error => console.error(`Could not fetch configuration: ${error.message}`))
            .finally(() => setLoading(false));
    }, []);
    const environment = values.NODE_ENV ?? 'development';
    const isEnvironmentProduction = environment === 'production';
    const isEnvironmentDevelopment = environment === 'development';
    const localEmailServerUrl = 'http://localhost:8022';
    const googleClientId = values.GOOGLE_CLIENT_ID;
    const toolBaseUrl = values.TOOL_BASE_URL;
    const mapboxAccessToken = values.MAPBOX_ACCESS_TOKEN;
    const isMarblismMichelangeloActive = values.MARBLISM_MICHELANGELO_ACTIVE && !isEnvironmentProduction;
    return (_jsx(ConfigurationContext.Provider, { value: {
            isEnvironmentProduction,
            isEnvironmentDevelopment,
            localEmailServerUrl,
            apiBaseUrl,
            googleClientId,
            toolBaseUrl,
            isMarblismMichelangeloActive,
            mapboxAccessToken,
        }, children: !isLoading && children }));
};
