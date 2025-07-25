import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  const handleImageFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
      setUploadedImageUrl(""); // Clear previous
    }
  };

  const handleDragOver = (event) => event.preventDefault();

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
      setUploadedImageUrl("");
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setUploadedImageUrl("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const uploadImageToCloudinary = async () => {
    try {
      setImageLoadingState(true);
      const formData = new FormData();
      formData.append("my_file", imageFile);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/products/upload-image`,
        formData
      );

      if (response?.data?.success) {
        setUploadedImageUrl(response.data.result.url);
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
    } finally {
      setImageLoadingState(false);
    }
  };

  useEffect(() => {
    if (imageFile) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-4 relative ${
          isEditMode ? "opacity-60 pointer-events-none" : ""
        }`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />

        {!imageFile && !uploadedImageUrl && (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span className="text-sm">Drag & drop or click to upload image</span>
          </Label>
        )}

        {imageLoadingState && (
          <div className="flex items-center justify-center h-10">
            <Skeleton className="w-full h-10 bg-gray-100" />
          </div>
        )}

        {imageFile && !imageLoadingState && (
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <FileIcon className="w-6 h-6 text-primary mr-2" />
              <p className="text-sm truncate">{imageFile.name}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}

        {uploadedImageUrl && !imageFile && (
          <div className="mt-4">
            <img
              src={uploadedImageUrl}
              alt="Uploaded Preview"
              className="w-full h-40 object-cover rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;

