import { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartContext = useContext(CartContext); 
  
  const addMealInCartHandler = (amount) => {
    const meal = {
      id: props.id,
      name: props.name, 
      price: props.price, 
      amount: Number(amount) 
    }; 

    cartContext.addMeal(meal);
  }

  const price = "$" + props.price.toFixed(2);

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAdd={addMealInCartHandler} id={props.id}/>
      </div>
    </li>
  );
};

export default MealItem;
