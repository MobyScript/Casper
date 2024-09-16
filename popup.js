const toggleButton = document.getElementById("toggleButton");

// Initialize button state based on storage
chrome.storage.local.get("casperActive", (data) => {
  toggleButton.textContent = data.casperActive ? "Stop Casper" : "Start Casper";
});

// Handle button click to toggle Casper animation
toggleButton.addEventListener("click", () => {
  chrome.storage.local.get("casperActive", (data) => {
    const isActive = data.casperActive;

    // Toggle the state in storage
    chrome.storage.local.set({ casperActive: !isActive }, () => {
      toggleButton.textContent = !isActive ? "Stop Casper" : "Start Casper";

      // Send a message to the content script to start/stop animation
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: !isActive ? "start" : "stop",
        });
      });
    });
  });
});

document.getElementById("toggleButton").addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "toggleAnimation" });
});
