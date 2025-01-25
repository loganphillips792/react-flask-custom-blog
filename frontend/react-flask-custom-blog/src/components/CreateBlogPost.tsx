import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { Button, TextInput, Textarea, Title } from "@mantine/core";


import { config } from "../constants";

import styles from "../create-blog-post.module.css";

// Helper function to create a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const url = config.url.BASE_URL;

function CreateBlogPost() {
    const [title, setTitle] = useState("");
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
            <Title order={2} className={styles.heading}>
        Create New Post
      </Title>

      <form onSubmit={handleSubmit} className={styles.form}>
        <TextInput
          label="Title"
          placeholder="Enter a title"
          required
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />

        <Textarea
          label="Content"
          placeholder="Enter your content here"
          required
          minRows={8}
          value={content}
          onChange={(event) => setContent(event.currentTarget.value)}
        />

        <Button type="submit" fullWidth color="blue">
          Publish Post
        </Button>
      </form>
            <h2>Preview:</h2>
            <ReactMarkdown>{content}</ReactMarkdown>
            {isSubmitting ? <span className={styles.loader}></span> : null}
            {isSubmitting ? <div className={styles.overlay}></div> : null}
        </div>
    );
}

export default CreateBlogPost;
