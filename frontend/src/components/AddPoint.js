import React, { useState } from 'react';

const AddPoint = ({ onSubmit }) => {
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [point, setPoint] = useState('');
  const [locator, setLocator] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('longitude', longitude);
    formData.append('latitude', latitude);
    formData.append('point', point);
    formData.append('locator', locator);
    images.forEach((image) => {
      formData.append('images', image);
    });
    onSubmit(formData);
  };

  return (
    <div>
      <h2>Add Map Point</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Longitude:
          <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
        </label>
        <label>
          Latitude:
          <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
        </label>
        <label>
          Point:
          <input type="text" value={point} onChange={(e) => setPoint(e.target.value)} />
        </label>
        <label>
          Locator:
          <input type="text" value={locator} onChange={(e) => setLocator(e.target.value)} />
        </label>
        <label>
          Images:
          <input type="file" accept="image/*" multiple onChange={(e) => setImages([...images, ...Array.from(e.target.files)])} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPoint;
