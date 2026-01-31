import {useEffect} from "react";
const useLockBodyScroll = () => {
    useEffect(() => {
        // Lưu lại style overflow gốc của thẻ <body>
        const originalStyle = window.getComputedStyle(document.body).overflow;
        // Khóa cuộn
        document.body.style.overflow = 'hidden';

        // Cleanup function: trả lại style gốc khi component bị unmount
        return () => {
            document.body.style.overflow = originalStyle;
        }
    }, []); // Dependency array rỗng: Chỉ chạy 1 lần khi được mount
}
export default useLockBodyScroll;