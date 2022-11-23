import config from "../conf/index.js";
//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let response = await fetch(config.backendEndpoint + "/reservations/");
    let data = await response.json();
    return data;
  }
  catch(err){
    return null;
  }
  // Place holder for functionality to work in the Stubs
  
}


//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
//  console.log(reservations)
 if (reservations.length !== 0) {
  document.getElementById("reservation-table-parent").style.display = "block";
  document.getElementById("no-reservation-banner").style.display = "none";
} else {
  document.getElementById("reservation-table-parent").style.display = "none";
  document.getElementById("no-reservation-banner").style.display = "block";
}

let reservationTable = document.getElementById("reservation-table");

reservations.forEach((element) => {
  let newRow = document.createElement("tr");
  let td1 = document.createElement("td");
  td1.innerHTML = element.id;
  newRow.appendChild(td1);

  let td2 = document.createElement("td");
  td2.innerHTML = element.name;
  newRow.appendChild(td2);

  let td3 = document.createElement("td");
  td3.innerHTML = element.adventureName;
  newRow.appendChild(td3);

  let td4 = document.createElement("td");
  td4.innerHTML = element.person;
  newRow.appendChild(td4);

  let dateSplit = element.date.split('-');//"2022-05-27",
  
  if(dateSplit[2][0]=="0"){    // excluding the "0" for the single digit days "0-9" in a month
    dateSplit[2] = dateSplit[2][1];
  }
  if(dateSplit[1][0]=="0") //excluding the "0" for single digit months "0-9" in a year
    dateSplit[1] = dateSplit[1][1];
  let newDateFormat = dateSplit[2]+'/'+dateSplit[1]+'/'+dateSplit[0];
  let tr5 = document.createElement("td");
  tr5.innerHTML = newDateFormat;
  newRow.appendChild(tr5);

  let td6 = document.createElement("td");
  td6.innerHTML = `${element.price}`;
  newRow.appendChild(td6);
    
  let t7 = document.createElement('td');
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let getExtractedDate = new Date(element.time);
  let getNewDateFormat = getExtractedDate.toLocaleDateString(); //   mm/dd/yyyy format
  let getNewTimeFormat = getExtractedDate.toLocaleTimeString();
  
  //extracted the month number  from 'getNewDateFormat' to map with the 'newMonths' array
  let splitedDateArray = getNewDateFormat.split('/');
  let getMonth = parseInt(splitedDateArray[0]);
  let getDay = splitedDateArray[1];

  let bookingTime = getDay +" " +  `${monthNames[getMonth-1]}`+" " + splitedDateArray[2] + ', ' + getNewTimeFormat.toLocaleLowerCase();
  t7.innerHTML = bookingTime;
  newRow.appendChild(t7);


  let td8 = document.createElement("td");
  let anchorTag = document.createElement("a");
  anchorTag.setAttribute(
    "href",
    "../detail/?adventure=" + `${element.adventure}`
  );
  anchorTag.innerText = "Visit Adventure";

  let buttonTag = document.createElement("button");
  buttonTag.setAttribute("class", "reservation-visit-button");
  buttonTag.setAttribute("id", element.id);
  buttonTag.appendChild(anchorTag);

  td8.appendChild(buttonTag);
  newRow.appendChild(td8);

  reservationTable.appendChild(newRow);

});
}

export { fetchReservations, addReservationToTable };
