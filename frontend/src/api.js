// export const uploadResume = async ({ file, job_description }, uploadApiUrl) => {
//   if (!uploadApiUrl) throw new Error("uploadApiUrl is required");
//   const fileContent = await new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });

//   const payload = {
//     file_name: file.name,
//     file_content: fileContent,
//     job_description: job_description
//   };

//   const response = await fetch(`${uploadApiUrl}/upload`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`Upload failed: ${errorText}`);
//   }

//   return response.json();
// };

// export const getATSResults = async (resumeId, resultsApiUrl) => {
//   try {
//     console.log(`Attempting to fetch results for resume_id: ${resumeId}`);
//     const url = `${resultsApiUrl}/results?resume_id=${encodeURIComponent(resumeId)}`;
//     console.log(`Request URL: ${url}`);
    
//     const response = await fetch(url, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" }
//     });
    
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Failed to fetch ATS results: ${errorText}`);
//     }
    
//     return response.json();
//   } catch (error) {
//     console.error("Error fetching ATS results:", error);
//     throw error;
//   }
// };

// export async function retryGetATSResults(resume_id, resultsApiUrl, retries = 15, delay = 2000) {
//   if (!resultsApiUrl) throw new Error("resultsApiUrl is required");
//   for (let attempt = 1; attempt <= retries; attempt++) {
//       try {
//           console.log("Resume ID is: ", resume_id)
//           const result = await getATSResults(resume_id, resultsApiUrl);
//           if (result) {
//               return result;
//           }
//       } catch (error) {
//           console.warn(`Attempt ${attempt} failed: ${error.message}`);
//       }
//       await new Promise(resolve => setTimeout(resolve, delay));
//   }
//   throw new Error("ATS Results not found after maximum retries.");
// }

export const uploadResume = async ({ file, job_description }, uploadApiUrl) => {
  if (!uploadApiUrl) throw new Error("uploadApiUrl is required");
  const fileContent = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const payload = {
    file_name: file.name,
    file_content: fileContent,
    job_description: job_description
  };

  const response = await fetch(`${uploadApiUrl}/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload failed: ${errorText}`);
  }

  return response.json();
};

export const getATSResults = async (resultId, resultsApiUrl) => {
  try {
    console.log(`Attempting to fetch results for result_id: ${resultId}`);
    const url = `${resultsApiUrl}/results?result_id=${encodeURIComponent(resultId)}`;
    console.log(`Request URL: ${url}`);
    
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch ATS results: ${errorText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching ATS results:", error);
    throw error;
  }
};

export async function retryGetATSResults(result_id, resultsApiUrl, retries = 15, baseDelay = 2000) {
  if (!resultsApiUrl) throw new Error("resultsApiUrl is required");

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Attempt ${attempt} of ${retries} - Result ID: ${result_id}`);
      const result = await getATSResults(result_id, resultsApiUrl);
      if (result) {
        console.log("Successfully fetched ATS results:", result);
        return result;
      }
    } catch (error) {
      console.warn(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt === retries) {
        console.error("Maximum retries reached. Throwing error.");
        throw new Error("ATS results not found after maximum retries.");
      }
    }

    // Exponential backoff: delay increases with each attempt (2s, 4s, 6s, ..., 30s)
    const delay = baseDelay * attempt;
    console.log(`Waiting ${delay}ms before retrying...`);
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  // This line should never be reached due to the throw in the loop, but included for safety
  throw new Error("ATS results not found after maximum retries.");
}