import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router";
import {Provider} from "react-redux";
import {store} from "@/store/index.js";
import {fetchCategories} from "@/store/slices/categorySlice.js";

// muốn ứng dụng load danh sách categories ngay
store.dispatch(fetchCategories());

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
)
