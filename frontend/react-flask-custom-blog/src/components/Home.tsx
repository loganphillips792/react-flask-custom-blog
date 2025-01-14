import styles from '../home.module.css';
import { Button } from '@mantine/core';
import { Link } from "react-router-dom";


function Home() {
    let role = "admin";
    // let user = "user";
    let authenticated = false;
    return (
        <div>
            <h1>Home Page</h1>

            <div>Your role is: {role}</div>
            {/* <span>Welcome, {user?.username}!</span> */}
            <div>is authenticated: {authenticated.toString()}</div>
            <p>This is a protected route - only authenticated users can see this page.</p>

            <div className={styles.createNewPostButtonContainer}>
                <Link to={`/create-blog-post`}><Button variant="filled">Create New Blog Post</Button></Link>
                <Link to={`/all-blog-posts`}><Button variant="filled">View All Posts</Button></Link>

            </div>
            

            
        
        </div>
    );
}

export default Home;
