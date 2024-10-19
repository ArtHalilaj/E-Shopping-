import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  // Controlled input for keyword
  const [keyword, setKeyword] = useState(urlKeyword || '');

  // Handle search submission
  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      const searchQuery = keyword.toLowerCase().trim();

      // Redirect based on specific keyword patterns
      if (searchQuery.includes('profili') || searchQuery.includes('profile') || searchQuery.includes('profili im')|| searchQuery.includes('my profile')|| searchQuery.includes('user profile')|| searchQuery.includes('users profile')|| searchQuery.includes('profili perdoruesit')|| searchQuery.includes('email')|| searchQuery.includes('password')|| searchQuery.includes('ndrysho passwordin')) {
        navigate('/profile'); // PROFILI
      } else if (searchQuery.includes('shporta')|| searchQuery.includes('cart')|| searchQuery.includes('shporta ime')|| searchQuery.includes('my cart')) {
        navigate('/cart'); // SHPORTA
      } else if (searchQuery.includes('feedback')|| searchQuery.includes('feedbacku')|| searchQuery.includes('eksperienca ime')|| searchQuery.includes('komento')) {
        navigate('/feedback'); // FEEDBACK
      }else if (searchQuery.includes('produktet')|| searchQuery.includes('produktet tona')|| searchQuery.includes('products')|| searchQuery.includes('lista e produkteve')|| searchQuery.includes('product list')) {
        navigate('/admin/productlist'); // PRODUKTET
      }else if (searchQuery.includes('porosite')|| searchQuery.includes('porosit')|| searchQuery.includes('porosite e klienteve')|| searchQuery.includes('porosite tona')) {
        navigate('/admin/orderlist'); // PRODUKTET
      } else if (searchQuery.includes('perdoruesit')|| searchQuery.includes('perdoruesite')|| searchQuery.includes('klientet')|| searchQuery.includes('klienti')) {
        navigate('/admin/userlist'); // PRODUKTET
      } else if (searchQuery.startsWith('category ')) {
        const category = searchQuery.split(' ')[1]; // Extract category name after 'category'
        if (category) {
          navigate(`/category/${category}`); // Navigate to specific category if present
        }
      }  else {
        navigate(`/search/${searchQuery}`); // Default search for products
      }

      // Reset the search input field
      setKeyword('');
    } else {
      navigate('/'); // Redirect to home page if no keyword is entered
    }
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Form.Control
        style={{ width: '300px' }} // Merged styling from the original
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Kerko Produkte...' // Updated placeholder
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button
        type='submit'
        variant='outline-success'
        className='p-2 mx-2'
        style={{ backgroundColor: '#DA1E25', borderColor: 'white', color: 'white' }} // Button styling from original version
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
