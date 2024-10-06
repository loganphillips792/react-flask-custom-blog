import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "../all-blog-posts.module.css";

import { config } from "../constants";
const url = config.url.BASE_URL;

function AllBlogPosts() {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        fetch(`${url}/all-blog-posts`)
            .then((response) => response.json())
            .then((data) => {
                console.log("data from api", data);
                setBlogPosts(data)
            })
            .catch((error) => console.error("Error:", error));

    }, []);

    return (
        <div className={style['blog-posts-container']}>
            <h1 className={style.red}>All Blog Posts</h1>

            <Link to={`/add-blog-post`}>Create new post</Link>
            
            {blogPosts.map((post: any) => (
                <div className={style['blog-post-container']}>
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                
                    <span>Published: {post.created_at}</span>
                    <span>Updated at: {post.created_at}</span>
                </div>

                

                // <li key={post.id}>
                //     <Link to={`/blog/${post.id}`}>{post.title}</Link>
                // </li>
            ))}
        </div>
    );
}

export default AllBlogPosts;
