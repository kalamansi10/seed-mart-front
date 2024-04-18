import useCookiesAndHeaders from "../hooks/useCookiesAndHeaders";

export default function useRegistrationAPI() {
  const { getHeader } = useCookiesAndHeaders();
  async function createUser(userInfo) {
    const response = await fetch(
      "/users",
      getHeader("POST", {
        user: userInfo,
      })
    );
    if (response.ok) {
      return;
    } else {
      throw new Error(response.message);
    }
  }

  async function updateUser(userInfo) {
    const response = await fetch(
      "/users",
      getHeader("PUT", {
        user: userInfo,
      })
    );
    if (response.ok) {
      return;
    } else {
      throw new Error(response.message);
    }
  }

  return {
    createUser,
    updateUser,
  };
}
