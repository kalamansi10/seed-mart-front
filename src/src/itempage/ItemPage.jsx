import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useItemAPI from "../api/useItemAPI";
import PreviewSlider from "./PreviewSlider";
import ItemBanner from "./ItemBanner";
import "./itempage.css";

export default function ItemPage() {
  const [item, setItem] = useState();
  const { id } = useParams();
  const { getItem } = useItemAPI();

  useEffect(() => {
    async function fetchItem() {
      const item = await getItem(id);
      if (item) {
        setItem(item);
      }
    }
    fetchItem();
  }, []);

  if (item) {
    return (
      <>
        <div className="flex-row justify-center full-height">
          <div className="item-page box-shadow">
            <div>
              <PreviewSlider item={item} />
            </div>
            <div className="flex-row align-center">
              <ItemBanner item={item} />
            </div>
          </div>
        </div>
      </>
    );
  }
}
