import { useRef, useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { loginAsync, loginViaLocalAsync } from './loginSlice';

const Login = () => {
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    //TODO:login with local
  }, []);

  const token = `eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg3YzFlN2Y4MDAzNGJiYzgxYjhmMmRiODM3OTIxZjRiZDI4N2YxZGYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWFubmEtamFyIiwiYXVkIjoibWFubmEtamFyIiwiYXV0aF90aW1lIjoxNjgwNTgwNjg3LCJ1c2VyX2lkIjoiNm82WEtzODVjQ01GR1Nvd1JJd3VWbk1Hc2hyMiIsInN1YiI6IjZvNlhLczg1Y0NNRkdTb3dSSXd1Vm5NR3NocjIiLCJpYXQiOjE2ODA1ODA2ODcsImV4cCI6MTY4MDU4NDI4NywiZW1haWwiOiJ5dXV5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ5dXV5QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.CDcQWpGK9H2lKPzktrO-bjQnYjETMO7iXYULLIwm_aBBJj-TpkxL-QXBXrbyqPlcLTXd1X4zcDyAI4ghCvKbtEdvQGyyTlV9UMHzTKSCvIO3pmvwqovkRIXyEPwfnFikyWk9V2h7jemub95wUlTm8Cfqq49dvL9TaA6Ha1Ga-VTFY_peyuA83xG1qvQLk2xyiawdmKxoPw_8t2f-HkOiuKo8cVtUwUcSWjNyPRL-4kFxq14zP026xYG75yAUpHRSHlc7Y10jAjrPyR1Jacd9nAQX35sG836_D6b75HVsz-H1iCNnBYg3IzOR-Ib0Vo77dbj3GArNSktkwdLptltDrg`;

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

  const handleLocalLogin = () => {
    dispatch(loginViaLocalAsync({ token: token }));
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
      <button onClick={handleLocalLogin}>login via local</button>
      <br />
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default Login;
