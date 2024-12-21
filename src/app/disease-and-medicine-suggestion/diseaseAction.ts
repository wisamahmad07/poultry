// app/users/actions.ts
"use server";

export async function predictDisease(image?: File) {
  if (!image) {
    throw new Error("No image provided");
  }

  const formData = new FormData();
  formData.append("file", image);

  try {
    const response = await fetch(
      "https://a995-34-125-103-247.ngrok-free.app/predict", // Ensure this URL matches your ngrok forwarding URL
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
        mode: "cors", // Ensure CORS mode is enabled
      }
    );

    if (!response.ok) {
      throw new Error("Prediction failed. Please try again.");
    }

    const data = await response.json();
    console.log(data.predicted_class); // Log the prediction result to the console for debug
    return data.predicted_class; // Return the prediction result
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message, error);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
