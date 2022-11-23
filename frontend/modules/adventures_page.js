import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  var params = new URLSearchParams(search);
  var city = params.get("city");
  return city;
}

//Implementation of fetch call wdith a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let fetched = await fetch(
      config.backendEndpoint + "/adventures" + `/?city=${city} `
    ).then((data) => data.json());
    return fetched;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((adventure) => {
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class","col-6 col-lg-3 flex mb-5");
    newDiv.innerHTML = `<a id=${adventure.id} href="detail/?adventure=${adventure.id}">
    <div class="activity-card">
    <div class="category-banner">
      <h6>${adventure.category}</h6>
    </div>
    <img class="activity img" src=${adventure.image}>
    <div class="d-flex justify-content-between px-3 pt-3 w-100">
      <p style='font-weight:bold'>${adventure.name}</p>
      <p>₹${adventure.costPerHead}</p>
    </div>
    <div class="d-flex justify-content-between px-3 pt-3 w-100">
      <p style='font-weight:bold'>Duration</p>
      <p>${adventure.duration} hours</p>
    </div>
    </div>
    </a>`;
    document.getElementById("data").appendChild(newDiv);
  });
}
//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  list = list.filter((item) =>{
    return item.duration>=low && item.duration<=high;
  });
  return list;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  list  = list.filter((item) =>{
    for(const category of categoryList){
      if(item.category === category)
        // console.log(item);
        return item;
    }
});
// console.log(list);
return list;
}

// filters object looks like this filters = { duration: "", category: [] };
//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together
function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  //when only filter by category exists
  if(filters.category.length!==0 && filters.duration === ""){
    list = filterByCategory(list, filters.category);
    // console.log(list);
  }

  //when only filter by duration  exists
  if(filters.duration!="" && filters.category.length===0){

    let lh = filters.duration.split("-");
    let low = lh[0];
    let hi = lh[1];
    list = filterByDuration(list,low,hi);
  }

  //when both are exists
  if(filters.category.length!=0  && filters.duration!=""){
    list = filterByCategory(list,filters.category);
    
    let lh = filters.duration.split("-");
    let low = lh[0];
    let hi = lh[1];
    list = filterByDuration(list,low,hi);
  }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters = JSON.parse(window.localStorage.getItem("filters"));
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM
function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  filters.category.forEach((key) => {
    let newCategoryList = document.getElementById("category-list");
    let newPara = document.createElement("p");

    newPara.setAttribute("class", "category-filter");
    newPara.innerText = key;

    newCategoryList.append(newPara);
  })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
