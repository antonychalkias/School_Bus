import React, { useState } from 'react';
import './styles/AddBus.css';

const AddBus = ({ onSubmit }) => {
  const [model, setModel] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [remainingCapacity, setRemainingCapacity] = useState('');
  const [driverName, setDriverName] = useState('');
  const [driverPicture, setDriverPicture] = useState(null);
  const [photos, setPhotos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('model', model);
    formData.append('licensePlate', licensePlate);
    formData.append('capacity', capacity);
    formData.append('remainingCapacity', remainingCapacity);
    formData.append('driverName', driverName);
    formData.append('driverPicture', driverPicture);
    photos.forEach((photo) => {
      formData.append('photos', photo);
    });
    onSubmit(formData);
  };

  return (
    <div className="container">
      <h2>Add Bus</h2>
      <form onSubmit={handleSubmit} className="customForm">
        <label>
          Model:
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
        </label>
        <label>
          License Plate:
          <input type="text" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} />
        </label>
        <label>
          Capacity:
          <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
        </label>
        <label>
          Remaining Capacity:
          <input type="number" value={remainingCapacity} onChange={(e) => setRemainingCapacity(e.target.value)} />
        </label>
        <label>
          Driver Name:
          <input type="text" value={driverName} onChange={(e) => setDriverName(e.target.value)} />
        </label>
        <label>
          Driver Picture:
          <input type="file" accept="image/*" onChange={(e) => setDriverPicture(e.target.files[0])} />
        </label>
        <label>
          Bus Photos:
          <input type="file" accept="image/*" multiple onChange={(e) => setPhotos([...photos, ...Array.from(e.target.files)])} />
        </label>
        <div className="buttonWrap">
          <button type="submit" className='submitBtn'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddBus;
