import { useState } from "react";
import useCookiesAndHeaders from "../hooks/useCookiesAndHeaders";

export default function useOrderAPI() {
  const [referenceNumber, setReferenceNumber] = useState();
  const { getHeader } = useCookiesAndHeaders();

  async function process(orderList) {
    return fetch(
      "api/v1/order",
      getHeader("POST", {
        order_list: orderList,
      }),
    ).then((response) => response.json());
  }

  return { process, referenceNumber, setReferenceNumber };
}
