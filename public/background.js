let popupWindowId = null;

chrome.action.onClicked.addListener(async () => {
  try {
    if (popupWindowId !== null) {
      // If the popup window is already open, focus on it
      const existingWindow = await chrome.windows.get(popupWindowId);
      if (existingWindow) {
        await chrome.windows.update(popupWindowId, { focused: true });
        return;
      }
    }

    // If the popup window is not open or doesn't exist, create a new one
    const popupWindow = await chrome.windows.create({
      url: chrome.runtime.getURL("index.html"),
      type: "popup",
      width: 800,
      height: 500,
    });
    popupWindowId = popupWindow.id;
  } catch (error) {
    console.error("Error occurred:", error);
    popupWindowId = null;
  }
});

chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === popupWindowId) {
    popupWindowId = null;
  }
});