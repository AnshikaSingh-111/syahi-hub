
// Central storage functions for the writing platform

/**
 * Store writings in localStorage
 * This simulates a global storage mechanism but is limited to the current browser
 */
export const saveWritingToStorage = (writing: any) => {
  const allWritings = getWritingsFromStorage();
  allWritings.unshift(writing);
  localStorage.setItem("publishedWritings", JSON.stringify(allWritings));
  
  // Dispatch event to notify other components about the change
  window.dispatchEvent(new CustomEvent("writingPublished"));
};

/**
 * Get all published writings from storage
 */
export const getWritingsFromStorage = () => {
  const storedWritings = localStorage.getItem("publishedWritings");
  return storedWritings ? JSON.parse(storedWritings) : [];
};

/**
 * Get a specific writing by ID
 */
export const getWritingById = (id: string) => {
  const allWritings = getWritingsFromStorage();
  return allWritings.find((writing: any) => writing.id === id);
};

/**
 * Update a specific writing (e.g., after adding comments or ratings)
 */
export const updateWritingInStorage = (updatedWriting: any) => {
  const allWritings = getWritingsFromStorage();
  const index = allWritings.findIndex((writing: any) => writing.id === updatedWriting.id);
  
  if (index !== -1) {
    allWritings[index] = updatedWriting;
    localStorage.setItem("publishedWritings", JSON.stringify(allWritings));
    window.dispatchEvent(new CustomEvent("writingUpdated", { detail: updatedWriting }));
    return true;
  }
  
  return false;
};

/**
 * Get user ID or create one if it doesn't exist
 * This simulates user identification in a multi-user environment
 */
export const getUserId = () => {
  let userId = localStorage.getItem("syahi_user_id");
  if (!userId) {
    userId = `user_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem("syahi_user_id", userId);
  }
  return userId;
};

/**
 * Get username based on user ID
 */
export const getUserName = (userId: string) => {
  // In a real app, this would fetch the username from a database
  // For now, we'll generate a consistent name based on the user ID
  return `Writer ${userId.substring(5, 10)}`;
};

