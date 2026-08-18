function ResultPreview({
  result,
  format,
  onDownload
}) {

  if (!result) {
    return null;
  }


  const extension =
    format === "image/png"
      ? "PNG"
      : format === "image/webp"
      ? "WebP"
      : "JPG";


  const fileSize =
    (
      result.blob.size /
      1024 /
      1024
    ).toFixed(2);


  return (
    <section className="result-section">

      <div className="result-header">

        <div>

          <h2>
            Your Resized Image
          </h2>

          <p>
            Your edited image is ready
          </p>

        </div>


        <span className="success">
          ✓ Complete
        </span>

      </div>


      <div className="comparison">

        <div className="comparison-card">

          <div className="comparison-label">
            Result
          </div>

          <div className="comparison-info">
            {result.width} ×{" "}
            {result.height}
          </div>

        </div>


        <div className="arrow">
          →
        </div>


        <div className="comparison-card">

          <div className="comparison-label">
            Format
          </div>

          <div className="comparison-info">
            {extension}
          </div>

        </div>

      </div>


      <div className="result-preview">

        <img
          src={result.url}
          alt="Resized result"
        />

      </div>


      <div className="result-details">

        <div>

          <span>
            Dimensions
          </span>

          <strong>
            {result.width} ×{" "}
            {result.height}px
          </strong>

        </div>


        <div>

          <span>
            Format
          </span>

          <strong>
            {extension}
          </strong>

        </div>


        <div>

          <span>
            File Size
          </span>

          <strong>
            {fileSize} MB
          </strong>

        </div>

      </div>


      <button
        className="download-button"
        onClick={onDownload}
      >
        ⬇️ Download {extension}
      </button>

    </section>
  );
}

export default ResultPreview;