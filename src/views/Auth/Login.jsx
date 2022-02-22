import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import styles from './Login.css';

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();
  const { formState, handleFormChange } = useForm({ email: '', password: '' });
  const [error, setError] = useState(null);

  const { from } = location.state || { from: { pathname: '/' } };

  const handleLogin = (event) => {
    event.preventDefault();
    const loginWasSuccessful = auth.login(formState.email, formState.password);

    !loginWasSuccessful
      ? setError(
          'Login was unsuccessful, please check you user name and password and try again'
        )
      : history.replace(from);
  };

  return (
    <>
      <h3>You must log in to view the page at {from.pathname}</h3>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <label>
          Email
          <input
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleFormChange}
          />
        </label>
        <label>
          Password
          <input
            id="password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleFormChange}
          />
        </label>
        <button type="submit" aria-label="Sign In">
          Sign in
        </button>
      </form>
      {error && <h4 className={styles.error}>{error}</h4>}
    </>
  );
}
