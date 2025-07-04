"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/_components/ui/card";
import { Button } from "@/_components/ui/button"; // adjust path if needed
import { Camera, Loader2 } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { processCarImageWithAI } from "@/app/api/analyze-car/route";
import { CarCard } from "./car-card";

const SearchCar = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedAiImage, setUploadedAiImage] = useState(null);
  const [isExtracted, setRequestedExtraction] = useState(false);

  const {
    loading: processImageLoading,
    fn: processImageFn,
    data: processImageResult,
    error: processImageError,
    reset: resetProcessImage,
  } = useFetch(processCarImageWithAI);

  const onAiDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setUploadedAiImage(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onAiDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    maxFiles: 1,
  });

  const processWithAI = async () => {
    if (!uploadedAiImage) {
      toast.error("Please upload an image first");
      return;
    }
    setRequestedExtraction(true);
    await processImageFn(uploadedAiImage);
  };


  return (
    <div className="mt-8">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Car Details Extraction</CardTitle>
          <CardDescription>
            Upload an image of a car and let Gemini AI extract its details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              {imagePreview ? (
                <div className="flex flex-col items-center">
                  <img
                    src={imagePreview}
                    alt="Car preview"
                    className="max-h-56 max-w-full object-contain mb-4"
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setImagePreview(null);
                        setUploadedAiImage(null);
                        setRequestedExtraction(false);
                        resetProcessImage();
                      }}
                    >
                      Remove
                    </Button>
                    <Button
                      onClick={processWithAI}
                      disabled={processImageLoading}
                      size="sm"
                    >
                      {processImageLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Camera className="mr-2 h-4 w-4" />
                          Extract Details
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className="cursor-pointer hover:bg-gray-50 transition"
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center">
                    <Camera className="h-12 w-12 text-gray-400 mb-3" />
                    <span className="text-sm text-gray-600">
                      Drag & drop or click to upload a car image
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      (JPG, PNG, WebP, max 5MB)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {isExtracted && processImageResult?.success && processImageResult.data && (
        <div className="mt-6">
        <CarCard
          car={{
            id: "temp", // a placeholder id since Gemini doesn't return one
            make: processImageResult.data.make,
            model: processImageResult.data.model,
            year: processImageResult.data.year,
            color: processImageResult.data.color,
            price: isNaN(parseInt(processImageResult.data.price)) ? "N/A" : parseInt(processImageResult.data.price),
            bodyType: processImageResult.data.bodyType,
            fuelType: processImageResult.data.fuelType,
            transmission: processImageResult.data.transmission,
            description: processImageResult.data.description,
          }}
        />
        <p className="text-xs text-gray-500 mt-2">
          AI confidence: {Math.round(processImageResult.data.confidence * 100)}%
        </p>
      </div>
      )}
      {isExtracted && processImageResult && processImageResult.success === false && (
        <div className="mt-4 text-red-500">
          Failed to parse details. Try again.
        </div>
      )}
    </div>
  );
};

export default SearchCar;
