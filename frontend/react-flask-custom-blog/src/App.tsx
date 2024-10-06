import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddBlogPost from "./components/AddBlogPost";
import AllBlogPosts from "./components/AllBlogPosts";
import BlogPost from "./components/BlogPost";
import NotFound from "./components/NotFound";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/add-blog-post" element={<AddBlogPost />} />
                <Route path="/all-blog-posts" element={<AllBlogPosts />} />
                <Route path="/blog/:blogPostId" element={<BlogPost />} />
                <Route path="/" element={<AllBlogPosts />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
