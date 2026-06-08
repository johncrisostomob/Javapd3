let data, customers;

async function init_customers(){
let link = "https://crispy-winner-jj7567x5wpqw2qp9p-8000.app.github.dev/";
let route = "Celebrities";
info = await fetch(link + route);
customers = await info.json();
populateTypeDropdown();
generateCards_customers(customers);
console.log(customers);
}

function generateCards_customers(customers){
  let output = document.getElementById("centerpanel");
  let build = "";
  for(let i=0; i<customers.length; i++){
    let customer = customers[i];
    // Support both legacy keys and SQL-returned lowercase keys for celebrities
    const name = customer.name || customer.Name || 'Unknown';
    const age = (customer.age !== undefined && customer.age !== null) ? customer.age : (customer.Age !== undefined ? customer.Age : '');
    const netWorth = customer.netWorth || customer.net_worth || customer.NetWorth || customer.networth || '';
    const career = customer.career || customer.Career || customer.careers || '';
    const gender = customer.gender || customer.Gender || '';

    // currency formatter for netWorth when numeric
    const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    let netWorthDisplay = '';
    if(netWorth !== ''){
      const num = Number(netWorth);
      netWorthDisplay = isFinite(num) ? currencyFormatter.format(num) : netWorth;
    }

    build += '<div class="card">';
    build += `<h1>Name: ${name}</h1>`;
    if(age !== '') build += `<h3>Age: ${age}</h3>`;
    if(netWorthDisplay !== '') build += `<h4>Net Worth: ${netWorthDisplay}</h4>`;
    if(career !== '') build += `<h4>Career: ${career}</h4>`;
    if(gender !== '') build += `<h4>Gender: ${gender}</h4>`;
    build += `<hr>`;
    build += '</div>';
  }
   output.innerHTML = build;

}

function populateTypeDropdown(){
  let select = document.getElementById("filterType");
  let types = new Set();
  for(let i = 0; i < customers.length; i++){
    // Populate dropdown with careers (keeps legacy `type` if present)
    let career = customers[i].career || customers[i].Career || customers[i].type || customers[i].Type || '';
    if(career) types.add(career);
  }
  
  // Sort types and add them to dropdown
  let sortedTypes = Array.from(types).sort();
  for(let type of sortedTypes){
    let option = document.createElement("option");
    option.value = type;
    option.text = type;
    select.appendChild(option);
  }
}

function filter_customers(){
  let selected = document.getElementById("filterType").value;
  console.log("Filtering by career: " + selected);

  if(selected === ""){
    generateCards_customers(customers);
    return;
  }

  let filtered = [];
  for(let i = 0; i < customers.length; i++){
    let career = customers[i].career || customers[i].Career || customers[i].type || customers[i].Type || '';
    if(career === selected){
      filtered.push(customers[i]);
    }
  }
  generateCards_customers(filtered);
}