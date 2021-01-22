// @flow

/*::
declare var chrome;
*/

function close() {
  chrome.windows.getCurrent({}, window => {
    chrome.windows.remove(window.id);
  });
}

chrome.runtime.sendMessage({ type: 'connect_retrieve_data' }, response => {
  if (response == null) {
    close();
  }
  const info = document.getElementById('connect-info');
  if (info != null) {
    info.innerText = `Would you like to connect to ${response.url}?`;
  }
  const connect = document.getElementById('connect');
  if (connect != null) {
    connect.onclick = () => {
      chrome.storage.local.get('connector_whitelist', async result => {
        const whitelist = Object.keys(result).length === 0 ? [] : result.connector_whitelist;
        whitelist.push(response.url);
        chrome.storage.local.set({ connector_whitelist: whitelist });
      });
      chrome.runtime.sendMessage({
        type: 'connect_response',
        accepted: true,
        tabId: response.tabId
      });
      close();
    };
  }
  const cancel = document.getElementById('cancel');
  if (cancel != null) {
    cancel.onclick = () => {
      chrome.runtime.sendMessage({
        type: 'connect_response',
        accepted: false,
        tabId: response.tabId
      });
      close();
    };
  }
});