import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { config } from "../constants";
import style from "../markdown-styles.module.css";

const url = config.url.BASE_URL;

interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
}

function BlogPost() {
    const [post, setPost] = useState<Post>();
    const { blogPostId } = useParams();

    // const blogPostName = 1;

    useEffect(() => {
        fetch(`${url}/blog/${blogPostId}`)
            .then((response) => response.json())
            .then((data) => setPost(data))
            .catch((error) => console.error("Error:", error));
    }, [blogPostId]);

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h1>{post.title}</h1>

            <ReactMarkdown className={style.reactMarkDown}>{post.content}</ReactMarkdown>
        </div>
    );
}

export default BlogPost;
