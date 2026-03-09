import {Routes, Route} from "react-router";
import CategoryPage from "@/features/categories/pages/CategoryPage.jsx";
import Sidebar from "@/components/layout/Sidebar.jsx";


function App() {

    return (
        <div className="flex min-h-screen">
            <Sidebar className="hidden md:block w-64 border-r"/>
            <div className="flex-1 overflow-auto">
                <Routes>
                    <Route path="/categories" element={<CategoryPage/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App
