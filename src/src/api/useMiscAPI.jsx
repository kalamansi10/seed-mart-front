export default function useMiscAPI() {
  async function getActiveBanners() {
    const response = await fetch("/api/misc/active-banners");
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.message);
    }
  }

  async function getItemProperties() {
    const response = await fetch("/api/misc/item-properties");
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.message);
    }
  }

  return {
    getActiveBanners,
    getItemProperties,
  };
}
