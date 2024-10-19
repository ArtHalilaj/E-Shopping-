import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [clientEmail, setEmail] = useState('');
  const [text, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/feedback', { clientEmail, text })
      .then(res => {
        console.log(res);
        setSubmitted(true);
        setError(null);
      })
      .catch(err => {
        console.log(err);
        setError('Error submitting feedback');
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Tregoni eksperiencen tuaj me  <br/>  E-Shopping</h2>
              {submitted ? (
                <div className="alert alert-success" role="alert">
                  Faleminderit per vlersim!
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && <div className="alert alert-danger" role="alert">{error}</div>}
                  <div className="form-group">
                    <label htmlFor="clientEmail">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="clientEmail"
                      value={clientEmail}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="text">Komente:</label>
                    <textarea
                      className="form-control"
                      id="text"
                      value={text}
                      onChange={(e) => setComments(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-center">
                <button style={{color:"white"}} type="submit" className="btn btn-success btn-lg w-100 mt-3 shadow-sm rounded-pill">Submit</button>
              </div>


                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
