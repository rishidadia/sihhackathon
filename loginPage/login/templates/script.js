function uploadAccomplishment(event){
    const formE1=document.querySelector('.uploadAccomplishmentForm');
    const formData=new FormData(formE1);
    console.log(formData.get('titleText'));
}