import React, { useState } from 'react';
import './styles/AddPlan.css'; // Import CSS file

const AddPlans = ({ onSubmit }) => {
  const [userId, setUserId] = useState('');
  const [availableRoutes, setAvailableRoutes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('availableRoutes', availableRoutes);
    onSubmit(formData);
  };

  return (
    <div className="container"> {/* Added container class */}
      <h2 className="heading">Add User Plan</h2> {/* Added heading class */}
      <form onSubmit={handleSubmit} className="customForm"> {/* Added customForm class */}
        <label className="formLabel"> {/* Added formLabel class */}
          User ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} className="formInput" /> {/* Added formInput class */}
        </label>
        <label className="formLabel"> {/* Added formLabel class */}
          Available Routes:
          <input type="number" value={availableRoutes} onChange={(e) => setAvailableRoutes(e.target.value)} className="formInput" /> {/* Added formInput class */}
        </label>
        <button type="submit" className="submitButton">Submit</button> {/* Added submitButton class */}
      </form>
    </div>
  );
};

export default AddPlans;
