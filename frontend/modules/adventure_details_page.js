import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  //console.log(search);
  let params = new URLSearchParams(search);
  let adventureId = params.get('adventure');
  return adventureId;
}

//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let fetched = await fetch(config.backendEndpoint+"/adventures/detail?adventure="+adventureId);
    let data = await fetched.json();
    //console.log(data);
    return data;
  } catch (err){
      return null;
  }
  // Place holder for functionality to work in the Stubs 
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  //console.log(adventure);
  let advName = document.getElementById("adventure-name");
  advName.innerHTML = adventure.name;

  let advSubtitle = document.getElementById("adventure-subtitle");
  advSubtitle.innerHTML = adventure.subtitle;

  let advContent = document.getElementById("adventure-content");
  advContent.innerHTML = adventure.content;
  //Loop through the images, create a div element for each and insert it into the photo-gallery
  let advImage = document.getElementById("photo-gallery");
  adventure.images.forEach((key) => {
    const imgDiv = document.createElement("img");
    imgDiv.setAttribute("src", key);
    imgDiv.setAttribute("class", "activity-card-image");

    advImage.appendChild(imgDiv);
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  //console.log(images);
  //1. selec the element id
  const gallery = document.querySelector("#photo-gallery");
  gallery.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
 <div class="carousel-indicators">
   <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true"></button>
   <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="slide 2"></button>
   <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="slide 3"></button>
 </div>
 <div class="carousel-inner">
   
 </div>
 <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
   <span class="carousel-control-prev-icon" aria-hidden="true"></span>
   <span class="visually-hidden">Previous</span>
 </button>
 <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
   <span class="carousel-control-next-icon" aria-hidden="true"></span>
   <span class="visually-hidden">Next</span>
 </button>
</div>
  `; 
  images.forEach((ele) => {
    const carouselItem = document.createElement("div");
    carouselItem.setAttribute("class", "carousel-item");
    const imgDiv = document.createElement("img");
    imgDiv.setAttribute("src", ele);
    imgDiv.setAttribute("class", "d-block w-100");
    carouselItem.appendChild(imgDiv);
    document.querySelector(".carousel-inner").appendChild(carouselItem);
  });
  //Make sure only one of the images (carousel-item) is set to active.
  document.getElementsByClassName("carousel-item")[0].className =
    "carousel-item active";
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    let reservation_person_cost = document.getElementById("reservation-person-cost");
    reservation_person_cost.innerHTML = adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let updatedCost = document.getElementById("reservation-cost");
  updatedCost.innerHTML = adventure.costPerHead*persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  async function makeRequest(data){
    console.log('POST '+JSON.stringify(data));
      const response= await fetch(config.backendEndpoint + `/reservations/new`,{
        method: "POST",
        headers:{'Content-Type': 'application/json',},
        body: JSON.stringify(data)
      });
      const result = await response.json();
      return result;
  }

  const formElement=document.getElementById('myForm');
  formElement.addEventListener("submit",async (event)=>{
    event.preventDefault()
    const name=formElement.getElementsByClassName('form-control').name.value;
    const date = formElement.getElementsByClassName('form-control').date.value;
    const person = formElement.getElementsByClassName('form-control').person.value;
    const advId=adventure.id;
    const data={
      name,
      date,
      person,
      adventure:advId      
    };
    console.log(data)
    
    try{
      makeRequest(data);
      alert("Success!");
    }
    catch(err){
     alert('Failed!');
    }
  });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved)
      document.getElementById('reserved-banner').style.display = "block";
    else 
    document.getElementById('reserved-banner').style.display = "none"; 

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
