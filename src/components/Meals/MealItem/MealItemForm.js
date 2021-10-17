import { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const [isValidAmount, setIsValidAmount] = useState(true);
  const amountInputRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value; 

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmount < 1 ||
      enteredAmount > 5
    ) {
      setIsValidAmount(false);
      return;
    }

    setIsValidAmount(true);
    props.onAdd(enteredAmount);
  };

  return (
    <form onSubmit={submitFormHandler} className={classes.form}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isValidAmount && <p>Please enter a valid amount</p>}
    </form>
  );
};

export default MealItemForm;
