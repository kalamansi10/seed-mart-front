import useCookiesAndHeaders from "./useCookiesAndHeaders";

export default function useSession() {
  const { getHeader } = useCookiesAndHeaders();

  function logIn(email, password, setError) {
    fetch(
      "/users/sign_in",
      getHeader("POST", {
        user: {
          email: email,
          password: password,
          remember_me:
            document.getElementById("remember-me").checked === true ? "1" : "0",
        },
      })
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .then(() => {
        setError(null);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setError("Login failed. Please check your credentials and try again.");
      });
  }

  function logOut() {
    fetch("http://localhost:3000/users/sign_out", getHeader("DELETE")).then(
      () => window.location.reload()
    );
  }

  return { logIn, logOut}
}
