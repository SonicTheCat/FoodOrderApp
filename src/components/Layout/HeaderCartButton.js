import { useState, useContext, useEffect } from "react";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [bumpButton, setBumpButton] = useState(false);
  const cartCtx = useContext(CartContext);
  const meals = cartCtx.mealsInCart;

  useEffect(() => {
    if (meals.length === 0) {
      return;
    }

    setBumpButton(true);

    const timer = setTimeout(() => {
      setBumpButton(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [meals]);

  const totalMealsInCart = meals.reduce((prev, curr) => {
    return Number(prev) + Number(curr.amount);
  }, 0);

  const btnClasses = `${classes.button} ${bumpButton ? classes.bump : ""}`;

  return (
    <button onClick={props.onShowCart} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{totalMealsInCart}</span>
    </button>
  );
};

export default HeaderCartButton;
