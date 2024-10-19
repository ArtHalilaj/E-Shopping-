import { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';
import payment from '../assets/payment.png'

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <br />
      <br />
      <h1 style={{ textAlign: 'center' }}>Metoda e Pageses</h1>
      <br />
      <br />
      <br />
      
      <Form onSubmit={submitHandler}>
        <Form.Group >
          <Form.Label as='legend'>Zgjedhni metoden</Form.Label>
          <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Form.Check
              className='my-2'
              type='radio'
              label='PayPal ose Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <img style={{ width: '300px' }} src={payment} alt='Payment Methods' />
          </Col>
        </Form.Group>
        <br />
        <br />
        <Button 
          style={{ width: '100%', backgroundColor: '#37B34B', border: '#37B34B' }} 
          type='submit' 
          variant='primary'
        >
          Vazhdoni
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
