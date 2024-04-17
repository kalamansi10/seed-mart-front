function useCookiesAndHeaders() {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const getHeader = (method, body = {}) => {
    return {
      method: method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": getCookie("CSRF-TOKEN"),
      },
      body: JSON.stringify(body),
    };
  };

  return { getCookie, getHeader };
}

export default useCookiesAndHeaders;
