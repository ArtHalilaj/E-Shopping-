import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Botuesi = () => {
  const [publisherID, setPublisherID] = useState(''); // Renamed for clarity
  const [publisherName, setPublisherName] = useState('');
  const [location, setLocation] = useState('');
  const [botuesi, setBotuesi] = useState([]);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all botuesit on component mount
  useEffect(() => {
    fetchBotuesi();
  }, []);

  const fetchBotuesi = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/botuesi');
      setBotuesi(res.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching botuesit');
    }
  };

  // Handle form submit for Create or Update
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editing) {
        // Update group
        const res = await axios.put(`http://localhost:5000/api/botuesi/${publisherID}`, { 
          PublisherName: publisherName, 
          Location: location 
        });
        setBotuesi(botuesi.map(g => g.publisherID === publisherID ? res.data : g));
        clearForm();
      } else {
        // Create new group
        const res = await axios.post('http://localhost:5000/api/botuesi', { 
          PublisherID: publisherID, 
          PublisherName: publisherName, 
          Location: location 
        });
        setBotuesi([...botuesi, res.data]);
        clearForm();
      }
    } catch (err) {
      console.error(err);
      setError(editing ? 'Error updating group' : 'Error creating group');
    }
  };

  // Handle Edit click
  const handleEdit = (botuesi) => {
    const botuesiToEdit = botuesi.find(g => g.publisherID === botuesi);
    setPublisherID(botuesiToEdit.PublisherID);
    setPublisherName(botuesiToEdit.PublisherName);
    setLocation(botuesiToEdit.Location);
    setEditing(true);
  };

  // Handle Delete click
  const handleDelete = async (botuesi) => {
    try {
      await axios.delete(`http://localhost:5000/api/botuesi/${botuesi}`);
      setBotuesi(botuesi.filter(g => g.PublisherID !== botuesi));
    } catch (err) {
      console.error(err);
      setError('Error deleting group');
    }
  };

  // Clear form fields
  const clearForm = () => {
    setPublisherID('');
    setPublisherName('');
    setLocation('');
    setEditing(false);
    setError(null); // Clear any existing error
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">{editing ? 'Edit Botuesi' : 'Add Botuesi'}</h2>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="publisherID">Publisher ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="publisherID"
                    value={publisherID}
                    onChange={(e) => setPublisherID(e.target.value)}
                    required
                    disabled={editing} // Disable when editing
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="publisherName">Publisher Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="publisherName"
                    value={publisherName}
                    onChange={(e) => setPublisherName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location">location:</label>
                  <textarea
                    className="form-control"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary btn-lg w-100 mt-3">
                    {editing ? 'Update Botuesi' : 'Create Botuesi'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <h3 className="card-title text-center">Lista e Botueseve</h3>
              {botuesi.length > 0 ? (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Publisher ID</th>
                      <th>Publisher Name</th>
                      <th>location</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {botuesi.map((botuesi) => (
                      <tr key={botuesi.PublisherID}>
                        <td>{botuesi.PublisherID}</td>
                        <td>{botuesi.PublisherName}</td>
                        <td>{botuesi.Location}</td>
                        <td>
                          <button className="btn btn-info btn-sm mr-2" onClick={() => handleEdit(botuesi.PublisherID)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(botuesi.PublisherID)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="alert alert-info" role="alert">No botuesit available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Botuesi;
