import React, { useState } from "react";
import styled from "styled-components";
import nextflixLogo from "../../assets/netflix-logo2.png";
import nextflixbg from "../../assets/netflixbg.png";
import SignInScreen from "../SignInScreen/SignInScreen";
function Login() {
  const [signIn, setSignIn] = useState(false);
  return (
    <Container Bgurl={nextflixbg}>
      <LoginScreenBg>
        <img className="logo" src={nextflixLogo} alt="" />
        <button onClick={() => setSignIn(true)}>Sign In</button>
        <LoginGrandient />
      </LoginScreenBg>
      <LoginBody>
        {signIn ? (
          <SignInScreen />
        ) : (
          <>
            <h1>Unlimited films, TV programs and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <InputBox>
              <form>
                <input type="email" placeholder="Email Address" />
                <button onClick={() => setSignIn(true)}>GET STARTED</button>
              </form>
            </InputBox>
          </>
        )}
      </LoginBody>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  position: relative;
  height: 100%;
  background: url(${(props) => props.Bgurl}) center no-repeat;
  background-size: cover;
`;
const LoginScreenBg = styled.div`
  .logo {
    position: fixed;
    left: 0;
    width: 150px;
    object-fit: contain;
    padding-left: 20px;
  }
  button {
    position: fixed;
    right: 20px;
    top: 20px;
    padding: 10px 20px;
    background-color: #e50914;
    font-weight: 600;
    border: none;
    cursor: pointer;
  }
`;
const LoginGrandient = styled.div`
  width: 100%;
  z-index: 1;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0,
    rgba(0, 0, 0, 0) 60%,
    rgba(0, 0, 0, 0.8) 100%
  );
`;
const LoginBody = styled.div`
  z-index: 1;
  padding: 20px;
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;

  h1 {
    font-size: 3.125rem;
    margin-bottom: 20px;
  }
  h2 {
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 30px;
  }
  h3 {
    font-size: 1.3rem;
    font-weight: 400;
  }
  input {
  }
`;
const InputBox = styled.div`
  margin: 20px;
  form > input {
    padding: 10px;
    outline-width: 0;
    height: 30px;
    width: 30%;
    border: none;
    max-width: 600;
  }
  button {
    padding: 16.8px 20px;
    font-size: 1rem;
    background-color: #e50914;
    border: none;
    font-weight: 600;
    cursor: pointer;
    outline-width: 0;
  }
`;
