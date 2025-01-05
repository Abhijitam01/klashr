'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { RouterObject } from "../core/router";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function App() {
    const router = useRouter();
    useEffect(() => {
        router.push(RouterObject.route.HOME);
    }, [router]);
    return _jsx("div", { className: "index-page" });
}
