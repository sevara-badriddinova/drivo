"use client";


import { Card, CardContent } from "./ui/card";

export const CarCard = ({ car }) => {
    return (
      <Card className="text-gray-800 p-4 w-sm mx-auto rounded-lg">
        <CardContent className="space-y-2">
          <div className="text-center text-l">
            Make: {car.make}
          </div>
          <div className="text-center text-md">
            Model: {car.model}
          </div>
          <div className="text-center text-md">
            Color: {car.color}
          </div>
          <div className="text-center text-md">
            Year: {car.year}
          </div>
          <div className="text-center text-md">
            Body Type: {car.bodyType}
          </div>
          <div className="text-center text-md">
            Fuel Type: {car.fuelType}
          </div>
          <div className="text-center text-md">
            Transmission: {car.transmission}
          </div>
          <div className="text-center text-md">
            Estimated Price: {car.price === "N/A" ? "N/A" : `$${car.price}`}
          </div>
          <div className="text-center text-md mt-2">
            Description: {car.description}
          </div>
          {car.confidence !== undefined && (
            <div className="text-center text-sm text-gray-400">
              Confidence: {Math.round(car.confidence * 100)}%
            </div>
          )}
        </CardContent>
      </Card>
    );
  };