chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // regex to test the url with.
  const re = /https:\/\/www\.youtube\.com\/shorts\/\w+/;

  let match = re.test(tab.url);
  if (match) {
    // get the video id and append to regular watch
    let lastSlash = tab.url.lastIndexOf('/');

    let url = "https://www.youtube.com/watch?v=" + tab.url.substring(lastSlash + 1);

    chrome.tabs.query(
      {
        // change the tab url
        currentWindow: true,
        active: true,
      },
      function (tab) {
        chrome.tabs.update(tab.id, {
          url: url,
        });
      }
    );
  }
});
