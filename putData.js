export const putData = async (url, userData) => {
  try {
    const updateUrl = `${url}/${userData.id}`; // append user id

    const response = await fetch(updateUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        my_key: "my_super_secret_phrase", // if your API requires it
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("PUT failed:", err);
    throw err;
  }
};
