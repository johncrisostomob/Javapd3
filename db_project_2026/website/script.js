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

    const currencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency", currency: "USD", maximumFractionDigits: 0,
    });
    let netWorthDisplay = "";
    if (netWorth !== "") {
      const num = Number(netWorth);
      netWorthDisplay = isFinite(num) ? currencyFormatter.format(num) : netWorth;
    }

    // Convert career name to the CSS class used on the filter buttons
    const careerClass = career
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    build += `<div class="card filterDiv ${careerClass} show">`;
    build += `<h1>Name: ${name}</h1>`;
    build += `<h3>Age: ${age}</h3>`;
    build += `<h4>Net Worth: ${netWorthDisplay}</h4>`;
    build += `<h4>Career: ${career}</h4>`;
    build += `<h4>Gender: ${gender}</h4>`;
    build += `<hr></div>`;
  }

  output.innerHTML = build;
}

// W3Schools-style filter: show cards whose class matches the button,
// hide everything else, and highlight the active button.
function filterSelection(filterClass) {
  let cards = document.getElementsByClassName("filterDiv");
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("show");
    if (filterClass === "all" || cards[i].classList.contains(filterClass)) {
      cards[i].classList.add("show");
    }
  }

  let btns = document.getElementsByClassName("btn");
  for (let i = 0; i < btns.length; i++) {
    btns[i].classList.remove("active");
  }
  event.target.classList.add("active");
}