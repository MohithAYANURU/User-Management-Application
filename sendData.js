

export const sendDataToBackend = async (url, data, method = "POST") => {
  try {
    const response = await fetch(url, {
      method: method, 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to send data:", error);
    throw error;
  }
};
