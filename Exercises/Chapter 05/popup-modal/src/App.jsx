import { useState } from 'react'
import Modal from "./components/Modal.jsx";
function App() {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="app-container">
            <h1>Bài tập Chương 5: Popup Modal</h1>
            {/* Nút mở Modal */}
            <button onClick={() => setShowModal(true)}>
                Mở Modal
            </button>
            {/* Nội dung dài để test chức năng khóa cuộn */}
            <p>Cuộn xuống để xem thanh cuộn có bị khóa không...</p>
            <p>
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis delectus dolorum, fugiat hic inventore ipsam iusto maxime nam, necessitatibus pariatur quae quam qui quos recusandae reiciendis repellat temporibus tenetur?</span><span>Alias delectus deleniti ea illo rem, voluptas. Consectetur debitis deserunt dicta eveniet laborum nobis quia tempora. Alias aut dolore ea, magnam maiores officiis repudiandae unde voluptatum! Ab at illo ipsam?</span><span>Dolor et exercitationem ipsam laborum mollitia natus omnis quia quo sint voluptatem. Commodi expedita laudantium modi reiciendis? A aspernatur commodi cupiditate error eum, nihil odit praesentium quam quod rem, ut.</span><span>Ad alias aliquid asperiores at corporis deleniti dignissimos dolorem earum illum maiores, minus neque nostrum nulla porro provident quas qui quis quo reiciendis repellat sed sequi tenetur vero. In, labore.</span><span>Dolores est facilis laboriosam perferendis quis ullam voluptatem voluptatum. Assumenda distinctio ducimus earum error et facere fugiat, itaque minima mollitia nulla optio possimus quam quia sint sit vitae, voluptatum! Aperiam.</span><span>Cumque deleniti dolorem excepturi hic, impedit repellat sit voluptatibus. Animi aperiam aspernatur, debitis ducimus earum, est iste laborum libero magnam nam nemo non odit officia quos rem sint, tempore totam.</span><span>Accusamus accusantium animi, aperiam asperiores aspernatur cupiditate deserunt dicta doloremque eaque eveniet fugiat ipsam itaque laboriosam magnam nam non nostrum optio, porro quaerat quam quasi quisquam, repellat sapiente sint tenetur.</span><span>Assumenda consequuntur dolores doloribus minima nam neque omnis possimus quod tempora voluptas. Accusamus autem debitis esse officia rerum. Assumenda blanditiis consequatur fugiat fugit illum impedit inventore laudantium non quibusdam repellendus.</span><span>Aperiam eligendi facere id ipsum iusto magni molestias possimus tempore temporibus voluptate! Ad amet consectetur error facilis nobis nulla officiis optio, sint sunt? Culpa cumque magni modi perferendis praesentium veritatis.</span><span>Accusamus accusantium ad eligendi illo, incidunt itaque laborum laudantium praesentium repellendus sint tempore ut veniam! Accusantium cumque dicta dolore doloribus eos, exercitationem magni, modi molestias, quaerat quia quod quos temporibus!</span>
            </p>
            <div style={{ height: '150vh' }}></div>

            {/* Conditional Rendering: Modal chỉ xuất hiện khi showModal là true */}
            {showModal && (
                <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    title="Thông báo quan trọng"
                >
                    <p>Xin chào! Đây là nội dung bên trong Modal.</p>
                    <p>Click bên ngoài modal để đóng modal!</p>
                </Modal>
            )}
        </div>
    );
}
export default App
