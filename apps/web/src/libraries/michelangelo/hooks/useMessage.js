'use client';
import { RouterService } from "../../../core/router";
import { useParams, usePathname, useRouter } from 'next/navigation';
import { closeSnackbar } from 'notistack';
import { useEffect } from 'react';
/**
 * Emit request when the path changed
 */
export const useMessageSend = (isActive = false) => {
    const pathname = usePathname();
    const params = useParams();
    useEffect(() => {
        if (!isActive) {
            return;
        }
        window.parent.postMessage({ type: 'ready' }, '*');
    }, []);
    useEffect(() => {
        if (!isActive) {
            return;
        }
        const url = `${window.location.origin}${pathname}`;
        const pathPure = RouterService.restoreUrl(pathname, params);
        window.parent.postMessage({ type: 'navigation', url, pathPure }, '*');
    }, [pathname, params]);
};
/**
 * Change the path on request
 */
export const useMessageReceived = (isActive = false) => {
    const router = useRouter();
    const handleMessage = event => {
        const canContinue = event?.data?.type === 'navigation';
        if (canContinue) {
            const path = event.data.path?.trim();
            if (path && path !== '') {
                router.push(path);
                closeSnackbar();
            }
        }
    };
    useEffect(() => {
        if (!isActive) {
            return;
        }
        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);
};
