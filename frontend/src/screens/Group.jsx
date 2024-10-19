import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Group = () => {
  const [groupID, setGroupID] = useState(''); // Renamed for clarity
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [groups, setGroups] = useState([]);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all groups on component mount
  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/groups');
      setGroups(res.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching groups');
    }
  };

  // Handle form submit for Create or Update
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editing) {
        // Update group
        const res = await axios.put(`http://localhost:5000/api/groups/${groupID}`, { 
          GroupName: groupName, 
          Description: description 
        });
        setGroups(groups.map(g => g.GroupID === groupID ? res.data : g));
        clearForm();
      } else {
        // Create new group
        const res = await axios.post('http://localhost:5000/api/groups', { 
          GroupID: groupID, 
          GroupName: groupName, 
          Description: description 
        });
        setGroups([...groups, res.data]);
        clearForm();
      }
    } catch (err) {
      console.error(err);
      setError(editing ? 'Error updating group' : 'Error creating group');
    }
  };

  // Handle Edit click
  const handleEdit = (group) => {
    const groupToEdit = groups.find(g => g.GroupID === group);
    setGroupID(groupToEdit.GroupID);
    setGroupName(groupToEdit.GroupName);
    setDescription(groupToEdit.Description);
    setEditing(true);
  };

  // Handle Delete click
  const handleDelete = async (group) => {
    try {
      await axios.delete(`http://localhost:5000/api/groups/${group}`);
      setGroups(groups.filter(g => g.GroupID !== group));
    } catch (err) {
      console.error(err);
      setError('Error deleting group');
    }
  };

  // Clear form fields
  const clearForm = () => {
    setGroupID('');
    setGroupName('');
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
              <h2 className="card-title text-center">{editing ? 'Edit Group' : 'Add Group'}</h2>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="groupID">Group ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="groupID"
                    value={groupID}
                    onChange={(e) => setGroupID(e.target.value)}
                    required
                    disabled={editing} // Disable when editing
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="groupName">Group Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="groupName"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
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
                    {editing ? 'Update Group' : 'Create Group'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <h3 className="card-title text-center">Group List</h3>
              {groups.length > 0 ? (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Group ID</th>
                      <th>Group Name</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.map((group) => (
                      <tr key={group.GroupID}>
                        <td>{group.GroupID}</td>
                        <td>{group.GroupName}</td>
                        <td>{group.Description}</td>
                        <td>
                          <button className="btn btn-info btn-sm mr-2" onClick={() => handleEdit(group.GroupID)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(group.GroupID)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="alert alert-info" role="alert">No groups available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
