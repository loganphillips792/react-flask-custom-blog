import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { Textarea } from '@mantine/core';


import { config } from "../constants";

import style from "../create-blog-post.module.css";

// Helper function to create a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const url = config.url.BASE_URL;

function CreateBlogPost() {
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
                setContent("");
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
                {/* <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} cols={50} /> */}
                <Textarea
                    label="Input label"
                    description="Input description"
                    placeholder="Input placeholder"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
    />
                <button type="submit">Save</button>
            </form>
            <h2>Preview:</h2>
            <ReactMarkdown>{content}</ReactMarkdown>
            {isSubmitting ? <span className={style.loader}></span> : null}
            {isSubmitting ? <div className={style.overlay}></div> : null}
        </div>
    );
}

export default CreateBlogPost;
