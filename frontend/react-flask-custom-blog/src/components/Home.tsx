function Home() {
    let role = "admin";
    let user = "user";
    let authenticated = false;
    return (
        <div>
            <h1>Home Page</h1>

            <div>Your role is: {role}</div>
            {/* <span>Welcome, {user?.username}!</span> */}
            <div>is authenticated: {authenticated.toString()}</div>
            <p>This is a protected route - only authenticated users can see this page.</p>
        </div>
    );
}

export default Home;
