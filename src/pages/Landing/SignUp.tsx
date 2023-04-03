import { useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { signUpAsync, selectProfile } from './loginSlice';
import { profileEnd } from 'console';

const SignUp = () => {
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const profile = useAppSelector(selectProfile);
  const navigate = useNavigate();

  useEffect(() => {
    if (profile.isLogin) {
      navigate('/');
    }
  }, [profile.isLogin]);

  const handleSingUp = () => {
    const emailValue = emailRef.current ? emailRef.current.value : '';
    const nameValue = nameRef.current ? nameRef.current.value : '';
    const passwordValue = passwordRef.current ? passwordRef.current.value : '';
    dispatch(
      signUpAsync({
        email: emailValue,
        password: passwordValue,
        name: nameValue,
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
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        placeholder="name"
        name="name"
        id="name"
        ref={nameRef}
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
      <button onClick={handleSingUp}>SingUp</button>
      <br />
      <Link to="/">already have account?</Link>
    </div>
  );
};

export default SignUp;
