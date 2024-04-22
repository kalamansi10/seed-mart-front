import useCookiesAndHeaders from "../hooks/useCookiesAndHeaders";

export default function useOrderAPI(fetchOrders) {
  const { getHeader } = useCookiesAndHeaders();

  async function getOrder(orderReference) {
    const response = await fetch(`/api/order/${orderReference}`);

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.message);
    }
  }

  async function processOrder(orderList) {
    const response = await fetch(
      "/api/order",
      getHeader("POST", {
        order_list: orderList,
      })
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.message);
    }
  }

  async function getOrderList() {
    const response = await fetch("/api/order/list");

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.message);
    }
  }

  async function updateOrderStatus(updatedOrder) {
    const response = await fetch(
      "/api/order/status",
      getHeader("POST", {
        order: updatedOrder,
      })
    );

    if (response.ok) {
      fetchOrders();
    } else {
      throw new Error(response.message);
    }
  }

  return {
    getOrder,
    processOrder,
    getOrderList,
    updateOrderStatus,
  };
}
