let tickerDiv = document.getElementById('ticker');
let openDiv = document.getElementById('open');
let highDiv = document.getElementById('high');
let lowDiv = document.getElementById('low');
let closeDiv = document.getElementById('close');
let nameDiv = document.getElementById('name');
let localeDiv = document.getElementById('locale');
let currencyDiv = document.getElementById('currency');
let descriptionDiv = document.getElementById('description');

let searchBar = document.getElementById('search');
searchBar.setAttribute("onkeydown", "check(this)");


async function getData(symb) {
    const api_url = `https://api.polygon.io/v2/aggs/ticker/${symb}/range/1/day/2021-07-22/2021-07-22?adjusted=true&sort=asc&limit=120&apiKey=zuwnlARh8tmPmFfs_1JhhFI8ukuB8Cpi`
    const api_url2 = `https://api.polygon.io/v3/reference/tickers/${symb}?apiKey=zuwnlARh8tmPmFfs_1JhhFI8ukuB8Cpi`
    const response = await fetch(api_url);
    const response2 = await fetch(api_url2);
    var data = await response.json();
    var data2 = await response2.json();

    let ticker = data.ticker;
    let open = data.results[0].o;
    let high = data.results[0].h;
    let low = data.results[0].l;
    let close = data.results[0].c;
    let name = data2.results.name;
    let locale = data2.results.locale.toUpperCase();
    let currency = data2.results.currency_name.toUpperCase();
    let description = data2.results.description;

    tickerDiv.innerHTML = ticker + " - " + name;
    openDiv.innerHTML += "OPEN: " + open;
    highDiv.innerHTML += "HIGH: " + high;
    lowDiv.innerHTML += "LOW: " + low;
    closeDiv.innerHTML += "CLOSE: " + close;
    localeDiv.innerHTML += "Locale: " + locale;
    currencyDiv.innerHTML += "Currency: " + currency;
    descriptionDiv.innerHTML = `" ${description} "`;

    console.log(data);
    console.log(data2);
    console.log(ticker);
    console.log(open);
    console.log(high);
    console.log(low);
    console.log(close);
    console.log(name);
    console.log(locale);
    console.log(currency);
    console.log(description);
}

function check(ele) {
    if (event.key === 'Enter') {

        tickerDiv.innerHTML = ""
        openDiv.innerHTML = ""
        highDiv.innerHTML = ""
        lowDiv.innerHTML = ""
        closeDiv.innerHTML = ""
        localeDiv.innerHTML = ""
        currencyDiv.innerHTML = ""
        descriptionDiv.innerHTML = ""
        console.log(ele.value)
        var initial = ele.value
        var symbol = initial.toUpperCase();
        getData(symbol)
    }
}
