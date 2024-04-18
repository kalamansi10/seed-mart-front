import { useState } from "react";
import useInput from "../hooks/useInput";
import useRegistrationsAPI from "../api/useRegistrationsAPI";
import "./session-dialogs.css";

export default function SignUpDialog({ logInDialog, signUpDialog }) {
  const { createUser } = useRegistrationsAPI();
  // State for input values and errors
  const userEmail = useInput("email", "email");
  const userName = useInput("text", "full name");
  const userPass = useInput("password", "password");
  const confirmPass = useInput("password", "confirm password");
  const [error, setError] = useState(null);

  // Handle sign-up validation
  async function handleSignUpValidation() {
    if (
      !userEmail.value ||
      !userName.value ||
      !userPass.value ||
      !confirmPass.value
    ) {
      setError("Please fill in all fields.");
    } else if (userPass.value !== confirmPass.value) {
      setError("Password inputs don't match.");
    } else {
      const userInfo = {
        email: userEmail.value,
        name: userName.value,
        password: userPass.value,
      };
      setError(null);
      await createUser(userInfo);
      backToLogIn();
    }
  }

  // Navigate back to login
  function backToLogIn() {
    signUpDialog.close();
    logInDialog.show();
  }

  return (
    <>
      <dialog className="session-dialog" ref={signUpDialog.ref}>
        <div className="signup-dialog box-shadow">
          <h2>Seedmart Sign Up</h2>
          <div className="error-message">{error}</div>
          {userEmail.input}
          {userName.input}
          {userPass.input}
          {confirmPass.input}
          <div className="captcha">Captcha Placeholder</div>
          <p>
            By signing up, you agree with Seedmart's
            <br />
            <a href="/terms-of-service">Terms of Service</a> and{" "}
            <a href="/privacy-policy">Privacy Policy</a>.
          </p>
          <button onClick={handleSignUpValidation}>Sign up</button>
          <section className="login-link">
            <a onClick={backToLogIn}>Back to Log in</a>
          </section>
        </div>
      </dialog>
    </>
  );
}
