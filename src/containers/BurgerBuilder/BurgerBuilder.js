import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as types from '../../store/actions'

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  lettuce: 0.25,
  bacon: 0.75,
  cheese: 0.5,
  meat: 1
};

class BurgerBuilder extends Component {
  state = {
    totalPrice: 2,
    buyable: false,
    buyingMode: false,
    loading: false,
    error: false,
  };

  // componentDidMount() {
  //   axios.get('https://basic-burger-app.firebaseio.com/ingredients.json')
  //   .then(res => {
  //     this.setState({ingredients: res.data})
  //   })
  //   .catch(err => {
  //     this.setState({error: true})
  //   });
  // }

  updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients)
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({buyable: (sum > 0)})
  };

  addIngredientHandler = (type) => {
    const oldCount = this.props.ings[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.props.ings
    };
    updatedIngredients[type] = updatedCount;
    const cost = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + cost;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.props.ings[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.props.ings
    };
    updatedIngredients[type] = updatedCount;
    const cost = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - cost;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  };

  buyingModeHandler = () => {
    this.setState({buyingMode: true});
  };

  purchaseCancelHandler = () => {
    this.setState({buyingMode: false})
  };

  purchaseContinueHandler = () => {
    // alert('You have continued!!')
    const queryParams = [];
    for (let i in this.props.ings) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
    }
    queryParams.push(`price=${this.state.totalPrice}`)
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = (disabledInfo[key] <= 0)
    }
    let orderSummary = null
    let burger = this.state.error ? <p>Can't load ingredients!</p> : <Spinner/>
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            buyable={this.state.buyable}
            price={this.state.totalPrice}
            ordered={this.buyingModeHandler} />
        </Aux>
      )
      orderSummary = (
        <OrderSummary
        ingredients={this.props.ings}
        price={this.state.totalPrice}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />)
      }
      if (this.state.loading) {
        orderSummary = <Spinner/>
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
  { ings: state.ingredients }
)

const mapDispatchToProps = dispatch => (
  {
    onIngredientAdded: (ingName) => dispatch({type: types.ADD_INGREDIENTS, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: types.REMOVE_INGREDIENTS, ingredientName: ingName}),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));