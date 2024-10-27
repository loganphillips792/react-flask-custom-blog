function Home() {
    let role = "admin";
    let user = "user";
    return (
        <div>
            <h1>Home Page</h1>

            <span>User role is: {role}</span>
            {/* <span>Welcome, {user?.username}!</span> */}
            <p>This is a protected route - only authenticated users can see this page.</p>


        </div>
    );
}

export default Home;