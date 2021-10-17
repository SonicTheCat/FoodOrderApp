import { useContext } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const increaseCartMealAmountHandler = (mealItem) => {
    cartCtx.addMeal({...mealItem, amount: 1});
  };

  const decreaseCartMealAmountHandler = (id) => {
    cartCtx.removeMeal(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.mealsInCart.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={increaseCartMealAmountHandler.bind(null, item)}
          onRemove={decreaseCartMealAmountHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onBackdropClicked={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${cartCtx.totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onHideCart} className={classes["button--alt"]}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};
export default Cart;
