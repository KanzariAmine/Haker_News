import React, { useState, useCallback } from "react";
import { setToken } from "../token";
import gql from "graphql-tag";
import { useMutation } from "urql";

const SIGNUP_MUTATION = gql`
  mutation SingupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
function Login(props) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [state, executeMutation] = useMutation(
    isLogin ? LOGIN_MUTATION : SIGNUP_MUTATION
  );

  const mutate = useCallback(() => {
    executeMutation({ email, password, name }).then(({ data }) => {
      const token = data && data[isLogin ? "login" : "signup"].token;
      if (token) {
        setToken(token);
        props.history.push("/");
      }
    });
  }, [executeMutation, props.history, isLogin, email, password, name]);

  return (
    <div>
      <h4 className="mv3">{isLogin ? "Login" : "Sign Up"}</h4>

      <div className="flex flex-column">
        {!isLogin && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>

      <div className="flex mt3">
        <button
          type="button"
          className="pointer mr2 button"
          disabled={state.fetching}
          onClick={mutate}
        >
          {isLogin ? "login" : "create account"}
        </button>
        <button
          type="button"
          className="pointer button"
          disabled={state.fetching}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "need to create an account?" : "already have an account?"}
        </button>
      </div>
    </div>
  );
}
export default Login;
