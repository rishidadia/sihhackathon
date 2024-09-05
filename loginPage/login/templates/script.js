function uploadAccomplishment(event) {
  event.preventDefault(); // Prevents form from submitting
  const formEl = document.forms["uploadAccomplishmentForm"]; // Get the form element
  const formData = new FormData(formEl); // Create FormData object

  // Log all form data values for debugging
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  // Convert FormData to an object using fromEntries
  const data = Object.fromEntries(formData.entries());

  // Log the entire object
  console.log(data);
  fetch("mongodb://localhost:27017/Members", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Send data as JSON
    },
    body: JSON.stringify(data),
  });
}
function uploadEvent(event) {
    event.preventDefault(); // Prevents form from submitting
    const formEl = document.forms["uploadEventForm"]; // Get the form element
    const formData = new FormData(formEl); // Create FormData object
  
    // Log all form data values for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    // Convert FormData to an object using fromEntries
    const data = Object.fromEntries(formData.entries());
  
    // Log the entire object
    console.log(data);
    fetch("mongodb://localhost:27017/Members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Send data as JSON
      },
      body: JSON.stringify(data),
    });
  }
function uploadAnnouncement(event) {
    event.preventDefault(); // Prevents form from submitting
    const formEl = document.forms["uploadAnnouncementForm"]; // Get the form element
    const formData = new FormData(formEl); // Create FormData object
  
    // Log all form data values for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    // Convert FormData to an object using fromEntries
    const data = Object.fromEntries(formData.entries());
  
    // Log the entire object
    console.log(data);
    fetch("mongodb+srv://sohaajaykhare2006:sX3UUA9AmFZdkair@cluster0.e7d3t.mongodb.net/retryWrites=true&w=majority&appName=Cluster0", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Send data as JSON
      },
      body: JSON.stringify(data),
    });
  }
  
