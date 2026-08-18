import { useEffect, useRef, useState } from "react";
import JSZip from "jszip";
import "./App.css";

const Icon = ({ path, size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {path}
  </svg>
);

const Icons = {
  Image: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </>
  ),

  Sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </>
  ),

  Moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,

  Upload: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </>
  ),

  Plus: (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),

  Trash: (
    <>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </>
  ),

  Download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </>
  ),

  Zip: (
    <>
      <path d="M21 8v13H3V8" />
      <path d="M1 3h22v5H1z" />
      <path d="M10 12h4" />
    </>
  ),

  Check: <polyline points="20 6 9 17 4 12" />,

  RotateLeft: (
    <>
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </>
  ),

  RotateRight: (
    <>
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </>
  ),

  FlipH: (
    <>
      <path d="M3 12h18M12 3v18" />
      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" />
    </>
  ),

  FlipV: (
    <>
      <path d="M12 3v18M3 12h18" />
      <path d="M8 8l4-4 4 4M8 16l4 4 4-4" />
    </>
  ),

  Reset: (
    <>
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </>
  ),

  MoreVertical: (
    <>
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </>
  ),

  ArrowLeft: (
    <>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </>
  ),

  ArrowRight: (
    <>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 5" />
    </>
  ),

  Settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </>
  ),

  HandlingStretch: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 12h-2M22 12h-2M12 4V2M12 22v-2" />
    </>
  ),

  HandlingFill: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),

  HandlingFitWhite: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <rect x="7" y="7" width="10" height="10" rx="1" />
    </>
  ),

  HandlingFitBlack: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <rect
        x="7"
        y="7"
        width="10"
        height="10"
        rx="1"
        fill="currentColor"
      />
    </>
  ),

  HandlingFitBlur: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="12" cy="12" r="3" strokeDasharray="2 2" />
    </>
  )
};

function App() {
  const [images, setImages] = useState([]);
  const [results, setResults] = useState([]);
  const fileInputRef = useRef(null);

  const [resizeMode, setResizeMode] = useState("size");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [percentage, setPercentage] = useState(100);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [customRatioWidth, setCustomRatioWidth] = useState(16);
  const [customRatioHeight, setCustomRatioHeight] = useState(9);
  const [aspectHandling, setAspectHandling] = useState("fit-white");
  const [lockRatio, setLockRatio] = useState(true);
  const [format, setFormat] = useState("image/jpeg");
  const [quality, setQuality] = useState(90);

  const [rotation, setRotation] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [hasResized, setHasResized] = useState(false);
  const [selectedResults, setSelectedResults] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);

  const openFileSelector = () => fileInputRef.current?.click();

  const getImageDimensions = (file) =>
    new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();

      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight
        });

        URL.revokeObjectURL(url);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Could not read image"));
      };

      img.src = url;
    });

  const addImages = async (fileList) => {
    const files = Array.from(fileList || []).filter((file) =>
      file.type.startsWith("image/")
    );

    if (!files.length) {
      alert("Please select image files only.");
      return;
    }

    const newImages = [];

    for (const file of files) {
      try {
        const dimensions = await getImageDimensions(file);

        newImages.push({
          id:
            Date.now() +
            "-" +
            Math.random().toString(36).slice(2),

          file,
          name: file.name,
          url: URL.createObjectURL(file),
          width: dimensions.width,
          height: dimensions.height,
          size: file.size,
          type: file.type
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (!newImages.length) return;

    setImages((prev) => {
      if (prev.length === 0) {
        setWidth(newImages[0].width);
        setHeight(newImages[0].height);
      }

      return [...prev, ...newImages];
    });

    results.forEach((result) => {
      if (result.url) {
        URL.revokeObjectURL(result.url);
      }
    });

    setResults([]);
    setSelectedResults([]);
    setHasResized(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (event) => {
    addImages(event.target.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    addImages(event.dataTransfer.files);
  };

  const removeImage = (id) => {
    const image = images.find((item) => item.id === id);

    if (image?.url) {
      URL.revokeObjectURL(image.url);
    }

    setImages((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  /*
   * =========================================================
   * CLEAR ALL
   * =========================================================
   *
   * IMPORTANT:
   * This uses the browser's native confirmation dialog.
   * No React modal or CSS is required.
   */
  const clearAll = () => {
    if (!images.length && !results.length) {
      return;
    }

    const confirmed = window.confirm(
      "Clear all images?\n\n" +
        "This will remove all uploaded images and any resized results. " +
        "This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    images.forEach((image) => {
      if (image.url) {
        URL.revokeObjectURL(image.url);
      }
    });

    results.forEach((result) => {
      if (result.url) {
        URL.revokeObjectURL(result.url);
      }
    });

    setImages([]);
    setResults([]);
    setSelectedResults([]);

    setWidth("");
    setHeight("");

    setPercentage(100);

    setAspectRatio("16:9");
    setCustomRatioWidth(16);
    setCustomRatioHeight(9);
    setAspectHandling("fit-white");

    setResizeMode("size");

    setRotation(0);
    setFlipHorizontal(false);
    setFlipVertical(false);

    setLockRatio(true);

    setFormat("image/jpeg");
    setQuality(90);

    setHasResized(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const changeWidth = (value) => {
    setWidth(value);

    if (
      lockRatio &&
      images.length &&
      Number(value) > 0
    ) {
      const image = images[0];

      setHeight(
        Math.round(
          Number(value) *
            (image.height / image.width)
        )
      );
    }
  };

  const changeHeight = (value) => {
    setHeight(value);

    if (
      lockRatio &&
      images.length &&
      Number(value) > 0
    ) {
      const image = images[0];

      setWidth(
        Math.round(
          Number(value) *
            (image.width / image.height)
        )
      );
    }
  };

  const applyPreset = (
    presetWidth,
    presetHeight,
    lock = true
  ) => {
    if (!images.length) return;

    const original = images[0];

    let finalWidth =
      presetWidth || original.width;

    let finalHeight =
      presetHeight ||
      Math.round(
        finalWidth *
          (original.height / original.width)
      );

    setResizeMode("size");
    setWidth(finalWidth);
    setHeight(finalHeight);
    setLockRatio(lock);
  };

  const calculatePercentageDimensions = (image) => {
    const factor =
      Number(percentage) / 100;

    return {
      width: Math.max(
        1,
        Math.round(image.width * factor)
      ),
      height: Math.max(
        1,
        Math.round(image.height * factor)
      )
    };
  };

  const getRatioValues = () => {
    if (aspectRatio === "custom") {
      const rw = Number(customRatioWidth);
      const rh = Number(customRatioHeight);

      return {
        width: rw > 0 ? rw : 16,
        height: rh > 0 ? rh : 9
      };
    }

    const [rw, rh] =
      aspectRatio.split(":").map(Number);

    return {
      width: rw,
      height: rh
    };
  };

  const calculateAspectDimensions = (image) => {
    const ratio = getRatioValues();

    const targetRatio =
      ratio.width / ratio.height;

    const sourceRatio =
      image.width / image.height;

    let w;
    let h;

    if (sourceRatio >= targetRatio) {
      w = image.width;
      h = Math.round(
        w / targetRatio
      );
    } else {
      h = image.height;
      w = Math.round(
        h * targetRatio
      );
    }

    return {
      width: Math.max(1, w),
      height: Math.max(1, h)
    };
  };

  const getTargetDimensions = (image) => {
    if (resizeMode === "percentage") {
      return calculatePercentageDimensions(image);
    }

    if (resizeMode === "aspect") {
      return calculateAspectDimensions(image);
    }

    return {
      width: Math.max(
        1,
        Number(width) || 1
      ),
      height: Math.max(
        1,
        Number(height) || 1
      )
    };
  };

  const rotateLeft = () => {
    setRotation(
      (prev) => (prev - 90 + 360) % 360
    );
  };

  const rotateRight = () => {
    setRotation(
      (prev) => (prev + 90) % 360
    );
  };

  const toggleHorizontal = () => {
    setFlipHorizontal(
      (prev) => !prev
    );
  };

  const toggleVertical = () => {
    setFlipVertical(
      (prev) => !prev
    );
  };

  const getPreviewTransform = () => ({
    transform:
      `rotate(${rotation}deg) ` +
      `scaleX(${flipHorizontal ? -1 : 1}) ` +
      `scaleY(${flipVertical ? -1 : 1})`
  });

  const getPreviewStageStyle = (image) => {
    let w;
    let h;

    if (resizeMode === "aspect") {
      const ratio = getRatioValues();

      w = Math.max(
        1,
        ratio.width
      );

      h = Math.max(
        1,
        ratio.height
      );
    } else if (
      resizeMode === "percentage"
    ) {
      const dims =
        calculatePercentageDimensions(
          image
        );

      w = dims.width;
      h = dims.height;
    } else {
      w =
        Number(width) ||
        image.width;

      h =
        Number(height) ||
        image.height;
    }

    const normalized =
      ((rotation % 360) + 360) % 360;

    if (
      normalized === 90 ||
      normalized === 270
    ) {
      [w, h] = [h, w];
    }

    return {
      "--preview-ratio":
        `${Math.max(1, w)} / ` +
        `${Math.max(1, h)}`
    };
  };

  const resetSettings = () => {
    if (!images.length) return;

    const first = images[0];

    setResizeMode("size");

    setWidth(first.width);
    setHeight(first.height);

    setPercentage(100);

    setAspectRatio("16:9");
    setCustomRatioWidth(16);
    setCustomRatioHeight(9);
    setAspectHandling("fit-white");

    setLockRatio(true);

    setRotation(0);
    setFlipHorizontal(false);
    setFlipVertical(false);

    setFormat("image/jpeg");
    setQuality(90);

    results.forEach((result) => {
      if (result.url) {
        URL.revokeObjectURL(result.url);
      }
    });

    setResults([]);
    setSelectedResults([]);
    setHasResized(false);
  };

  const drawTransformedImage = (
    ctx,
    source,
    canvasWidth,
    canvasHeight,
    drawWidth,
    drawHeight
  ) => {
    ctx.save();

    ctx.translate(
      canvasWidth / 2,
      canvasHeight / 2
    );

    ctx.rotate(
      (rotation * Math.PI) / 180
    );

    ctx.scale(
      flipHorizontal ? -1 : 1,
      flipVertical ? -1 : 1
    );

    ctx.drawImage(
      source,
      -drawWidth / 2,
      -drawHeight / 2,
      drawWidth,
      drawHeight
    );

    ctx.restore();
  };

  const processImage = (image) =>
    new Promise((resolve, reject) => {
      const source = new Image();

      source.onload = () => {
        try {
          const target =
            getTargetDimensions(image);

          let canvasWidth =
            target.width;

          let canvasHeight =
            target.height;

          const normalizedRotation =
            ((rotation % 360) + 360) % 360;

          if (
            normalizedRotation === 90 ||
            normalizedRotation === 270
          ) {
            const temp = canvasWidth;

            canvasWidth =
              canvasHeight;

            canvasHeight =
              temp;
          }

          const canvas =
            document.createElement(
              "canvas"
            );

          canvas.width =
            canvasWidth;

          canvas.height =
            canvasHeight;

          const ctx =
            canvas.getContext(
              "2d"
            );

          if (!ctx) {
            reject(
              new Error(
                "Canvas unavailable"
              )
            );

            return;
          }

          ctx.imageSmoothingEnabled =
            true;

          ctx.imageSmoothingQuality =
            "high";

          if (
            format === "image/jpeg"
          ) {
            ctx.fillStyle =
              "#ffffff";

            ctx.fillRect(
              0,
              0,
              canvasWidth,
              canvasHeight
            );
          }

          const sourceWidth =
            source.naturalWidth;

          const sourceHeight =
            source.naturalHeight;

          if (
            resizeMode === "aspect"
          ) {
            const ratio =
              getRatioValues();

            const targetRatio =
              ratio.width /
              ratio.height;

            const sourceRatio =
              sourceWidth /
              sourceHeight;

            if (
              aspectHandling ===
              "fill"
            ) {
              let drawWidth;
              let drawHeight;

              if (
                sourceRatio >
                targetRatio
              ) {
                drawHeight =
                  target.height;

                drawWidth =
                  drawHeight *
                  sourceRatio;
              } else {
                drawWidth =
                  target.width;

                drawHeight =
                  drawWidth /
                  sourceRatio;
              }

              ctx.save();

              ctx.beginPath();

              ctx.rect(
                0,
                0,
                canvasWidth,
                canvasHeight
              );

              ctx.clip();

              drawTransformedImage(
                ctx,
                source,
                canvasWidth,
                canvasHeight,
                drawWidth,
                drawHeight
              );

              ctx.restore();
            } else if (
              aspectHandling ===
                "fit-white" ||
              aspectHandling ===
                "fit-black"
            ) {
              ctx.fillStyle =
                aspectHandling ===
                "fit-black"
                  ? "#000000"
                  : "#ffffff";

              ctx.fillRect(
                0,
                0,
                canvasWidth,
                canvasHeight
              );

              const scale =
                Math.min(
                  target.width /
                    sourceWidth,
                  target.height /
                    sourceHeight
                );

              drawTransformedImage(
                ctx,
                source,
                canvasWidth,
                canvasHeight,
                sourceWidth * scale,
                sourceHeight * scale
              );
            } else if (
              aspectHandling ===
              "fit-blur"
            ) {
              const bgScale =
                Math.max(
                  target.width /
                    sourceWidth,
                  target.height /
                    sourceHeight
                );

              const bgWidth =
                sourceWidth *
                bgScale;

              const bgHeight =
                sourceHeight *
                bgScale;

              ctx.save();

              ctx.filter =
                "blur(28px)";

              ctx.drawImage(
                source,
                (target.width -
                  bgWidth) /
                  2,
                (target.height -
                  bgHeight) /
                  2,
                bgWidth,
                bgHeight
              );

              ctx.restore();

              const scale =
                Math.min(
                  target.width /
                    sourceWidth,
                  target.height /
                    sourceHeight
                );

              drawTransformedImage(
                ctx,
                source,
                canvasWidth,
                canvasHeight,
                sourceWidth * scale,
                sourceHeight * scale
              );
            } else {
              drawTransformedImage(
                ctx,
                source,
                canvasWidth,
                canvasHeight,
                target.width,
                target.height
              );
            }
          } else {
            drawTransformedImage(
              ctx,
              source,
              canvasWidth,
              canvasHeight,
              target.width,
              target.height
            );
          }

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(
                  new Error(
                    "Could not create image"
                  )
                );

                return;
              }

              resolve({
                id:
                  image.id +
                  "-result",

                sourceId:
                  image.id,

                name:
                  image.name,

                blob,

                url:
                  URL.createObjectURL(
                    blob
                  ),

                width:
                  canvas.width,

                height:
                  canvas.height,

                format,

                size:
                  blob.size
              });
            },
            format,
            Number(quality) / 100
          );
        } catch (error) {
          reject(error);
        }
      };

      source.onerror = () => {
        reject(
          new Error(
            "Could not load image"
          )
        );
      };

      source.src = image.url;
    });

  const resizeAll = async () => {
    if (!images.length) {
      alert(
        "Please add at least one image."
      );

      return;
    }

    if (
      resizeMode === "size" &&
      (!Number(width) ||
        !Number(height))
    ) {
      alert(
        "Please enter valid width and height."
      );

      return;
    }

    if (
      resizeMode === "percentage" &&
      (!Number(percentage) ||
        Number(percentage) <= 0)
    ) {
      alert(
        "Please enter a valid percentage."
      );

      return;
    }

    setIsProcessing(true);

    results.forEach((result) => {
      if (result.url) {
        URL.revokeObjectURL(
          result.url
        );
      }
    });

    setResults([]);
    setSelectedResults([]);

    try {
      const processed = [];

      for (const image of images) {
        const result =
          await processImage(
            image
          );

        processed.push(result);
      }

      setResults(processed);

      setSelectedResults(
        processed.map(
          (result) => result.id
        )
      );

      setHasResized(true);
    } catch (error) {
      console.error(error);

      alert(
        "An error occurred while resizing."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const getExtension = () => {
    if (
      format ===
      "image/png"
    ) {
      return "png";
    }

    if (
      format ===
      "image/webp"
    ) {
      return "webp";
    }

    return "jpg";
  };

  const getDownloadName = (
    result
  ) =>
    result.name.replace(
      /\.[^/.]+$/,
      ""
    ) +
    "-resized." +
    getExtension();

  const formatFileSize = (
    bytes
  ) => {
    if (!bytes) {
      return "0 KB";
    }

    if (
      bytes <
      1024 * 1024
    ) {
      return (
        Math.max(
          1,
          Math.round(
            bytes / 1024
          )
        ) +
        " KB"
      );
    }

    return (
      (
        bytes /
        (1024 * 1024)
      ).toFixed(1) +
      " MB"
    );
  };

  const getFormatLabel = (
    result
  ) => {
    if (
      result.format ===
      "image/png"
    ) {
      return "PNG";
    }

    if (
      result.format ===
      "image/webp"
    ) {
      return "WEBP";
    }

    return "JPG";
  };

  const downloadOne = (
    result
  ) => {
    const link =
      document.createElement(
        "a"
      );

    link.href =
      result.url;

    link.download =
      getDownloadName(
        result
      );

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();
  };

  const downloadSeparately = (
    list
  ) => {
    list.forEach(
      (result, index) => {
        setTimeout(
          () =>
            downloadOne(
              result
            ),
          index * 400
        );
      }
    );
  };

  const createZip = async (
    list,
    fileName
  ) => {
    if (!list.length) return;

    const zip =
      new JSZip();

    list.forEach(
      (result) => {
        zip.file(
          getDownloadName(
            result
          ),
          result.blob
        );
      }
    );

    const blob =
      await zip.generateAsync(
        {
          type: "blob"
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;
    link.download =
      fileName;

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    setTimeout(
      () =>
        URL.revokeObjectURL(
          url
        ),
      1000
    );
  };

  const toggleResultSelection = (
    id
  ) => {
    setSelectedResults(
      (prev) =>
        prev.includes(id)
          ? prev.filter(
              (item) =>
                item !== id
            )
          : [...prev, id]
    );
  };

  const allSelected =
    results.length > 0 &&
    selectedResults.length ===
      results.length;

  const toggleSelectAll = () => {
    setSelectedResults(
      allSelected
        ? []
        : results.map(
            (result) =>
              result.id
          )
    );
  };

  const toggleMenu = (id) => {
    setOpenMenu(
      (prev) =>
        prev === id
          ? null
          : id
    );
  };

  const getPreviewDimensions = (
    image
  ) => {
    let w;
    let h;

    if (
      resizeMode ===
      "percentage"
    ) {
      const result =
        calculatePercentageDimensions(
          image
        );

      w = result.width;
      h = result.height;
    } else if (
      resizeMode ===
      "aspect"
    ) {
      const result =
        calculateAspectDimensions(
          image
        );

      w = result.width;
      h = result.height;
    } else {
      w =
        Number(width) || 0;

      h =
        Number(height) || 0;
    }

    const normalized =
      ((rotation % 360) +
        360) %
      360;

    if (
      normalized === 90 ||
      normalized === 270
    ) {
      [w, h] = [h, w];
    }

    return (
      `${w || "-"} × ` +
      `${h || "-"}`
    );
  };

  useEffect(() => {
    document.body.classList.toggle(
      "dark",
      darkMode
    );
  }, [darkMode]);

  const buildStageClassName = () => {
    let cls =
      `preview-stage mode-${resizeMode}`;

    if (
      resizeMode ===
      "aspect"
    ) {
      cls +=
        ` handling-${aspectHandling}`;
    }

    return cls;
  };

  return (
    <div className="app">
      <header className="top-header">
        <div className="brand">
          <div className="brand-icon">
            <Icon
              path={Icons.Image}
              size={20}
            />
          </div>

          <div>
            <div className="brand-name">
              PixelResizer
            </div>

            <div className="brand-subtitle">
              Fast • Private • Free
            </div>
          </div>
        </div>

        <button
          type="button"
          className="theme-toggle"
          onClick={() =>
            setDarkMode(
              (prev) => !prev
            )
          }
        >
          <Icon
            path={
              darkMode
                ? Icons.Sun
                : Icons.Moon
            }
            size={18}
          />
        </button>
      </header>

      {images.length === 0 && (
        <main className="empty-page">
          <div className="hero-badge">
            ⚡ Fast & Secure Image
            Processing
          </div>

          <h1>
            Resize Your Images
            Instantly
          </h1>

          <p>
            Change image dimensions
            online for free. Resize,
            convert, rotate and flip
            your images without
            uploading them to a server.
          </p>

          <section
            className={`upload-box ${
              isDragging
                ? "dragging"
                : ""
            }`}
            onDragOver={
              handleDragOver
            }
            onDragLeave={
              handleDragLeave
            }
            onDrop={handleDrop}
          >
            <div className="cloud-icon">
              <Icon
                path={Icons.Upload}
                size={28}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary upload-button"
              onClick={
                openFileSelector
              }
            >
              Browse Files
            </button>

            <p>
              or drop your images
              here
            </p>

            <span className="format-support">
              Supports: JPG • PNG •
              WEBP • GIF • BMP
            </span>
          </section>
        </main>
      )}

      {images.length > 0 &&
        !hasResized && (
          <main className="editor">
            <div className="toolbar">
              <div className="toolbar-left">
                <span className="file-count">
                  {images.length}{" "}
                  {images.length === 1
                    ? "FILE"
                    : "FILES"}
                </span>

                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={
                    openFileSelector
                  }
                >
                  <Icon
                    path={Icons.Plus}
                    size={16}
                  />
                  Add
                </button>

                <button
                  type="button"
                  className="btn btn-ghost danger"
                  onClick={clearAll}
                >
                  <Icon
                    path={Icons.Trash}
                    size={16}
                  />
                  Clear
                </button>
              </div>

              <div className="toolbar-right">
                <Icon
                  path={Icons.Settings}
                  size={14}
                />
                Ready to process
              </div>
            </div>

            <div className="editor-layout">
              <aside className="settings-panel">
                <div className="settings-content">
                  <h2>
                    Resize Settings
                  </h2>

                  <div className="tabs">
                    <button
                      type="button"
                      className={
                        resizeMode ===
                        "size"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setResizeMode(
                          "size"
                        )
                      }
                    >
                      By Size
                    </button>

                    <button
                      type="button"
                      className={
                        resizeMode ===
                        "percentage"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setResizeMode(
                          "percentage"
                        )
                      }
                    >
                      Percentage
                    </button>

                    <button
                      type="button"
                      className={
                        resizeMode ===
                        "aspect"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setResizeMode(
                          "aspect"
                        )
                      }
                    >
                      Aspect Ratio
                    </button>
                  </div>

                  {resizeMode ===
                    "size" && (
                    <div className="dimensions">
                      <div className="dimension-row">
                        <div>
                          <label>
                            Width
                          </label>

                          <div className="input-with-unit">
                            <input
                              type="number"
                              min="1"
                              value={
                                width
                              }
                              onChange={(
                                e
                              ) =>
                                changeWidth(
                                  e
                                    .target
                                    .value
                                )
                              }
                            />

                            <span>
                              px
                            </span>
                          </div>
                        </div>

                        <div>
                          <label>
                            Height
                          </label>

                          <div className="input-with-unit">
                            <input
                              type="number"
                              min="1"
                              value={
                                height
                              }
                              onChange={(
                                e
                              ) =>
                                changeHeight(
                                  e
                                    .target
                                    .value
                                )
                              }
                            />

                            <span>
                              px
                            </span>
                          </div>
                        </div>
                      </div>

                      <label className="lock-aspect">
                        <input
                          type="checkbox"
                          checked={
                            lockRatio
                          }
                          onChange={(
                            e
                          ) =>
                            setLockRatio(
                              e.target
                                .checked
                            )
                          }
                        />

                        Lock Aspect
                        Ratio
                      </label>

                      <div className="settings-label">
                        Quick
                        Presets
                      </div>

                      <div className="preset-buttons">
                        <button
                          type="button"
                          onClick={() =>
                            applyPreset()
                          }
                        >
                          Original
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            applyPreset(
                              1620,
                              2880,
                              false
                            )
                          }
                        >
                          1620 ×
                          2880
                        </button>
                      </div>
                    </div>
                  )}

                  {resizeMode ===
                    "percentage" && (
                    <div className="resize-mode-content">
                      <div className="percentage-card">
                        <div className="percentage-header">
                          <div>
                            <label>
                              Resize
                              Percentage
                            </label>

                            <p>
                              Scale every
                              uploaded
                              image
                              proportionally.
                            </p>
                          </div>

                          <strong>
                            {
                              percentage
                            }
                            %
                          </strong>
                        </div>

                        <input
                          className="percentage-input"
                          type="number"
                          min="1"
                          max="1000"
                          value={
                            percentage
                          }
                          onChange={(
                            e
                          ) =>
                            setPercentage(
                              Math.max(
                                1,
                                Math.min(
                                  1000,
                                  Number(
                                    e
                                      .target
                                      .value
                                  ) || 1
                                )
                              )
                            )
                          }
                        />

                        <input
                          type="range"
                          min="1"
                          max="300"
                          value={Math.min(
                            percentage,
                            300
                          )}
                          onChange={(
                            e
                          ) =>
                            setPercentage(
                              Number(
                                e
                                  .target
                                  .value
                              )
                            )
                          }
                        />

                        <div className="percentage-presets">
                          {[
                            25,
                            50,
                            75,
                            100,
                            125,
                            150,
                            200
                          ].map(
                            (
                              value
                            ) => (
                              <button
                                type="button"
                                key={
                                  value
                                }
                                className={
                                  percentage ===
                                  value
                                    ? "selected"
                                    : ""
                                }
                                onClick={() =>
                                  setPercentage(
                                    value
                                  )
                                }
                              >
                                {
                                  value
                                }
                                %
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {resizeMode ===
                    "aspect" && (
                    <div className="resize-mode-content">
                      <div className="settings-label">
                        Aspect Ratio
                      </div>

                      <div className="aspect-grid">
                        {[
                          "1:1",
                          "4:3",
                          "3:4",
                          "3:2",
                          "2:3",
                          "16:9",
                          "9:16",
                          "21:9",
                          "9:21"
                        ].map(
                          (
                            ratio
                          ) => (
                            <button
                              type="button"
                              key={
                                ratio
                              }
                              className={
                                aspectRatio ===
                                ratio
                                  ? "selected"
                                  : ""
                              }
                              onClick={() =>
                                setAspectRatio(
                                  ratio
                                )
                              }
                            >
                              {
                                ratio
                              }
                            </button>
                          )
                        )}

                        <button
                          type="button"
                          className={
                            aspectRatio ===
                            "custom"
                              ? "selected"
                              : ""
                          }
                          onClick={() =>
                            setAspectRatio(
                              "custom"
                            )
                          }
                        >
                          Custom
                        </button>
                      </div>

                      {aspectRatio ===
                        "custom" && (
                        <div className="custom-ratio-row">
                          <div>
                            <label>
                              Width
                            </label>

                            <input
                              type="number"
                              min="1"
                              value={
                                customRatioWidth
                              }
                              onChange={(
                                e
                              ) =>
                                setCustomRatioWidth(
                                  Number(
                                    e
                                      .target
                                      .value
                                  ) || 1
                                )
                              }
                            />
                          </div>

                          <span>
                            :
                          </span>

                          <div>
                            <label>
                              Height
                            </label>

                            <input
                              type="number"
                              min="1"
                              value={
                                customRatioHeight
                              }
                              onChange={(
                                e
                              ) =>
                                setCustomRatioHeight(
                                  Number(
                                    e
                                      .target
                                      .value
                                  ) || 1
                                )
                              }
                            />
                          </div>
                        </div>
                      )}

                      <div className="settings-label">
                        Image
                        Handling
                      </div>

                      <div className="handling-cards">
                        {[
                          {
                            value:
                              "stretch",
                            label:
                              "Stretch",
                            icon:
                              Icons.HandlingStretch
                          },
                          {
                            value:
                              "fill",
                            label:
                              "Fill",
                            icon:
                              Icons.HandlingFill
                          },
                          {
                            value:
                              "fit-white",
                            label:
                              "Fit White",
                            icon:
                              Icons.HandlingFitWhite
                          },
                          {
                            value:
                              "fit-black",
                            label:
                              "Fit Black",
                            icon:
                              Icons.HandlingFitBlack
                          },
                          {
                            value:
                              "fit-blur",
                            label:
                              "Fit Blur",
                            icon:
                              Icons.HandlingFitBlur
                          }
                        ].map(
                          ({
                            value,
                            label,
                            icon
                          }) => (
                            <button
                              type="button"
                              key={
                                value
                              }
                              className={`handling-card ${
                                aspectHandling ===
                                value
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                setAspectHandling(
                                  value
                                )
                              }
                            >
                              <Icon
                                path={
                                  icon
                                }
                                size={
                                  20
                                }
                              />

                              <span>
                                {
                                  label
                                }
                              </span>
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  <div className="settings-section">
                    <h3>
                      Transform
                    </h3>

                    <div className="transform-grid">
                      <button
                        type="button"
                        className={
                          rotation ===
                          270
                            ? "selected"
                            : ""
                        }
                        onClick={
                          rotateLeft
                        }
                        title="Rotate Left"
                      >
                        <Icon
                          path={
                            Icons.RotateLeft
                          }
                          size={16}
                        />
                      </button>

                      <button
                        type="button"
                        className={
                          rotation ===
                          90
                            ? "selected"
                            : ""
                        }
                        onClick={
                          rotateRight
                        }
                        title="Rotate Right"
                      >
                        <Icon
                          path={
                            Icons.RotateRight
                          }
                          size={16}
                        />
                      </button>

                      <button
                        type="button"
                        className={
                          flipHorizontal
                            ? "selected"
                            : ""
                        }
                        onClick={
                          toggleHorizontal
                        }
                        title="Flip Horizontal"
                      >
                        <Icon
                          path={
                            Icons.FlipH
                          }
                          size={16}
                        />
                      </button>

                      <button
                        type="button"
                        className={
                          flipVertical
                            ? "selected"
                            : ""
                        }
                        onClick={
                          toggleVertical
                        }
                        title="Flip Vertical"
                      >
                        <Icon
                          path={
                            Icons.FlipV
                          }
                          size={16}
                        />
                      </button>
                    </div>

                    <div className="transform-status">
                      <span>
                        Rotation:
                      </span>

                      <strong>
                        {rotation}°
                      </strong>

                      <span>
                        H:
                      </span>

                      <strong>
                        {flipHorizontal
                          ? "On"
                          : "Off"}
                      </strong>

                      <span>
                        V:
                      </span>

                      <strong>
                        {flipVertical
                          ? "On"
                          : "Off"}
                      </strong>
                    </div>
                  </div>

                  <div className="settings-section">
                    <h3>
                      Output Format
                    </h3>

                    <div className="format-buttons">
                      {[
                        [
                          "image/jpeg",
                          "JPG"
                        ],
                        [
                          "image/png",
                          "PNG"
                        ],
                        [
                          "image/webp",
                          "WebP"
                        ]
                      ].map(
                        ([
                          value,
                          label
                        ]) => (
                          <button
                            type="button"
                            key={
                              value
                            }
                            className={
                              format ===
                              value
                                ? "selected"
                                : ""
                            }
                            onClick={() =>
                              setFormat(
                                value
                              )
                            }
                          >
                            {
                              label
                            }
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div className="settings-section">
                    <div className="quality-title">
                      <h3>
                        Quality
                      </h3>

                      <span>
                        {quality}%
                      </span>
                    </div>

                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={quality}
                      onChange={(
                        e
                      ) =>
                        setQuality(
                          Number(
                            e
                              .target
                              .value
                          )
                        )
                      }
                    />

                    <div className="quality-labels">
                      <span>
                        Smaller file
                      </span>

                      <span>
                        Higher
                        quality
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline reset-button"
                    onClick={
                      resetSettings
                    }
                  >
                    Reset Settings
                  </button>
                </div>

                <div className="sidebar-footer">
                  <button
                    type="button"
                    className="btn btn-primary resize-button"
                    disabled={
                      isProcessing
                    }
                    onClick={
                      resizeAll
                    }
                  >
                    {isProcessing
                      ? "Processing..."
                      : "Resize All Images"}

                    {!isProcessing && (
                      <Icon
                        path={
                          Icons.ArrowRight
                        }
                        size={18}
                      />
                    )}
                  </button>
                </div>
              </aside>

              <section className="images-area">
                <div
                  className={`image-grid ${
                    isDragging
                      ? "dragging"
                      : ""
                  }`}
                  onDragOver={
                    handleDragOver
                  }
                  onDragLeave={
                    handleDragLeave
                  }
                  onDrop={handleDrop}
                >
                  {images.map(
                    (image) => (
                      <article
                        className="image-card"
                        key={
                          image.id
                        }
                      >
                        <div className="image-card-tools">
                          <button
                            type="button"
                            onClick={() =>
                              removeImage(
                                image.id
                              )
                            }
                          >
                            <Icon
                              path={
                                Icons.Trash
                              }
                              size={14}
                            />
                          </button>
                        </div>

                        <div className="image-card-preview">
                          <div
                            className={buildStageClassName()}
                            style={getPreviewStageStyle(
                              image
                            )}
                          >
                            {resizeMode ===
                              "aspect" &&
                              aspectHandling ===
                                "fit-blur" && (
                                <img
                                  src={
                                    image.url
                                  }
                                  alt=""
                                  className="preview-blur-background"
                                  aria-hidden="true"
                                />
                              )}

                            <img
                              src={
                                image.url
                              }
                              alt={
                                image.name
                              }
                              className="preview-main-image"
                              style={getPreviewTransform()}
                            />
                          </div>
                        </div>

                        <div className="image-card-info">
                          <div
                            className="image-name"
                            title={
                              image.name
                            }
                          >
                            {
                              image.name
                            }
                          </div>

                          <div className="image-dimensions">
                            <span>
                              {
                                image.width
                              }{" "}
                              ×{" "}
                              {
                                image.height
                              }
                            </span>

                            <Icon
                              path={
                                Icons.ArrowRight
                              }
                              size={12}
                            />

                            <span className="new-dimensions">
                              {getPreviewDimensions(
                                image
                              )}
                            </span>
                          </div>
                        </div>
                      </article>
                    )
                  )}

                  <button
                    type="button"
                    className="add-card"
                    onClick={
                      openFileSelector
                    }
                  >
                    <span>
                      <Icon
                        path={
                          Icons.Plus
                        }
                        size={24}
                      />
                    </span>

                    <strong>
                      Add Images
                    </strong>

                    <small>
                      JPG • PNG •
                      WEBP
                    </small>
                  </button>
                </div>
              </section>
            </div>
          </main>
        )}

      {hasResized &&
        results.length > 0 && (
          <main className="results-only-page">
            <section className="download-header">
              <div className="download-header-left">
                <button
                  type="button"
                  className="select-all-button"
                  onClick={
                    toggleSelectAll
                  }
                >
                  <span
                    className={`select-checkbox ${
                      allSelected
                        ? "checked"
                        : ""
                    }`}
                  >
                    {allSelected && (
                      <Icon
                        path={
                          Icons.Check
                        }
                        size={12}
                      />
                    )}
                  </span>

                  {allSelected
                    ? "Deselect All"
                    : "Select All"}
                </button>

                <span className="selected-count">
                  {
                    selectedResults.length
                  }{" "}
                  selected
                </span>
              </div>

              <div className="download-header-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() =>
                    createZip(
                      results,
                      "resized-images.zip"
                    )
                  }
                >
                  <Icon
                    path={Icons.Zip}
                    size={16}
                  />

                  Download All as
                  ZIP file
                </button>

                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() =>
                    downloadSeparately(
                      results
                    )
                  }
                >
                  <Icon
                    path={
                      Icons.Download
                    }
                    size={16}
                  />

                  Download All
                  Separately
                </button>
              </div>
            </section>

            {selectedResults.length >
              0 && (
              <section className="selected-download-bar">
                <span>
                  {
                    selectedResults.length
                  }{" "}
                  selected
                </span>

                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    createZip(
                      results.filter(
                        (
                          result
                        ) =>
                          selectedResults.includes(
                            result.id
                          )
                      ),
                      "selected-resized.zip"
                    )
                  }
                >
                  <Icon
                    path={
                      Icons.Zip
                    }
                    size={14}
                  />

                  Download
                  Selected ZIP
                </button>
              </section>
            )}

            <section className="download-list">
              <div className="download-list-header">
                <div>
                  NAME
                </div>

                <div>
                  SIZE
                </div>

                <div>
                  TYPE
                </div>

                <div>
                  STATUS
                </div>

                <div></div>
              </div>

              <div className="download-list-body">
                {results.map(
                  (result) => {
                    const selected =
                      selectedResults.includes(
                        result.id
                      );

                    return (
                      <div
                        className={`download-file-row ${
                          selected
                            ? "selected"
                            : ""
                        }`}
                        key={
                          result.id
                        }
                      >
                        <div className="download-name">
                          <button
                            type="button"
                            className={`file-select-checkbox ${
                              selected
                                ? "checked"
                                : ""
                            }`}
                            onClick={() =>
                              toggleResultSelection(
                                result.id
                              )
                            }
                          >
                            {selected && (
                              <Icon
                                path={
                                  Icons.Check
                                }
                                size={
                                  12
                                }
                              />
                            )}
                          </button>

                          <div className="download-thumbnail">
                            <img
                              src={
                                result.url
                              }
                              alt={
                                result.name
                              }
                            />
                          </div>

                          <div
                            className="download-file-name"
                            title={
                              result.name
                            }
                          >
                            {
                              result.name
                            }
                          </div>
                        </div>

                        <div className="download-size">
                          {formatFileSize(
                            result.size
                          )}
                        </div>

                        <div className="download-type">
                          <span>
                            {getFormatLabel(
                              result
                            )}
                          </span>
                        </div>

                        <div className="download-status">
                          <span className="badge-success">
                            <Icon
                              path={
                                Icons.Check
                              }
                              size={
                                12
                              }
                            />
                          </span>
                        </div>

                        <div className="download-row-actions">
                          <button
                            type="button"
                            className="btn btn-primary btn-icon"
                            onClick={() =>
                              downloadOne(
                                result
                              )
                            }
                          >
                            <Icon
                              path={
                                Icons.Download
                              }
                              size={
                                16
                              }
                            />
                          </button>

                          <div className="more-menu-wrapper">
                            <button
                              type="button"
                              className="btn btn-ghost btn-icon"
                              onClick={() =>
                                toggleMenu(
                                  result.id
                                )
                              }
                            >
                              <Icon
                                path={
                                  Icons.MoreVertical
                                }
                                size={
                                  16
                                }
                              />
                            </button>

                            {openMenu ===
                              result.id && (
                              <div className="more-menu">
                                <button
                                  type="button"
                                  onClick={() => {
                                    downloadOne(
                                      result
                                    );

                                    setOpenMenu(
                                      null
                                    );
                                  }}
                                >
                                  Download
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    toggleResultSelection(
                                      result.id
                                    );

                                    setOpenMenu(
                                      null
                                    );
                                  }}
                                >
                                  {selected
                                    ? "Deselect"
                                    : "Select"}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </section>

            <div className="results-bottom">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() =>
                  setHasResized(
                    false
                  )
                }
              >
                <Icon
                  path={
                    Icons.ArrowLeft
                  }
                  size={16}
                />

                Edit Settings
              </button>

              <button
                type="button"
                className="btn btn-outline danger"
                onClick={
                  clearAll
                }
              >
                Start New Batch
              </button>
            </div>
          </main>
        )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={
          handleFileChange
        }
        className="hidden-file-input"
      />
    </div>
  );
}

export default App;