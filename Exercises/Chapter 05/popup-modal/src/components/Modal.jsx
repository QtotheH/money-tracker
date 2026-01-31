import useLockBodyScroll from '../hooks/useLockBodyScroll.js'
import {useEffect, useRef} from "react";
const Modal = ({ isOpen, onClose, title, children }) => {
    // Gọi custom hook useLockBodyScroll để khóa cuộn ngay khi component Modal được render
    useLockBodyScroll();
    // Tạo ref để tham chiếu đến thẻ <div> chứa modal
    const modalRef = useRef(null);
    // Dùng useEffect để xử lý sự kiện người dùng nhấn ra ngoài modal
    useEffect(() => {
        console.log("useEffect của Modal đang chạy nè!")
        const handleClickOutside = (e) => {
            // Nếu modalRef đã được gán và vị trí click không nằm trong modal
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                // Gọi hàm onClose để đóng Modal
                onClose(); // Gọi hàm onClose để đóng Modal
            }
        }
        // Lắng nghe sự kiện mousedown trên toàn bộ document
        document.addEventListener('mousedown', handleClickOutside);
        //Gỡ bỏ lắng nghe sự kiện khi component bị unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [onClose]);
    return (
        isOpen &&
        <div className="modal-overlay">
            {/* Gán ref vào phần tử DOM cụ thể */}
            <div ref={modalRef} className="modal">
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button onClick={onClose} className="close-btn">X</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
)
}
export default Modal;
