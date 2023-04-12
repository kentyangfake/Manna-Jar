import React, { useRef, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import {
  loginAsync,
  loginViaLocalAsync,
  selectProfile,
} from '../../app/loginSlice';

const Login = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem('id');
    const loginViaLocal = async () => {
      if (id) {
        const parsedId = JSON.parse(id);
        await dispatch(loginViaLocalAsync({ id: parsedId }));
        if (profile.isLogin === false) {
          navigate('/');
        }
      }
    };
    loginViaLocal();
  }, [profile.isLogin]);

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
        type={hidePassword ? 'password' : 'text'}
        placeholder="password"
        name="password"
        id="password"
        ref={passwordRef}
      />
      <span onClick={() => setHidePassword((prev) => !prev)}>
        {hidePassword ? '藏' : '顯'}
      </span>
      <br />
      <button onClick={handleLogin}>login</button>
      <br />
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default Login;
