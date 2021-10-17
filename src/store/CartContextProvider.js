import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
  mealsInCart: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingMealIndex = state.mealsInCart.findIndex(
      (x) => x.id === action.value.id
    );

    let newMeals;

    if (existingMealIndex !== -1) {
      const existingMeal = state.mealsInCart[existingMealIndex];
      const newAmount = (existingMeal.amount += Number(action.value.amount));
      const newMeal = { ...existingMeal, amount: newAmount };

      newMeals = [...state.mealsInCart];
      newMeals[existingMealIndex] = newMeal;
    } else {
      newMeals = state.mealsInCart.concat(action.value);
    }

    const newAmount =
      state.totalAmount + action.value.price * action.value.amount;

    return {
      mealsInCart: newMeals,
      totalAmount: newAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingMealIndex = state.mealsInCart.findIndex(
      (x) => x.id === action.id
    );

    let updatedItems;
    let existingItem = state.mealsInCart[existingMealIndex];

    if (existingItem.amount === 1) {
      updatedItems = state.mealsInCart.filter((x) => x.id !== action.id);
    } else {
      const updateItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.mealsInCart];
      updatedItems[existingMealIndex] = updateItem;
    }

    const newAmount = state.totalAmount - existingItem.price;

    return {
      mealsInCart: updatedItems,
      totalAmount: newAmount,
    };
  }

  return defaultState;
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(cartReducer, defaultState);

  const addMealHandler = (meal) => {
    dispatchCartState({ type: "ADD", value: meal });
  };

  const removeMealHandler = (id) => {
    dispatchCartState({ type: "REMOVE", id: id });
  };

  const context = {
    mealsInCart: cartState.mealsInCart,
    totalAmount: cartState.totalAmount,
    addMeal: addMealHandler,
    removeMeal: removeMealHandler,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
