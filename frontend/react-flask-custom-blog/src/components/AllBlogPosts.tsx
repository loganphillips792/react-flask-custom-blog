import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../all-blog-posts.module.css";

import { config } from "../constants";
import { ArticleCard } from "./ArticleCard";
const url = config.url.BASE_URL;

function AllBlogPosts() {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        fetch(`${url}/all-blog-posts`)
            .then((response) => response.json())
            .then((data) => {
                console.log("data from api", data);
                setBlogPosts(data);
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    if (blogPosts.length === 0) {
        return (
            <div>
                <h2>No posts yet</h2>
                <p>Create your first blog post to get started!</p>
            </div>
        );
    }

    return (
        <div className={style["container"]}>
            <h1 className={style.red}>All Blog Posts !!</h1>
            
            <div className={style["blog-posts-container"]}>
                {blogPosts.map((post: any) => (
                    <ArticleCard id={post.id} title={post.title} content={post.content} />
                ))}
            </div>
        </div>
    );
}

export default AllBlogPosts;
