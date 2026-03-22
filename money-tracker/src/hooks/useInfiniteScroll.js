import {useCallback, useEffect, useRef, useState} from "react";

export const useInfiniteScroll = (items, itemsPerPage = 6) => {
    // quyết định xem danh sách sẽ hiện bao nhiêu phần tử, ban đầu = itemsPerPage (6)
    const [visibleCount, setVisibleCount] = useState(itemsPerPage);
    // dùng useRef để tạo một nơi lưu trữ IntersectionObserver (không dùng useState vì khi observerRef thay đổi, ta không muốn UI phải render lại)
    const observerRef = useRef(null);

    // useEffect sẽ phát hiện nếu items bị thay đổi (lọc/ tìm kiếm/ ...) thì sẽ reset visibleCount về lại ban đầu (itemsPerPage = 6) -> không có phần này thì nếu trường hợp: Đang xem đến item thứ 50, sau đó gõ tìm kiếm (kết quả chỉ có 5 items), khi đó ứng dụng sẽ cố gắng hiển thị item thứ 50 của 1 danh sách chỉ có 5 items -> lỗi
    useEffect(() => {
        setVisibleCount(itemsPerPage);
    }, [items]);

    // hàm callback chạy mỗi kho thẻ "mỏ neo" (loader) xuất hiện trong tầm nhìn
    const handleObserver = useCallback((entries) => {
        // IntersectionObserver trả về 1 mảng entries (mỗi entry là 1 element đang được theo dõi)
        // ở đây chỉ theo dõi 1 element (thẻ loader cuối danh sách) nên lấy entries[0]
        const target = entries[0];

        // target.isIntersecting trả về true khi thẻ loader đang xuất hiện trong tầm nhìn của người dùng
        if (target.isIntersecting) {
            // Tăng số lượng hiển thị thêm itemsPerPage (6) nhưng không được vượt quá tổng số items (tránh render index không tồn tại)
            setVisibleCount((prev) =>
                Math.min(prev + itemsPerPage, items.length)
            );
        }
    }, [items.length, itemsPerPage]);   // giúp hàm không bị tạo lại mỗi lần re-render trừ khi 2 giá trị này thay đổi

    // Kỹ thuật "Callback Ref": Khi React gắn (mount) thẻ div có thuộc tính 'ref={loadMoreRef}' lên màn hình, nó sẽ tự động chạy hàm này và truyền chính thẻ HTML đó vào biến node
    // Bất cứ khi nào "mỏ neo" xuất hiện/biến mất, React đều tự động thiết lập và dọn dẹp (disconnect) observer, giúp tran web không bao giờ bị rò rỉ bộ nhớ
    const loadMoreRef = useCallback(node => {
        // ngắt kết nối observer cũ trước khi tạo mới
        // nếu không, mỗi lần handleObserver thay đổi thì sẽ tạo thêm 1 observer mới chồng lên observer cũ -> bị gọi nhiều lần
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(handleObserver, {
            root: null, // dùng của sổ của trình duyệt làm gốc để quan sát
            rootMargin: "20px", // Thay vì đợi thẻ lọt vào màn hình mới báo -> báo trước 20px để nó tải dữ liệu kịp lúc, user cuộn xuống không bị khựng
            threshold: 0.8 // 50% thẻ mỏ neo phải lọt vào vùng nhìn thấy thì mới báo
        });

        // bắt đầu quan sát thẻ DOM (node), chỉ theo dõi node khi thực sự tồn tại trong DOM (tránh lỗi khi component unmount)
        if (node) observerRef.current.observe(node);
    }, [handleObserver]);

    // mảng chứa items được hiển thị
    const visibleItems = items.slice(0, visibleCount);
    // dùng để quyết định có render thẻ loader hay ko (không false (đã render hết) -> thẻ loader biến mất -> observer không có gì để theo dõi -> infinite scroll tự động dừng lại
    const hasMore = visibleCount < items.length;

    return { visibleItems, hasMore, loadMoreRef };

}