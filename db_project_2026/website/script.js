let customers; 

async function init_customers() {
  let link = "https://crispy-winner-jj7567x5wpqw2qp9p-8000.app.github.dev/";
  let route = "Celebrities";
  let info = await fetch(link + route);
  customers = await info.json();
  generateCards_customers(customers);
  console.log(customers);
}
 
 
function generateCards_customers(customers) {
  let output = document.getElementById("centerpanel");
  let build = "";
 
  for (let i = 0; i < customers.length; i++) {
    let customer = customers[i];
 
    const name = customer.name;
    const age = customer.age;
    const netWorth = customer.netWorth;
    const career  = customer.career;
    const gender  = customer.gender;
    var netWorthNum = Number(netWorth);
    // 1,000,000 to $1M
    var netWorthFormatted = isFinite(netWorthNum) ? "$" + Math.round(netWorthNum / 1000000) + "M" : netWorth;
 
    // Normalize career class: convert spaces to hyphens and lowercase for consistent filtering
    const careerClass = career.replace(/\s+/g, "-").toLowerCase();
 
    build += `<div class="card filterDiv ${careerClass} show">`;
    build += `<h1>Name: ${name}</h1>`;
    build += `<h3>Age: ${age}</h3>`;
    build += `<h4>Net Worth: ${netWorthFormatted}</h4>`;
    build += `<h4>Career: ${career}</h4>`;
    build += `<h4>Gender: ${gender}</h4>`;
    build += `<hr></div>`;
  }
 
  output.innerHTML = build;
}
 
function filterSelection(button, selectedCategory) {
  var cards, filterButtons, btnContainer, i;
  //gets element by class
  cards = document.getElementsByClassName("filterDiv");
  if (selectedCategory == "all") selectedCategory = "";
  for (i = 0; i < cards.length; i++) {
    //removes from list based on filter
    cards[i].classList.remove("show");
    //adds to list based on filter - now case-insensitive
    if (selectedCategory === "" || cards[i].className.toLowerCase().indexOf(selectedCategory.toLowerCase()) > -1) {
      cards[i].classList.add("show");
    }
  }
  //creates the filtering buttons
  btnContainer = document.getElementById("filterBtnContainer");
  filterButtons = btnContainer.getElementsByClassName("btn");
  for (i = 0; i < filterButtons.length; i++) {
    filterButtons[i].classList.remove("active");
  }
  button.classList.add("active");
}
