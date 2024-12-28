import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../constants";
import { useAuth } from "./AuthContext";
import styles from '../login.module.css';

const url = config.url.BASE_URL;

export default function LoginAndRegister() {
    return (
        <div>
            <Login />
            {/* <Register /> */}
        </div>
    );
}

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>("");
    const [errors, setErrors] = useState({});

    const { login } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        
        // Email validation
        if (!email) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = 'Email is invalid';
        }
    
        // Password validation
        if (!password) {
          newErrors.password = 'Password is required';
        } else if (password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError("");

        const result = await login(email, password);

        if (result.success) {
            navigate("/");
        } else {
            setError(result.error);
        }
    };

    return (
        <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.headerContainer}>
          <h2 className={styles.title}>
            Sign in to your account
          </h2>
        </div>
        <form 
          className={styles.form} 
          onSubmit={handleSubmit}
        >
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <label htmlFor="email" className={styles.srOnly}>Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="Email address"
              />
              {errors.email && (
                <p className={styles.errorMessage}>{errors.email}</p>
              )}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="password" className={styles.srOnly}>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                placeholder="Password"
              />
              {errors.password && (
                <p className={styles.errorMessage}>{errors.password}</p>
              )}
            </div>
          </div>

          <div className={styles.optionsContainer}>
            <div className={styles.rememberMe}>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className={styles.checkbox}
              />
              <label htmlFor="remember-me" className={styles.rememberLabel}>
                Remember me
              </label>
            </div>

            <div className={styles.forgotPassword}>
              <a 
                href="#" 
                className={styles.link}
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`${styles.submitButton} ${loading ? styles.buttonLoading : ''}`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className={styles.signupContainer}>
          <p className={styles.signupText}>
            Don't have an account?{' '}
            <a 
              href="#" 
              className={styles.link}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
    // )

    // return (
    //     <div>
    //         <h2>Login</h2>
    //         {error && <div>{error}</div>}
    //         <form onSubmit={handleSubmit}>
    //             <div>
    //                 <label>Username:</label>
    //                 <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
    //             </div>
    //             <div>
    //                 <label>Password:</label>
    //                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    //             </div>
    //             <button type="submit">Login</button>
    //         </form>
    //     </div>
    // );
// }

// function Register() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = async (e: any) => {
//         e.preventDefault();
//         setError("");

//         const response = await fetch(`${url}/register`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             // credentials: "include",
//             body: JSON.stringify({ username, password }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             navigate("/all-blog-posts");
//         } else {
//             setError(data.error);
//         }
//     };

//     return (
//         <div>
//             <h2>Register</h2>
//             {error && <div>{error}</div>}
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Username:</label>
//                     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 </div>
//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// }
