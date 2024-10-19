import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Member = () => {
  const [memberID, setMemberID] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [groupID, setGroupID] = useState('');
  const [members, setMembers] = useState([]);
  const [groups, setGroups] = useState([]); // To fetch groups for the dropdown
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all members and groups on component mount
  useEffect(() => {
    fetchMembers();
    fetchGroups();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/members');
      setMembers(res.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching members');
    }
  };

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
        // Update member
        const res = await axios.put(`http://localhost:5000/api/members/${memberID}`, { 
          Name: name, 
          Role: role, 
          GroupID: groupID 
        });
        setMembers(members.map(m => m.MemberID === memberID ? res.data : m));
        clearForm();
      } else {
        // Create new member
        const res = await axios.post('http://localhost:5000/api/members', { 
          MemberID: memberID, 
          Name: name, 
          Role: role, 
          GroupID: groupID 
        });
        setMembers([...members, res.data]);
        clearForm();
      }
    } catch (err) {
      console.error(err);
      setError(editing ? 'Error updating member' : 'Error creating member');
    }
  };

  // Handle Edit click
  const handleEdit = (member) => {
    const memberToEdit = members.find(m => m.MemberID === member);
    setMemberID(memberToEdit.MemberID);
    setName(memberToEdit.Name);
    setRole(memberToEdit.Role);
    setGroupID(memberToEdit.GroupID);
    setEditing(true);
  };

  // Handle Delete click
  const handleDelete = async (member) => {
    try {
      await axios.delete(`http://localhost:5000/api/members/${member}`);
      setMembers(members.filter(m => m.MemberID !== member));
    } catch (err) {
      console.error(err);
      setError('Error deleting member');
    }
  };

  // Clear form fields
  const clearForm = () => {
    setMemberID('');
    setName('');
    setRole('');
    setGroupID('');
    setEditing(false);
    setError(null); // Clear any existing error
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">{editing ? 'Edit Member' : 'Add Member'}</h2>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="memberID">Member ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="memberID"
                    value={memberID}
                    onChange={(e) => setMemberID(e.target.value)}
                    required
                    disabled={editing} // Disable when editing
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="groupID">Group:</label>
                  <select
                    className="form-control"
                    id="groupID"
                    value={groupID}
                    onChange={(e) => setGroupID(e.target.value)}
                    required
                  >
                    <option value="">Select a Group</option>
                    {groups.map((group) => (
                      <option key={group.GroupID} value={group.GroupID}>
                        {group.GroupName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary btn-lg w-100 mt-3">
                    {editing ? 'Update Member' : 'Create Member'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <h3 className="card-title text-center">Member List</h3>
              {members.length > 0 ? (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Member ID</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Group ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member) => (
                      <tr key={member.MemberID}>
                        <td>{member.MemberID}</td>
                        <td>{member.Name}</td>
                        <td>{member.Role}</td>
                        <td>{member.GroupID}</td>
                        <td>
                          <button className="btn btn-info btn-sm mr-2" onClick={() => handleEdit(member.MemberID)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(member.MemberID)}>Delete</button>
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

export default Member;
