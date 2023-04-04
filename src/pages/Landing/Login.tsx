import { useRef } from 'react';
import { useAppDispatch } from '../../app/hooks';
// import { } from './loginSlice';
import { Link } from 'react-router-dom';
import { loginAsync } from './loginSlice';

const Login = () => {
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleLogin = () => {
    const emailValue = emailRef.current ? emailRef.current.value : '';
    const passwordValue = passwordRef.current ? passwordRef.current.value : '';
    dispatch(
      loginAsync({
        email: emailValue,
        password: passwordValue,
      })
    );
  };

  return (
    <div>
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        placeholder="email"
        name="email"
        id="email"
        ref={emailRef}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="text"
        placeholder="password"
        name="password"
        id="password"
        ref={passwordRef}
      />
      <br />
      <button onClick={handleLogin}>login</button>
      <br />
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default Login;
