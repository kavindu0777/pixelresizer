function ImageTools({
  rotation,
  setRotation,
  flipHorizontal,
  setFlipHorizontal,
  flipVertical,
  setFlipVertical,
  cropEnabled,
  setCropEnabled,
  cropX,
  setCropX,
  cropY,
  setCropY,
  cropWidth,
  setCropWidth,
  cropHeight,
  setCropHeight,
  originalWidth,
  originalHeight
}) {
  const rotateLeft = () => {
    setRotation((rotation - 90 + 360) % 360);
  };

  const rotateRight = () => {
    setRotation((rotation + 90) % 360);
  };

  const resetTools = () => {
    setRotation(0);
    setFlipHorizontal(false);
    setFlipVertical(false);
    setCropEnabled(false);

    setCropX(0);
    setCropY(0);
    setCropWidth(originalWidth);
    setCropHeight(originalHeight);
  };

  return (
    <div className="image-tools">

      <div className="tools-title">
        <h2>Image Tools</h2>

        <button
          className="reset-tools"
          onClick={resetTools}
        >
          Reset
        </button>
      </div>


      {/* ROTATE */}

      <div className="tool-section">

        <h3>🔄 Rotate</h3>

        <div className="tool-buttons">

          <button onClick={rotateLeft}>
            ↶ Rotate Left
          </button>

          <button onClick={rotateRight}>
            ↷ Rotate Right
          </button>

        </div>

        <div className="rotation-value">
          Rotation: {rotation}°
        </div>

      </div>


      {/* FLIP */}

      <div className="tool-section">

        <h3>↔️ Flip</h3>

        <div className="tool-buttons">

          <button
            className={
              flipHorizontal
                ? "tool-active"
                : ""
            }
            onClick={() =>
              setFlipHorizontal(
                !flipHorizontal
              )
            }
          >
            ↔ Horizontal
          </button>


          <button
            className={
              flipVertical
                ? "tool-active"
                : ""
            }
            onClick={() =>
              setFlipVertical(
                !flipVertical
              )
            }
          >
            ↕ Vertical
          </button>

        </div>

      </div>


      {/* CROP */}

      <div className="tool-section">

        <div className="crop-heading">

          <h3>✂️ Crop</h3>

          <label className="crop-toggle">

            <input
              type="checkbox"
              checked={cropEnabled}
              onChange={(event) =>
                setCropEnabled(
                  event.target.checked
                )
              }
            />

            Enable Crop

          </label>

        </div>


        {cropEnabled && (

          <div className="crop-settings">

            <div className="crop-row">

              <div>

                <label>
                  X Position
                </label>

                <input
                  type="number"
                  min="0"
                  max={originalWidth}
                  value={cropX}
                  onChange={(event) =>
                    setCropX(
                      Number(event.target.value)
                    )
                  }
                />

              </div>


              <div>

                <label>
                  Y Position
                </label>

                <input
                  type="number"
                  min="0"
                  max={originalHeight}
                  value={cropY}
                  onChange={(event) =>
                    setCropY(
                      Number(event.target.value)
                    )
                  }
                />

              </div>

            </div>


            <div className="crop-row">

              <div>

                <label>
                  Crop Width
                </label>

                <input
                  type="number"
                  min="1"
                  max={originalWidth}
                  value={cropWidth}
                  onChange={(event) =>
                    setCropWidth(
                      Number(event.target.value)
                    )
                  }
                />

              </div>


              <div>

                <label>
                  Crop Height
                </label>

                <input
                  type="number"
                  min="1"
                  max={originalHeight}
                  value={cropHeight}
                  onChange={(event) =>
                    setCropHeight(
                      Number(event.target.value)
                    )
                  }
                />

              </div>

            </div>


            <div className="crop-presets">

              <button
                onClick={() => {
                  setCropX(0);
                  setCropY(0);
                  setCropWidth(
                    Math.min(
                      originalWidth,
                      originalHeight
                    )
                  );
                  setCropHeight(
                    Math.min(
                      originalWidth,
                      originalHeight
                    )
                  );
                }}
              >
                Square
              </button>


              <button
                onClick={() => {
                  setCropX(0);
                  setCropY(0);
                  setCropWidth(
                    Math.min(
                      originalWidth,
                      1920
                    )
                  );
                  setCropHeight(
                    Math.min(
                      originalHeight,
                      1080
                    )
                  );
                }}
              >
                16:9
              </button>


              <button
                onClick={() => {
                  setCropX(0);
                  setCropY(0);
                  setCropWidth(
                    Math.min(
                      originalWidth,
                      1080
                    )
                  );
                  setCropHeight(
                    Math.min(
                      originalHeight,
                      1350
                    )
                  );
                }}
              >
                4:5
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default ImageTools;