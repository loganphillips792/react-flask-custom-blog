import { Outlet } from 'react-router-dom';
import { Button } from '@mantine/core';
import { Link } from "react-router-dom";
import styles from '../home.module.css';

function Layout() {
    return (
        <div>
            <nav>
                <div className={styles.createNewPostButtonContainer}>
                    <Link to={`/create-blog-post`}><Button variant="filled">Create New Blog Post</Button></Link>
                    <Link to={`/all-blog-posts`}><Button variant="filled">View All Posts</Button></Link>
                </div>
            </nav>
            {/* Renders the matching child route of a parent route */}
            <Outlet />
        </div>
    );
}

export default Layout;