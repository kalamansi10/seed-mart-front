import { useEffect, useState } from "react";
import useDialog from "../hooks/useDialog";
import useListState from "../hooks/useListState";
import useOrderAPI from "../api/useOrderAPI";
import useReviewAPI from "../api/useReviewAPI";
import AddReviewDialog from "../dialogs/AddReviewDialog";

export default function Orders() {
  const [orderType, setOrderType] = useState("All");
  const [forReview, setForReview] = useState({});
  const orders = useListState();
  const reviewDialog = useDialog();
  const { getOrderList } = useOrderAPI();
  const { getReview, addReview, editReview, deleteReview } = useReviewAPI();

  useEffect(() => {
    async function fetchOrders() {
      const orderList = await getOrderList();
      if (orderList) {
        orders.setList(orderList);
      }
    }

    fetchOrders();
  }, []);

  function renderReview(order) {    
    function handleAddReview() {
      setForReview(order)
      reviewDialog.show()
    }

    if (order.review) {
      return (
        <div>
          {order.review.rating}
          {order.review.comment}
          <button onClick={handleAddReview}>Edit</button>;
        </div>
      );
    } else {
      return <button onClick={handleAddReview}>Add Review</button>;
    }
  }

  function renderOrders() {
    return orders.list.map((order) => {
      return (
        <div key={order.id}>
          <img src={order.item.image_links[0]} alt="item-preview" />
          <p>{order.item.name}</p>
          <p>x{order.amount}</p>
          <p>{order.item.price}</p>
          <p>{order.total}</p>
          <button>Buy Again</button>
          {renderReview(order)}
        </div>
      );
    });
  }

  return (
    <div>
      <div className="">
        <ul>
          <button onClick={(e) => setOrderType(e.target.value)} value="All">
            All
          </button>
          <button onClick={(e) => setOrderType(e.target.value)} value="To Pay">
            To Pay
          </button>
          <button onClick={(e) => setOrderType(e.target.value)} value="To Ship">
            To Ship
          </button>
          <button
            onClick={(e) => setOrderType(e.target.value)}
            value="To Receive"
          >
            To Receive
          </button>
          <button
            onClick={(e) => setOrderType(e.target.value)}
            value="Completed"
          >
            Completed
          </button>
          <button
            onClick={(e) => setOrderType(e.target.value)}
            value="Cancelled"
          >
            Cancelled
          </button>
          <button
            onClick={(e) => setOrderType(e.target.value)}
            value="Return/Refund"
          >
            Return/Refund
          </button>
        </ul>
      </div>
      <div>{orderType}</div>
      <div>{renderOrders()}</div>
      <AddReviewDialog reviewDialog={reviewDialog} order={forReview} />
    </div>
  );
}
