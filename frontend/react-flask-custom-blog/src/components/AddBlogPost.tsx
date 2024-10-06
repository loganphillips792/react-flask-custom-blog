import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

import { config } from "../constants";
const url = config.url.BASE_URL;

function AddBlogPost() {
    const [content, setContent] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        
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
        navigate(`/blog/${id}`)
      } else {
        alert("Failed to save blog post");
      }

      
        // try {
        //     const response = await fetch(`${url}/save-blog-post`, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ content }),
        //     });
        //     if (response.ok) {
        //         alert("Blog post saved successfully!");
        //         setContent("");
        //         console.log(response.body);
        //         // return redirect(`/blog/post/${response.body!.id}`)
        //     } else {
        //         alert("Failed to save blog post");
        //     }
        // } catch (error) {
        //     console.error("Error:", error);
        //     alert("An error occurred while saving the blog post");
        // }
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
        </div>
    );
}

export default AddBlogPost;
