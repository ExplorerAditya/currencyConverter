console.log("Main.js working");

const populate = async (value, currency) => {
  const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_wNrsC8sE1yFr41ABaAaRfeVjOD4Cn5YPy8iYL5d1&base_currency=${currency}`;
  let myStr = "";

  try {
    const response = await fetch(url);
    const rJson = await response.json();

    document.querySelector(".output").style.display = "block";

    for (let key of Object.keys(rJson.data)) {
      const code = rJson.data[key].code;
      const rate = rJson.data[key].value;
      myStr += `
        <tr>
          <td>${key}</td>
          <td>${code}</td>
          <td>${(rate * value).toFixed(2)}</td>
        </tr>`;
    }

    document.querySelector("tbody").innerHTML = myStr;
  } catch (error) {
    console.error("Error fetching currency data:", error);
    alert("Failed to fetch currency data. Please check the API key or internet connection.");
  }
};

document.getElementById("currency-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const value = parseFloat(document.getElementById("quantity").value);
  const currency = document.getElementById("currency").value;

  if (!value || value <= 0) {
    alert("Please enter a valid quantity greater than 0.");
    return;
  }

  populate(value, currency);
});
