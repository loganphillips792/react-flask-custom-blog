import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "../example.module.css";

function AllBlogPosts() {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        fetch("/api/all-blog-posts")
            .then((response) => response.json())
            .then((data) => setBlogPosts(data))
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <div>
            <h1 className={classes.red}>All Blog Posts</h1>
            <ul>
                {blogPosts.map((post: any) => (
                    <li key={post.id}>
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AllBlogPosts;
