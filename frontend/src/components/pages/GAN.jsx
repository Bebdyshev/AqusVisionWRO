import React, { useState } from "react";
import './GAN.css';

function GanPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState({
    inputs: [],
    output: null
  });

  // Предопределенные наборы изображений для каждого файла
  const imageSetsByFile = {
    "1.tf": {
      inputs: [
        "/images/set1/input1.jpg",
        "/images/set1/input2.jpg",
        "/images/set1/input3.jpg",
        "/images/set1/input4.jpg",
        "/images/set1/input5.jpg"
      ],
      output: "/images/set1/output.jpg"
    },
    "2.tf": {
      inputs: [
        "/images/set2/input1.jpg",
        "/images/set2/input2.jpg",
        "/images/set2/input3.jpg",
        "/images/set2/input4.jpg",
        "/images/set2/input5.jpg"
      ],
      output: "/images/set2/output.jpg"
    },
    "3.tf": {
      inputs: [
        "/images/set3/input1.jpg",
        "/images/set3/input2.jpg",
        "/images/set3/input3.jpg",
        "/images/set3/input4.jpg",
        "/images/set3/input5.jpg"
      ],
      output: "/images/set3/output.jpg"
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    
    if (file) {
      // Проверяем, есть ли предопределенный набор для этого файла
      const imageSet = imageSetsByFile[file.name];
      if (imageSet) {
        setImages(imageSet);
      } else {
        // Если файл не найден в предопределенных наборах, очищаем изображения
        setImages({
          inputs: [],
          output: null
        });
        alert("Please upload one of the following files: 1.tf, 2.tf, or 3.tf");
      }
    }
  };

  return (
    <div className="gan-page">
      <div className="gan-container">
        <div className="upload-section">
          <h2>GAN Flood Prediction</h2>
          <p className="description">
            Upload a satellite .tf file to generate flood prediction visualizations using our GAN model.
            The model will analyze 5 input variations and generate the most likely flood scenario.
          </p>
          <div className="file-upload">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".tf"
              id="file-input"
              className="file-input"
            />
            <label htmlFor="file-input" className="file-label">
              <i className="fas fa-cloud-upload-alt"></i>
              <span>{selectedFile ? selectedFile.name : 'Choose a file (1.tf, 2.tf, 3.tf)'}</span>
            </label>
          </div>
        </div>

        {(images.inputs.length > 0 || images.output) && (
          <div className="results-section">
            <div className="input-images">
              <h3>Input Variations</h3>
              <div className="image-grid">
                {images.inputs.map((src, index) => (
                  <div key={index} className="image-container">
                    <img src={src} alt={`Input ${index + 1}`} />
                    <span className="image-label">Input {index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="output-image">
              <h3>Generated Prediction</h3>
              <div className="image-container output">
                <img src={images.output} alt="Generated Output" />
                <span className="image-label">Final Prediction</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GanPage;