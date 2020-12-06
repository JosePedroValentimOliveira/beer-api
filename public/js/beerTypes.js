const bierTypesJson = ["Amber","Blond","Donker","Rood","Anders"];
let beer_types = document.getElementById("bierTypes");



    
    bierTypesJson.forEach(bierType => {
      
        let label = document.createElement("label");
        label.className="btn btn-outline-warning m-1";
        label.textContent = bierType;
        let input = document.createElement("input");
        input.type = "Radio";
        input.name = "beer_type";
        input.className ="beerTypes";
        input.value = bierType;
        input.id = bierType;
        
        label.appendChild(input);
        bierTypes.appendChild(label);
    });
    

   
 
