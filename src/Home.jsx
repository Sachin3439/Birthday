import React, { useState } from 'react';
import './Home.css';

function Home() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleGenerateLink = () => {
    if (!name || !message || !image) return alert("Please fill all fields!");
    const birthdayData = { name, message, image };
    localStorage.setItem('birthdayData', JSON.stringify(birthdayData));
    const url = `${window.location.origin}/bh`;
    setGeneratedLink(url);
  };

  return (
    <div className="home-container">
      <h1 className="animated-heading">🎉 Create Birthday Page 🎉</h1>
      <input
        className="input-field"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="input-field textarea"
        placeholder="Enter Birthday Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        className="file-input"
        type="file"
        accept="image/*"
        onChange={handleImage}
      />
      {image && (
        <img src={image} alt="preview" className="image-preview" />
      )}
      <button className="generate-button" onClick={handleGenerateLink}>🎁 Generate Link</button>
      {generatedLink && (
        <div className="link-box">
          <p>🎉 Shareable Link:</p>
          <input className="link-input" value={generatedLink} readOnly />
        </div>
      )}
    </div>
  );
}

export default Home;
