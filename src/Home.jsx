import React, { useState } from 'react';
import './Home.css';

function Home() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400; // compressed width
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedImage = canvas.toDataURL('image/jpeg', 0.6);
        setImage(compressedImage);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateLink = () => {
    if (!name || !message || !image) return alert("Please fill all fields!");
    const randomId = Math.random().toString(36).substring(2, 10);
    const birthdayData = { name, message, image };
    localStorage.setItem(`birthdayData-${randomId}`, JSON.stringify(birthdayData));
    const url = `${window.location.origin}/bh/${randomId}`;
    setGeneratedLink(url);
  };

  return (
    <div className="home-container">
      <h1>🎉 Create Your Birthday Page 🎉</h1>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field"
      />
      <textarea
        placeholder="Enter Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="input-field textarea"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="file-input"
      />
      {image && <img src={image} alt="preview" className="image-preview" />}
      <button onClick={handleGenerateLink} className="generate-button">
        🎁 Generate Link
      </button>
      {generatedLink && (
        <div className="link-box">
          <p>✅ Share this link:</p>
          <input value={generatedLink} readOnly className="link-input" />
        </div>
      )}
    </div>
  );
}

export default Home;
