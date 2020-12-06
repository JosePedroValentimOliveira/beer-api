//form
let form = document.createElement('form');
form.action = "/dashboard/saveBeer";
form.method = "POST";

//beer_name input
let beer_nameContainer = document.createElement("div");
beer_nameContainer.className = "form-group";
let beer_nameLabel = document.createElement("label");
beer_nameLabel.htmlFor = "beer_name";
beer_nameLabel.textContent = "Bier naam";
let beer_nameInput = document.createElement("input");
beer_nameInput.type = "text";
beer_nameInput.className ="form-control";
beer_nameInput.id ="beer_name";
beer_nameInput.name = "beer_name";

//beer_percentage input
let beer_percentageContainer = document.createElement("div");
beer_percentage.className = "form-group";
let beer_percentageLabel = document.createElement("label");
beer_percentageLabel.htmlFor = "beer_name";
beer_percentageLabel.textContent = "Bier naam";
let beer_percentageInput = document.createElement("input");
beer_percentageInput.type = "text";
beer_percentageInput.className ="form-control";
beer_percentageInput.id ="beer_name";
beer_percentageInput.name = "beer_name";
