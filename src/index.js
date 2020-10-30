let addToy = false;
const API_URL = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//Deliverable 1
// when the page loads makes a get request for /toys
fetch(API_URL)
  .then(r => r.json())
  .then(toyArray =>{
    //with that toy data, display a card for each toy
    toyArray.forEach(toyObj => {
      // end goal for each toy is to add the card in the readme
      // create outer element, assign classes, use innerHTML to create inner elements
      // add it to the DOM(toy-collection)
      const cardDiv = document.createElement("div")
      cardDiv.classList.add("card")

      //use innerHTML to create inner eelements 
      cardDiv.innerHTML = `
      <h2>${toyObj.name}</h2>
      <img src = ${toyObj.image} class="toy-avatar"/>
      <p>${toyObj.likes} Likes </p>
      <button data-id=`${toyObj.id}`class="like-btn">Like <3</button>
      `
      //add it to the DOM
      const collectionDiv = document.querySelector("#toy-collection")
      collectionDiv.append(cardDiv)
    })
    //Deliverable 2
    // when the form submits
      // find the form on the page & listen  for a suubmit event
    const toyForm = document.querySelector(".add-toy-form")
    toyForm.addEventListener("submit", () event => {
      //Prevent the default form submit action!
      event.preventDefault()
      //get user imput from the form
      const name = event.target.name.value
      const image = event.target.image.value
          //make a POST/ toys
       fetch(API_URL, {
         method: "POST",
         headers: {
           "Content-Type": 'application/json',
           "Accept": "application/json"
         },
         //in order not to hard code need to make this more flexible
         body: JSON.stringify({
           "name": name,
           "image": image,
           "likes": 0

         }),
       })
       // when we get a new toy from the server
       // add it to the DOM w/out refreshing
       .then(r => r.json())
       .then(newToy =>{
        //defined above
         renderToy(newToy)
         event.target.reset()
       })

    })
  

//Deliverable 3
//when like button is clicked 
//find a parent of all the likes buttons
const collecton = document.querySelector("#toy-collection")
       //add an event listener 
collecton.addEventListener("click", event => {
    // use a condition to check if it was a like btn clicked
  if (event.target.matches(".like-btn")){
    const likesPTag = event.target.previousElementSibling
// make a PATCH /toys/:id 
//send number of likes
// update number of likes on the DOM
//(how to access?) event.target is your button, event.target.closest takes you to the 
//closest parent which is the card w the number of likes
//chain a query selector to find the p tag that holds the number of likes

}
    })


  });