import { useRef, useState } from "react";

function UploadBox({ onImageUpload }) {

  const inputRef = useRef(null);

  const [dragging, setDragging] = useState(false);


  const handleFiles = (files) => {

    if (!files || files.length === 0) {
      return;
    }

    const selectedFile = files[0];

    if (!selectedFile.type.startsWith("image/")) {

      alert("Please select a valid image file.");

      return;
    }

    onImageUpload(selectedFile);
  };


  const handleDrop = (event) => {

    event.preventDefault();

    setDragging(false);

    handleFiles(event.dataTransfer.files);
  };


  return (
    <div
      className={`upload-box ${
        dragging ? "dragging" : ""
      }`}

      onDragOver={(event) => {

        event.preventDefault();

        setDragging(true);

      }}

      onDragLeave={() => {

        setDragging(false);

      }}

      onDrop={handleDrop}
    >

      <div className="upload-icon">
        ☁️
      </div>


      <h2>
        Drag & Drop your image here
      </h2>


      <p>
        or choose an image from your computer
      </p>


      <button
        className="browse-button"
        onClick={() => inputRef.current.click()}
      >
        📁 Browse Image
      </button>


      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) =>
          handleFiles(event.target.files)
        }
      />


      <div className="supported-formats">
        JPG • PNG • WebP • GIF • BMP
      </div>

    </div>
  );
}

export default UploadBox;