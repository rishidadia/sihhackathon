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
    // fetch("mongodb://localhost:27017/Members", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json", // Send data as JSON
    //   },
    //   body: JSON.stringify(data),
    // });
  }
  function uploadAnnouncement(event) {
    event.preventDefault(); // Prevent form submission
  
    const formEl = document.forms["uploadAnnouncementForm"]; // Get the form element
    const formData = new FormData(formEl); // Create FormData object
  
    // Convert FormData to an object using fromEntries
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    // Send the data to your backend API using fetch
    fetch("http://localhost:5000/upload-announcement", { // Replace with your API endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Send the data as JSON
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  



  
  /* Function to open the sidebar */
  function openSidebar() {
    document.getElementById("sidebar").style.width = "250px";
    document.getElementById("main-content").style.marginLeft = "250px";
  }

  /* Function to close the sidebar */
  function closeSidebar() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("main-content").style.marginLeft = "0";
  }
