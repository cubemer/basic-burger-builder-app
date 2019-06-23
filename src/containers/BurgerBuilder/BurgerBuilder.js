import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as burgerBuilderActions from '../../store/actions/index'

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
  state = { buyingMode: false };

  componentDidMount () {
    this.props.onInitIngredients()
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients)
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  buyingModeHandler = () => {
    this.setState({buyingMode: true});
  };

  purchaseCancelHandler = () => {
    this.setState({buyingMode: false})
  };

  purchaseContinueHandler = () => {
    // alert('You have continued!!')
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = (disabledInfo[key] <= 0)
    }
    let orderSummary = null
    let burger = this.props.error ? <p>Can't load ingredients!</p> : <Spinner/>
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            buyable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
            ordered={this.buyingModeHandler} />
        </Aux>
      )
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler} />)
      }
      return (
        <Aux>
        <Modal show={this.state.buyingMode} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => (
  { 
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
)

const mapDispatchToProps = dispatch => (
  {
    onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));