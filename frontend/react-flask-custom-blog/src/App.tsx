import { createTheme, MantineProvider } from "@mantine/core";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import CreateBlogPost from "./components/CreateBlogPost";
import Admin from "./components/Admin";
import AllBlogPosts from "./components/AllBlogPosts";
import BlogPost from "./components/BlogPost";
import Home from "./components/Home";
import Login from "./components/LoginAndRegister";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const theme = createTheme({
    /** Put your mantine theme override here */
});

function App() {
    return (
        <MantineProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/create-blog-post" element={<CreateBlogPost />} />
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
        </MantineProvider>
    );
}

export default App;
