import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {
  // This component can be a functional, no need for class based
  // I'm using componentWillUpdate for debugging purposes
  componentWillUpdate() {
    // console.log('[OrderSummary.js] componentWillUpdate')
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(ingredient => {
        return(
          <li key={ingredient}>
            <span style={{textTransform: 'capitalize'}}>{ingredient}</span>: {this.props.ingredients[ingredient]}
          </li>);
      });

    return(
      <Aux>
        <h3>Your Order</h3>
        <p>A burger with these ingredients costs: <strong>${this.props.price.toFixed(2)}</strong></p>
        <ul>
          {ingredientSummary}
        </ul>
        <p>Continue to checkout?</p>
        <Button btnType='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    );
  }
}

export default OrderSummary;