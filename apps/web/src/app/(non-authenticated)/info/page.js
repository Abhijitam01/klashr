'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { Api } from "../../../domain";
export default function InfoPage() {
    const router = useRouter();
    const onFinish = async (values) => {
        try {
            await Api.PostData.updateOne('postDataId', values);
            router.push('/next-page'); // Replace with the actual path of the next page
        }
        catch (error) {
            console.error('Failed to update post data:', error);
        }
    };
    return (_jsxs(Form, { name: "user_info", onFinish: onFinish, layout: "vertical", children: [_jsx(Form.Item, { label: "Username", name: "username", rules: [{ required: true, message: 'Please input your username!' }], children: _jsx(Input, {}) }), _jsx(Form.Item, { label: "Age", name: "age", rules: [{ required: true, message: 'Please input your age!' }], children: _jsx(Input, { type: "number" }) }), _jsx(Form.Item, { label: "Hobbies", name: "hobbies", rules: [{ required: true, message: 'Please input your hobbies!' }], children: _jsx(Input, {}) }), _jsx(Form.Item, { label: "What they love to do", name: "loveToDo", rules: [{ required: true, message: 'Please input what you love to do!' }], children: _jsx(Input, {}) }), _jsx(Form.Item, { label: "Profession", name: "profession", rules: [{ required: true, message: 'Please input your profession!' }], children: _jsx(Input, {}) }), _jsx(Form.Item, { label: "Favorite Food", name: "favoriteFood", rules: [{ required: true, message: 'Please input your favorite food!' }], children: _jsx(Input, {}) }), _jsx(Form.Item, { label: "Preferred Travel Destinations", name: "travelDestinations", rules: [{ required: true, message: 'Please input your preferred travel destinations!' }], children: _jsx(Input, {}) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", children: "Submit" }) })] }));
}
