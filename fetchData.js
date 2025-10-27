// js/utils/fetchData.js
export const fetchData = async (url) => {
  try {
    const res = await fetch(url, {
      headers: {
        "my_key": "my_super_secret_phrase"  // required for API authentication
      }
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Fetch failed:", err);
    throw err;
  }
};
