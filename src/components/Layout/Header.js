import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
import image from "../../assets/meals.jpg";

const Header = props => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onShowCart={props.onShowCart}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={image} alt="hrana!" />
      </div>
    </Fragment>
  );
};

export default Header;