window.onload = function() {
    document.getElementById('copyAll').addEventListener('click', function() {
        copyAllTabUrls();
    }, true);
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
