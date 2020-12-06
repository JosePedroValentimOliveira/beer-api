




let addImageButton = document.getElementById('addImage');
let beerName = document.getElementById('beer_name');
let form = document.getElementById('form');
let imageDiv = document.getElementById('images');
let submitButton = document.getElementById('submitButton');
submitButton.style.display = "none";
// Add eventlistener to button
// -> get request to get the image urls
// -> first post the beer name for google query




async function getImageUrls(beerName){
    const response = await fetch(`/dashboard/getImages?beer_name=${beerName}`);
    const data = await response.json();
    return data;
}

let generateImages = (imageArray)=>{
    imageDiv.textContent = "";
    imageArray.forEach(imageUrl => {
        let image = document.createElement('img');
        image.className="btn btn-outline-warning m-1 beerImage";
        image.src = imageUrl;
        image.style.width= "200px";
        image.style.height = "200px";
        image.style.objectFit = "contain";
        let input = document.createElement("input");
        input.type = "radio";
        input.name = "beer_img";
        input.className ="beerSelector";
        input.value = imageUrl;
        input.id = imageUrl;
       
        image.appendChild(input);
        imageDiv.appendChild(image);
    });
}

let validateForm = ()=>{
    let beerTypesArray = document.querySelectorAll(".beerTypes:checked");
    let beer_name = document.getElementById('beer_name').value;
    let beer_percentage = document.getElementById('beer_percentage').value;

    let errors = [];
    if(beer_name == ""){
        errors.push('Bier naam ontbreekt');
    }

    if(beer_percentage == ""){
        errors.push('Bier Percentage ontbreekt');
    }
    if(beerTypesArray.length <= 0){
        errors.push('Gelieve een biertype te selecteren');
    }
    
    return errors;
}


addImageButton.addEventListener("click", async()=>{
    validateForm();
    let errors = validateForm();
    let errorDiv = document.getElementById("errors");
    errorDiv.textContent ="";
    if(errors.length > 0){
        errors.forEach(error=>{
            
            let div = document.createElement('div');
            div.textContent = error;
            div.className ="alert alert-warning alert-dismissible fade show";
            div.role = "alert";
            let button = document.createElement('button');
            button.type = "button";
            button.className = "close";
            button.setAttribute('aria-label',"Close");
            button.setAttribute('data-dismiss','alert');
            let span = document.createElement('span');
            span.innerHTML = "&times;";
            button.appendChild(span);
            div.appendChild(button);
            errorDiv.appendChild(div);
        })
    }
    else{
        await getImageUrls(beerName.value).then(data=>{
            generateImages(data);
        });
        form.style.pointerEvents="none";
        form.style.opacity = "0.3";
        submitButton.style.display = "block";
    }
    
    
    
   

        
    
    

})



