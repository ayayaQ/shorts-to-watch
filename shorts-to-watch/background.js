chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // listener for tab opens
  const re = /https:\/\/www\.youtube\.com\/shorts\/\w+/;

  let match = re.test(tab.url);
  if (match) {
    // when the page is loading (you can do info.status === 'complete' but you will see the page for a second or two)
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
