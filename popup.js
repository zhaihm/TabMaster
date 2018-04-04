window.onload = function() {
    document.getElementById('copyAll').addEventListener('click', function() {
        copyAllTabUrls();
    }, true);
    document.getElementById('applyAutoRefresh').addEventListener('click', function() {
        applyAutoRefresh();
    });
    document.getElementById('cancelAutoRefresh').addEventListener('click', function() {
        cancelAutoRefresh();
    });
};

function copyAllTabUrls() {
    browser.tabs.query({}).then((tabs) => {
        let copiedStr = '';
        tabs.forEach(function(tab) {
            copiedStr += tab.url + '\r\n';
        });

        console.log(copiedStr);

        copyText(copiedStr);
    });
}

function copyText(text) {
    var input = document.createElement('textarea');
    document.body.appendChild(input);
    input.value = text;
    input.focus();
    input.select();
    document.execCommand('Copy');
    input.remove();
}

function applyAutoRefresh() {
    let interval = document.getElementById('autoRefreshInterval').value;
    if (interval === '') {
        return;
    }
    
    let intervalId = setInterval(function() {
        browser.tabs.query({}).then((tabs) => {
            tabs.forEach(function(tab) {
                // Exclude 'about:xx' URLs, because Firefox doesn't allow to update their URLs
                if (!tab.url.startsWith('about:')) {
                    browser.tabs.update(tab.id, {
                        url: tab.url
                    });
                }
            });
        });
    }, interval*1000);

    document.getElementById('intervalId').value = intervalId;
}

function cancelAutoRefresh() {
    let intervalId = document.getElementById('intervalId').value;
    clearInterval(intervalId);

    document.getElementById('intervalId').value = '';
}
