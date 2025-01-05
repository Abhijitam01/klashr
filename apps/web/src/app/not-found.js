'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { RouterObject } from "../core/router";
import { Skeleton } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function NotFound() {
    const router = useRouter();
    useEffect(() => {
        router.push(RouterObject.route.HOME);
    }, []);
    return _jsx(Skeleton, {});
}
