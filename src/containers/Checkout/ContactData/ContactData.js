import React from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import styles from './ContactData.module.css'

class ContactData extends React.Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zipCode: '',
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Juan Carmona',
        address: {
          street: '123 Main St.',
          zipCode: '01110',
          country: 'US'
        },
        email: 'juan@email.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(res => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({loading: false});
      });

  }

  render() {
    let form = (
      <form>
        <Input inputtype='input' type='text' name='name' placeholder='Name' />
        <Input inputtype='input' type='text' name='email' placeholder='Email' />
        <Input inputtype='input' type='text' name='street' placeholder='Street' /> 
        <Input inputtype='input' type='text' name='zip' placeholder='ZIP' /> 
        <Button btnType='Success' clicked={this.orderHandler} >ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner/>
    }
    return(
      <div className={styles.ContactData}>
        <h4>Enter your contact data.</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;