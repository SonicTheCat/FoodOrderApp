import React from "react";

const CartContext = React.createContext({
    mealsInCart: [],
    totalAmount: 0, 
    addMeal: (meal) => {},
    removeMeal: (id) => {}
}); 

export default CartContext;