"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Camera, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const HomeSearch = () => {
  // stores text input value
  const [searchTerm, setSearchTerm] = useState("");
  // toggles whether image search UI is shown 
  const [isImageSearchActive, setIsImageSearchActive] = useState(false);
  // preview of uploaded image
  const [imagePreview, setImagePreview] = useState("");
  // hold actual image
  const [searchImage, setSearchImage] = useState(null);
  // flags when image is uploaded
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter()

  // stops page from reloading when submit
  const handleTextOnSubmit = async(e) => {
    e.preventDefault();
    // if no text
    if(!searchTerm.trim()){
      toast.error("Please enter a search term");
      return;
    }
    // if text is provided go to given searchTerm
    router.push(`/cars?search=${encodeURIComponent(searchTerm)}`);
  };

  // stops the page from reloading if image uploaded
  const handleImageSearch = async(e) => {
    e.preventDefault();
    if(!searchImage){
      toast.error("Please upload image first");
      return;
    }

    // add ai logic
  };

  const onDrop =
    (acceptedFiles) => {
      // Do something with the files
      const file = acceptedFiles[0];
      if(file){
        if(file.size > 5 * 1024 * 1024){
          toast.error("Image size must be less than 5MB");
          return;
        }
      }
      setIsUploading(true);
      setSearchImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setIsUploading(false);
        toast.success("Image uploaded successfully!");
      }

      reader.onerror = () => {
        setIsUploading(false);
        toast.error("Failed to read the image")
      };

      reader.readAsDataURL(file);
    };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
    });

  return (
    <div>
      {/* LOOOOOOOK */}
      <form onSubmit={handleTextOnSubmit}>
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Please enter make, model, or use AI Image Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-12 py-6 w-full rounded-full border-gray-300 bg-white/95 background-blur-sm"
          />
          <div className="absolute right-[100px]">
            <Camera
              size={35}
              onClick={() => setIsImageSearchActive(!isImageSearchActive)}
              className="cursor-pointer rounded-xl p-1.5"
              style={{
                background: isImageSearchActive ? "black" : "",
                color: isImageSearchActive ? "white" : "",
              }}
            />
          </div>
          <Button type="submit" className="absolute right-2 rounded-full">
            Submit
          </Button>
        </div>
      </form>
      {isImageSearchActive && (
        <div className="mt-4">
          <form onSubmit={handleImageSearch}>
            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6 text-center">
              <div>
                {imagePreview ? (
                  <div className="flex flex-col items-center">
                    <img 
                    src={imagePreview}
                    alt="Car preview"
                    className="h-40 object-contain mb-4"
                    />
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSearchImage(null);
                        setImagePreview("");
                        toast.info("Image removed");
                      }}
                      >
                        Remove Image
                      </Button>
                  </div>
                ) : (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} className="cursor-pointer"/>
                    <div className="flex flex-col items-center">
                      <Upload className="h-12 w-12 text-gray mb-2" />
                      <p className="text-gray-500 mb-2">
                        {isDragActive && !isDragReject
                          ? "Leave the file here to upload"
                          : "Drag & drop a car image or click to select"}
                      </p>
                      {isDragReject && (
                        <p className="text-red-500 mb-2">Invalid image type</p>
                      )}
                      <p className="text-gray-400 text-sm">
                        Supports: JPG, PNG (max 5MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {imagePreview && (
            <Button
              type="submit"
              className="mt-2 w-full"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Search with this Image"}
              </Button>)}
          </form>
        </div>
      )}
    </div>
  );
};

export default HomeSearch;
