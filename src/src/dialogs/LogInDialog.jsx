import { useState } from "react";
import useInput from "../hooks/useInput";
import useSessionsAPI from "../api/useSessionsAPI";
import "./session-dialogs.css";

function LogInDialog({
  logInDialog,
  signUpDialog,
  errorMessage,
  setErrorMessage,
}) {
  // State for input values and errors
  const userEmail = useInput("email", "email");
  const userPass = useInput("password", "password");
  const [rememberMe, setRememberMe] = useState(false);
  const { createSession } = useSessionsAPI();

  // Handle login validation
  async function handleLoginValidation() {
    if (!userEmail.value) {
      setErrorMessage("Email can't be blank.");
    } else if (!userPass.value) {
      setErrorMessage("Password can't be blank.");
    } else {
      const userInfo = {
        email: userEmail.value,
        password: userPass.value,
        remember_me: rememberMe,
      };
      await createSession(userInfo);
    }
  }

  // Initiate sign-up process
  function handleSignUpInitiation() {
    setErrorMessage(null);
    logInDialog.close();
    signUpDialog.show();
  }

  const handleSignInWithGoogle = () => {
    // fetch("/users/auth/google_oauth2", getHeader("POST"))
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  return (
    <>
      <dialog className="session-dialog" ref={logInDialog.ref}>
        <div className="login-dialog flex-column justify-center align-center box-shadow">
          <h2>Seedmart Log In</h2>
          {errorMessage}
          {userEmail.input}
          {userPass.input}
          <div className="rememberable flex-row justify-between">
            <label>
              <input
                type="checkbox"
                onChange={(e) => setRememberMe(e.target.checked)}
                checked={rememberMe}
              />{" "}
              Remember me
            </label>
            <a>Forgot password?</a>
          </div>
          <button onClick={handleLoginValidation}>Log in</button>
          <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
          <div>
            <p>
              Don't have an account?
              <a onClick={handleSignUpInitiation}> Register</a>
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default LogInDialog;
