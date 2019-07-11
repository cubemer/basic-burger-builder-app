import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './Burger.module.css';


const burger = (props) => {
  // Very complex logic happening here
  // We make an array of the keys in the state object, passed to 'burger' as a prop
  let outputIngredients = Object.keys(props.ingredients)
    .map((ingredient) => {
      // Create an array with as many indices as there are ingredients
      return [...Array(props.ingredients[ingredient])].map((_, i) => {
        // In here we actually return the ingredient components with a key to satisfy React
        // and a type to make sure the correct class is assigned to the BurgerIngredient component
        return <BurgerIngredient key={ingredient + i} type={ingredient} />
      })
    })
    // arr is the initial value passed into the reduce method
    // el is the element currently being accessed
    .reduce((arr, el) => {
      // We want to add all the inner arrays to arr so that we get a one dimensional array
      return arr.concat(el);
    }, []);
  // In the end the state object passed as a prop gets mapped to an array of BurgerIngredient arrays
  // It looks something like: [ [one bacon], [one lettuce, two lettuce], [one meat, two meat, three meat] ]

  if (outputIngredients.length === 0) {
    outputIngredients = <p>Please start adding ingredients!</p>
  }

  return(
    <div className={styles.Burger}>
      <BurgerIngredient type='bread-top'/>
      {outputIngredients}
      <BurgerIngredient type='bread-bottom'/>
    </div>
  );
};

export default burger;