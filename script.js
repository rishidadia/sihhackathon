//accomplishment
document.addEventListener("DOMContentLoaded", function () {
  const accomplishmentPage = document.getElementById("accomplishmentpage");
  const username = localStorage.getItem("username");
  const title = localStorage.getItem("title");
  const description = localStorage.getItem("description");
  const date = localStorage.getItem("date");
  const pdf = localStorage.getItem("fileupload");
  if (username && title && description) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("new-div");
    newDiv.innerHTML = `
            <p>Username: ${username}</p>
            <h3>${title}</h3>
            <p>${date}</p>
            <p>${description}</p>
            <p>${pdf}</p>
        `;
    accomplishmentPage.appendChild(newDiv);
    localStorage.removeItem("username");
    localStorage.removeItem("title");
    localStorage.removeItem("date");
    localStorage.removeItem("pdf");
  }
});

function upload(event) {
  event.preventDefault();
  if (document.getElementById("accomplishmentUpload").checked) {
    localStorage.setItem("username", "Username");
    localStorage.setItem("title", document.getElementById("titleText").value);
    localStorage.setItem("date", document.getElementById("date").value);
    localStorage.setItem(
      "description",
      document.getElementById("description").value
    );
    localStorage.setItem("pdf", document.getElementById("fileupload").value);
    window.location.href = "accomplishments.html";
  }
}
