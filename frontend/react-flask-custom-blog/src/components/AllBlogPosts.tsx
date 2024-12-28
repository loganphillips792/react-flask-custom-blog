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

    return (
        <div className={style["container"]}>
            <h1 className={style.red}>All Blog Posts</h1>

            <Link to={`/create-blog-post`}>Create new post</Link>
            
            <div className={style["blog-posts-container"]}>
                {blogPosts.map((post: any) => (
                    <ArticleCard id={post.id} title={post.title} content={post.content} />
                ))}
            </div>
        </div>
    );
}

export default AllBlogPosts;
