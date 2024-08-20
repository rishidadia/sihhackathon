function upload(event){
    event.preventDefault(upload);
    const isChecked = localStorage.getItem('accomplishmentUploadChecked') === 'true';
    if(isChecked){
        const newDiv=document.createElement("div");
        newDiv.classList.add("new-div");
        newDiv.innerHTML=`
        <p>Username:username</p>
        `;
        console.log(document.getElementById("accomplishmentpage").appendChild(newDiv));
    }
    else if(document.getElementById("announcementUpload").checked){

    }
    else if(document.getElementById("eventUpload").checked){

    }
}