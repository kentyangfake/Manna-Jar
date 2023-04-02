import { useRef } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setLogin } from './loginSlice';

const Login = () => {
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const handleLogin = () => {
    const nameValue = nameRef.current ? nameRef.current.value : '';
    const emailValue = emailRef.current ? emailRef.current.value : '';
    dispatch(
      setLogin({
        name: nameValue,
        email: emailValue,
      })
    );
  };
  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        placeholder="name"
        name="name"
        id="name"
        ref={nameRef}
      />
      <br />
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        placeholder="email"
        name="email"
        id="email"
        ref={emailRef}
      />
      <br />
      <button onClick={handleLogin}>login</button>
    </div>
  );
};

export default Login;
