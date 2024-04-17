import useCookiesAndHeaders from "./useCookiesAndHeaders";

export default function useUserAccount() {
  const { getHeader } = useCookiesAndHeaders();

  function signUp(email, password, name, handleSignUpSuccess) {
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
        console.error("Error during signup:", error);
        setError(
          "Sign up failed. Please check your credentials and try again."
        );
      });
  }

  function update(updatedInfo) {
    fetch(
      "/users",
      getHeader("PUT", {
        user: updatedInfo,
      })
    ).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    })
    .catch((error) => {
      console.error("Error during update:", error);
    });
  }

  return { signUp, update };
}
