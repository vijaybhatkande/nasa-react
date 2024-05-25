import React, { useState } from 'react';
import axios from 'axios';

interface ImageDetails {
  id: number;
  url: string;
  description: string;
}

const MainContent: React.FC = () => {
  const images = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    url: `/images/pic${i + 1}.jpg`, // Replace with actual image paths
  }));
  
  const [selectedImage, setSelectedImage] = useState<ImageDetails | null>(null);

  const handleImageClick = async (id: number) => {
    try {
      const response = await axios.get(`https://api.example.com/images/${id}`);
      setSelectedImage(response.data);
    } catch (error) {
      console.error('Error fetching image details:', error);
    }
  };

  const handleBackClick = () => {
    setSelectedImage(null);
  };

  return (
    <div className="main-content">
      {selectedImage ? (
        <div className="image-details">
          <button onClick={handleBackClick}>Back</button>
          <img src={selectedImage.url} alt="Selected" />
          <p>{selectedImage.description}</p>
        </div>
      ) : (
        <div className="image-grid">
          {images.map((image) => (
            <div key={image.id} className="image-container" onClick={() => handleImageClick(image.id)}>
              <img src={image.url} alt={`Placeholder ${image.id}`} />
            </div>
          ))}
          <div className="carousel-controls">
            <button className="carousel-button">&lt;</button>
            <button className="carousel-button">&gt;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
