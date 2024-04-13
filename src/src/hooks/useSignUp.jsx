import useCookiesAndHeaders from "./useCookiesAndHeaders";

export default function useSignUp(email, password, name, handleSignUpSuccess) {
  const { getHeader } = useCookiesAndHeaders();

  fetch(
    "/users",
    getHeader("POST", {
      user: {
        email: email,
        password: password,
        name: name,
      },
    })
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    })
    .then(() => {
      handleSignUpSuccess();
    })
    .catch((error) => {
      console.error("Error during login:", error);
      setError("Sign up failed. Please check your credentials and try again.");
    });
}
