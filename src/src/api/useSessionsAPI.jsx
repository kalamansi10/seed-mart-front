import useCookiesAndHeaders from "../hooks/useCookiesAndHeaders";

export default function useSessionsAPI() {
  const { getHeader } = useCookiesAndHeaders();
  async function getUser() {
    const response = await fetch("/users/sign_in");
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.message);
    }
  }

  async function createSession(userInfo) {
    const response = await fetch(
      "/users/sign_in",
      getHeader("POST", {
        user: userInfo,
      })
    );
    if (response.ok) {
      window.location.reload();
    } else {
      throw new Error(response.message);
    }
  }

  async function deleteSession() {
    const response = await fetch(
      "/users/sign_out",
      getHeader("DELETE")
    );
    if (response.ok) {
      window.location.reload();
    } else {
      throw new Error(response.message);
    }
  }

  return {
    getUser,
    createSession,
    deleteSession,
  };
}
