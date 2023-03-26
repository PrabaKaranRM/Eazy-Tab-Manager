// Get all tabs and display them in a list
function displayTabs() {
    chrome.tabs.query({}, function(tabs) {
      const tabList = document.getElementById("tab-list");
      tabList.innerHTML = "";
      tabs.forEach(function(tab) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        const closeButton = document.createElement("button");
        a.setAttribute("href", tab.url);
        a.setAttribute("target", "_blank");
        a.innerText = tab.title;
        closeButton.innerText = "x";
        closeButton.classList.add("close-button");
        closeButton.addEventListener("click", function() {
          closeTab(tab.id);
        });
        li.appendChild(a);
        li.appendChild(closeButton);
        tabList.appendChild(li);
      });
      updateTabCount(tabs.length);
    });
  }
  
  // Close a specific tab
  function closeTab(tabId) {
    chrome.tabs.remove(tabId, function() {
      displayTabs();
    });
  }
  
  // Close all tabs
  function closeAllTabs() {
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.tabs.remove(tab.id);
      });
      displayTabs();
    });
  }
  
  // Update the tab count display
  function updateTabCount(count) {
    const tabCount = document.getElementById("tab-count");
    tabCount.innerText = count;
  }
  
  // Filter tabs by search input
  function searchTabs() {
    const input = document.getElementById("search-input");
    const filter = input.value.toLowerCase();
    const tabList = document.getElementById("tab-list");
    const tabs = tabList.getElementsByTagName("li");
    for (let i = 0; i < tabs.length; i++) {
      const a = tabs[i].getElementsByTagName("a")[0];
      const txtValue = a.textContent || a.innerText;
      if (txtValue.toLowerCase().indexOf(filter) > -1) {
        tabs[i].style.display = "";
      } else {
        tabs[i].style.display = "none";
      }
    }
    updateTabCount(tabs.length);
  }
  
  // Show all tabs when backspace is pressed
  function showAllTabs(event) {
    const input = document.getElementById("search-input");
    if (event.keyCode === 8 && input.value === "") {
      displayTabs();
    }
  }
  
  // Initialize the extension
  document.addEventListener("DOMContentLoaded", function() {
    displayTabs();
    const searchButton = document.getElementById("search-btn");
    searchButton.addEventListener("click", searchTabs);
    const input = document.getElementById("search-input");
    input.addEventListener("keyup", searchTabs);
    input.addEventListener("keydown", showAllTabs);
    const closeAllButton = document.getElementById("close-all-btn");
    closeAllButton.addEventListener("click", closeAllTabs);
  });
  