import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

import { config } from "../constants";

import style from "../create-blog-post.module.css";

// Helper function to create a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const url = config.url.BASE_URL;

function AddBlogPost() {
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();

        setIsSubmitting(true);
        await delay(5000);

        try {
            const response = await fetch(`${url}/save-blog-post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content }),
            });

            const { id } = await response.json();

            if (response.ok) {
                alert("Blog post saved successfully!");
                setContent("");
                // console.log(data);
                console.log(id);
                navigate(`/blog/${id}`);
            } else {
                alert("Failed to save blog post");
            }
        } catch (error) {
            alert("An error occurred while saving");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h1>Add Blog Post</h1>
            <form onSubmit={handleSubmit}>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} cols={50} />
                <button type="submit">Save</button>
            </form>
            <h2>Preview:</h2>
            <ReactMarkdown>{content}</ReactMarkdown>
            {isSubmitting ? <span className={style.loader}></span> : null}
            {isSubmitting ? <div className={style.overlay}></div> : null}
        </div>
    );
}

export default AddBlogPost;
