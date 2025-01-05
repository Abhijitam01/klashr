/**
 * @provider Next Router
 * @description The application uses NextJS Router for navigation. You shall use router.push(path) for navigation and links across the pages.
 * @usage `const router = useRouter(); router.push(path); `
 * @function {(path: string) => void} push - Navigate to the path
 * @import import { useRouter, useParams } from 'next/navigation'
 */
export var RouterService;
(function (RouterService) {
    function buildUrl(route, params = {}) {
        let routeBuilt = route;
        Object.entries(params).forEach(([key, value]) => (routeBuilt = routeBuilt.replace(`:${key}`, value)));
        return routeBuilt;
    }
    RouterService.buildUrl = buildUrl;
    function restoreUrl(route, params) {
        let routeRestored = route;
        Object.entries(params).forEach(([key, value]) => (routeRestored = routeRestored.replace(value, `:${key}`)));
        return routeRestored;
    }
    RouterService.restoreUrl = restoreUrl;
    function applyParamsToUrl(route, params) {
        let routeRestored = route;
        Object.entries(params).forEach(([key, value]) => (routeRestored = routeRestored.replace(`:${key}`, value)));
        return routeRestored;
    }
    RouterService.applyParamsToUrl = applyParamsToUrl;
    function getDepth(route) {
        return route?.split('/').filter(item => item !== '').length;
    }
    RouterService.getDepth = getDepth;
})(RouterService || (RouterService = {}));
