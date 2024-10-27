import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddBlogPost from "./components/AddBlogPost";
import AllBlogPosts from "./components/AllBlogPosts";
import BlogPost from "./components/BlogPost";
import NotFound from "./components/NotFound";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Login from "./components/LoginAndRegister";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/add-blog-post" element={<AddBlogPost />} />
                <Route path="/all-blog-posts" element={<AllBlogPosts />} />
                <Route path="/blog/:blogPostId" element={<BlogPost />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/admin" element={<Admin />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
