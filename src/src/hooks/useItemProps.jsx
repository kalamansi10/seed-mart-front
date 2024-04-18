// Used in Categories, SearchFilter, ItemBanner

import { useState, useEffect } from "react";
import useMiscAPI from "../api/useMiscAPI";

function useItemProps() {
  const [list, setList] = useState();
  const { getItemProperties } = useMiscAPI();

  useEffect(() => {
    async function fetchItemProperties() {
      let itemProps = localStorage.getItem("itemsProps");

      if (itemProps == "undefined" || itemProps == null) {
        itemProps = await getItemProperties();
        if (itemProps) {
          storeLocalItemsProps(itemProps);
        }
      } else {
        setList(JSON.parse(localStorage.getItem("itemsProps")));
      }
    }

    fetchItemProperties();
  }, []);

  function storeLocalItemsProps(data) {
    localStorage.setItem("itemsProps", JSON.stringify(data));
    setList(data);
  }

  function getListFields() {
    return Object.keys(list);
  }

  return [list, getListFields];
}

export default useItemProps;
