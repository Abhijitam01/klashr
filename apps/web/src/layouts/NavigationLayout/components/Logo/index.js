import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { RouterObject } from "../../../../core/router";
import { useRouter } from 'next/navigation';
export const Logo = ({ width = 50, height = 50, style, ...props }) => {
    const router = useRouter();
    const goTo = (url) => {
        router.push(url);
    };
    return (_jsx(_Fragment, { children: _jsx("img", { src: "https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/GdViVG-klashr-bZdj", height: width, width: height, style: {
                borderRadius: '10px',
                cursor: 'pointer',
                ...style,
            }, ...props, onClick: () => goTo(RouterObject.route.HOME) }) }));
};
