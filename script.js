document.addEventListener("DOMContentLoaded", function() {
    const accomplishmentPage = document.getElementById("accomplishmentpage");
    const username = localStorage.getItem('username');
    const title = localStorage.getItem('title');
    const description = localStorage.getItem('description');
    if (username && title && description) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("new-div");
        newDiv.innerHTML = `
            <p>Username: ${username}</p>
            <h3>${title}</h3>
            <p>${description}</p>
        `;
        accomplishmentPage.appendChild(newDiv);
        localStorage.removeItem('username');
        localStorage.removeItem('title');
        localStorage.removeItem('description');
    }
});

function upload(event){
    event.preventDefault();
    if(document.getElementById("accomplishmentUpload").checked){
        localStorage.setItem('username', 'Username'); 
        localStorage.setItem('title', document.getElementById('titleText').value);
        localStorage.setItem('description', document.getElementById('description').value);
        window.location.href = 'accomplishments.html';
    }
}