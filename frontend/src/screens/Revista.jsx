import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Revista = () => {
  const [magazineID, setMagazineID] = useState('');
  const [magazineName, setMagazineName] = useState('');
  const [issueNumber, setIssueNumber] = useState('');
  const [publisherID, setPublisherID] = useState('');
  const [magazine, setMagazine] = useState([]);
  const [botuesi, setBotuesi] = useState([]); // To fetch groups for the dropdown
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all members and groups on component mount
  useEffect(() => {
    fetchMagazine();
    fetchBotuesi();
  }, []);

  const fetchMagazine = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/revista');
      setMagazine(res.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching members');
    }
  };

  const fetchBotuesi = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/botuesi');
      setBotuesi(res.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching botuesi');
    }
  };

  // Handle form submit for Create or Update
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editing) {
        // Update member
        const res = await axios.put(`http://localhost:5000/api/revista/${magazineID}`, { 
          MagazineName: magazineName, 
          IssueNumber: issueNumber, 
          PublisherID: publisherID 
        });
        setMagazine(magazine.map(m => m.MagazineID === magazineID ? res.data : m));
        clearForm();
      } else {
        // Create new member
        const res = await axios.post('http://localhost:5000/api/revista', { 
          MagazineID: magazineID, 
          MagazineName: magazineName, 
          IssueNumber: issueNumber, 
          PublisherID: publisherID 
        });
        setMagazine([...magazine, res.data]);
        clearForm();
      }
    } catch (err) {
      console.error(err);
      setError(editing ? 'Error updating member' : 'Error creating member');
    }
  };

  // Handle Edit click
  const handleEdit = (magazine) => {
    const magazineToEdit = magazine.find(m => m.MagazineID === magazine);
    setMagazineID(magazineToEdit.MagazineID);
    setMagazineName(magazineToEdit.MagazineName);
    setIssueNumber(magazineToEdit.IssueNumber);
    setPublisherID(magazineToEdit.PublisherID);
    setEditing(true);
  };

  // Handle Delete click
  const handleDelete = async (magazine) => {
    try {
      await axios.delete(`http://localhost:5000/api/revista/${magazine}`);
      setMagazine(magazine.filter(m => m.MagazineIDz !== magazine));
    } catch (err) {
      console.error(err);
      setError('Error deleting member');
    }
  };

  // Clear form fields
  const clearForm = () => {
    setMagazineID('');
    setMagazineName('');
    setIssueNumber('');
    setPublisherID('');
    setEditing(false);
    setError(null); // Clear any existing error
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">{editing ? 'Edit Magazine' : 'Add Magazine'}</h2>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="magazineID">Magazine ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="magazineID"
                    value={magazineID}
                    onChange={(e) => setMagazineID(e.target.value)}
                    required
                    disabled={editing} // Disable when editing
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Magazine Name">MAgazine Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="magazineName"
                    value={magazineName}
                    onChange={(e) => setMagazineName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Issue Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="issueNumber"
                    value={issueNumber}
                    onChange={(e) => setIssueNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="groupID">Publisher ID:</label>
                  <select
                    className="form-control"
                    id="publisherID"
                    value={publisherID}
                    onChange={(e) => setPublisherID(e.target.value)}
                    required
                  >
                    <option value="">Select a Group</option>
                    {botuesi.map((botuesi) => (
                      <option key={botuesi.PublisherID} value={botuesi.PublisherID}>
                        {botuesi.PublisherName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary btn-lg w-100 mt-3">
                    {editing ? 'Update Magazine' : 'Create Magazine'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <h3 className="card-title text-center">Magazine List</h3>
              {magazine.length > 0 ? (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Magazine ID</th>
                      <th>Magazine Name</th>
                      <th>issue Number</th>
                      <th>Publisher ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {magazine.map((magazine) => (
                      <tr key={magazine.MagazineID}>
                        <td>{magazine.MagazineID}</td>
                        <td>{magazine.MagazineName}</td>
                        <td>{magazine.IssueNumber}</td>
                        <td>{magazine.PublisherID}</td>
                        <td>
                          <button className="btn btn-info btn-sm mr-2" onClick={() => handleEdit(magazine.MemberID)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(magazine.MemberID)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="alert alert-info" role="alert">No members available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revista;
