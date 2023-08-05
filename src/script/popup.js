const shortenForm = document.getElementById('shortenForm');
const linkInput = document.getElementById('link');
const smallLinkDiv = document.getElementById('smallLink');
const validation = document.querySelector('.validation');

shortenForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const linkValue = linkInput.value.trim();
    if (linkValue) {
        validation.classList.add('display');
        try {
            const response = await fetch('https://infoajara.com/api/v1/shorten', {
                method: 'POST',
                body: JSON.stringify({link: linkValue}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json()
            console.log(data)
            smallLinkDiv.textContent = data.data
        } catch (error) {
            console.error(error);
        }
    } else {
        validation.classList.remove('display');
    }
});

const copyBtn = document.getElementById('copy');
copyBtn.addEventListener('click', () => {
    const range = document.createRange();
    range.selectNode(smallLinkDiv);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
    copyBtn.style.backgroundColor = 'green'
});