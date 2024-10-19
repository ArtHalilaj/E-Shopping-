import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Planet = () => {
  const [planetID, setPlanetID] = useState(''); // Renamed for clarity
  const [planetName, setPlanetName] = useState('');
  const [description, setDescription] = useState('');
  const [planets, setPlanets] = useState([]);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all planets on component mount
  useEffect(() => {
    fetchPlanets();
  }, []);

  const fetchPlanets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/planets');
      setPlanets(res.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching planets');
    }
  };

  // Handle form submit for Create or Update
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editing) {
        // Update planet
        const res = await axios.put(`http://localhost:5000/api/planets/${planetID}`, { 
          PlanetName: planetName, 
          Description: description 
        });
        setPlanets(planets.map(p => p.PlanetID === planetID ? res.data : p));
        clearForm();
      } else {
        // Create new planet
        const res = await axios.post('http://localhost:5000/api/planets', { 
          PlanetID: planetID, 
          PlanetName: planetName, 
          Description: description 
        });
        setPlanets([...planets, res.data]);
        clearForm();
      }
    } catch (err) {
      console.error(err);
      setError(editing ? 'Error updating planet' : 'Error creating planet');
    }
  };

  // Handle Edit click
  const handleEdit = (planet) => {
    const planetToEdit = planets.find(p => p.PlanetID === planet);
    setPlanetID(planetToEdit.PlanetID);
    setPlanetName(planetToEdit.PlanetName);
    setDescription(planetToEdit.Description);
    setEditing(true);
  };

  // Handle Delete click
  const handleDelete = async (planet) => {
    try {
      await axios.delete(`http://localhost:5000/api/planets/${planet}`);
      setPlanets(planets.filter(p => p.PlanetID !== planet));
    } catch (err) {
      console.error(err);
      setError('Error deleting planet');
    }
  };

  // Clear form fields
  const clearForm = () => {
    setPlanetID('');
    setPlanetName('');
    setDescription('');
    setEditing(false);
    setError(null); // Clear any existing error
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">{editing ? 'Edit Planet' : 'Add Planet'}</h2>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="planetID">Planet ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="planetID"
                    value={planetID}
                    onChange={(e) => setPlanetID(e.target.value)}
                    required
                    disabled={editing} // Disable when editing
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="planetName">Planet Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="planetName"
                    value={planetName}
                    onChange={(e) => setPlanetName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary btn-lg w-100 mt-3">
                    {editing ? 'Update Planet' : 'Create Planet'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <h3 className="card-title text-center">Planet List</h3>
              {planets.length > 0 ? (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Planet ID</th>
                      <th>Planet Name</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planets.map((planet) => (
                      <tr key={planet.PlanetID}>
                        <td>{planet.PlanetID}</td>
                        <td>{planet.PlanetName}</td>
                        <td>{planet.Description}</td>
                        <td>
                          <button className="btn btn-info btn-sm mr-2" onClick={() => handleEdit(planet.PlanetID)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(planet.PlanetID)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="alert alert-info" role="alert">No planets available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planet;
