"use client";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { predictDisease } from "../diseaseAction";

export function UploadImage() {
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      setError("Please select a file to upload.");
      return;
    }
    const file: File = files[0];
    setSelectedFile(file); // Store the selected file in the state
    console.log(file);

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (file && !validTypes.includes(file.type)) {
      setError("Invalid file type. Please upload a .jpg, .jpeg, or .png file.");
      (event.target as HTMLInputElement).value = "";
    } else {
      setError("");
    }
  };

  const handleDiseaseClick = async () => {
    setError("");
    setResult("");
    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }
    setIsLoading(true);
    try {
      const prediction = await predictDisease(selectedFile); // Pass the file to predictDisease
      setError("");
      setResult(prediction);
      setIsLoading(false);
    } catch (err) {
      setError("There was an error processing the file.");
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-10 md:mb-0 h-full">
      <CardHeader>
        <CardTitle>Feces Image</CardTitle>
        <CardDescription>
          Upload chicken feces image to know whether it has a disease or not.
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="feces-image">Feces Image</Label>
              <Input
                id="feces-image"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
              {result && (
                <p className="text-green-600">{`Prediction: ${result}`}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            onClick={handleDiseaseClick}
            disabled={isLoading}
          >
            {isLoading ? "Predicting..." : "Upload"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
