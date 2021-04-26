import React, { useRef } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { auth, provider } from "../../firebase";

function SignInScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const history = useHistory();

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(history.push("/profile"));
  };
  const signInwithGoogle = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .catch((err) => alert(err.message))
      .finally(history.push("/profile"));
  };
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((err) => alert(err.message))
      .finally(history.push("/profile"));
  };
  return (
    <Container>
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <button type="submit" onClick={signInwithGoogle}>
          Sign In with Google
        </button>
        <h4>
          <span className="gray">New to Netflix? </span>
          <span className="link" onClick={register}>
            Sign up Now.
          </span>
        </h4>
      </form>
    </Container>
  );
}

export default SignInScreen;

const Container = styled.div`
  max-width: 300px;
  padding: 70px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.85);
  h1 {
    text-align: left;
    margin-bottom: 25px;
  }
  form {
    display: grid;
    flex-direction: column;
  }
  input {
    color: #111;
    outline-width: 0;
    height: 40px;
    margin-bottom: 14px;
    border: none;
    padding: 5px 15px;
    border-radius: 5px;
  }
  button {
    padding: 16px 20px;
    font-size: 1rem;
    border-radius: 5px;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    margin-top: 20px;
  }
  h4 {
    text-align: left;
    margin-top: 30px;
    .gray {
      color: gray;
    }
    .link:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;
