'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import styles from './register.module.css';
import ForgotPasswordForm from '../components/ForgetPassword'; // Adjusted path

const LoginForm = ({ setShowLogin }) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    console.log('signIn result:', result); // Debug log

    if (result?.error) {
      setError('Invalid email or password');
    }
  };

  // Redirect on successful login
  useEffect(() => {
    if (status === 'authenticated') {
      window.location.href = '/Careers/Apply';
    }
  }, [status]);

  return (
    <section className={styles.section}>
      <div className={styles.wave}></div>
      {showForgotPassword ? (
        <ForgotPasswordForm setShowForgotPassword={setShowForgotPassword} />
      ) : (
        <>
          <header className={styles.header}>
            <h3 className={styles.title}>Login</h3>
            <h4 className={styles.subtitle}>Welcome</h4>
          </header>
          <main className={styles.main}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.boxItem}>
                <label className={styles.label}>Email Address</label>
                <input
                  type="email"
                  className={styles.input}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.boxItem}>
                <label className={styles.label}>Password</label>
                <input
                  type="password"
                  className={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.submit}>Login</button>
              <div className={styles.loginOption}>
                <button
                  type="button"
                  className={styles.loginLink}
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </button>
              </div>
              <div className={styles.loginOption}>
                Don’t have an account?
                <button
                  type="button"
                  className={styles.loginLink}
                  onClick={() => setShowLogin(false)}
                >
                  Register
                </button>
              </div>
            </form>
          </main>
        </>
      )}
    </section>
  );
};

export default LoginForm;