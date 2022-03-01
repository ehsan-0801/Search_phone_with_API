const phonedetails = document.getElementById('phone_details');
const error_Msg = document.getElementById('msg1')
const searchfield = document.getElementById('search_field');
const searchAmount = document.getElementById('searchAmount');
const searchResult = document.getElementById('search_result')

const toggleSpinner = displayStyle => {
    document.getElementById('spinner_field').style.display = displayStyle;
}
// searching phones
const searchPhones = () => {
    // display spinner
    
    const searchText = searchfield.value;
    // console.log(searchText);
    searchfield.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(json => displaySearchResults(json.data.slice(0, 20)))
        toggleSpinner('block')
}
// displaying all phones
const displaySearchResults = phones => {
    // console.log(phones)
    searchResult.innerHTML = '';
    phonedetails.innerHTML = '';
    searchAmount.innerHTML = '';
    if (phones.length == 0) {
        error_Msg.innerHTML = 'No results found or Wrong input'
    } 
    else {
        const h3 = document.createElement('h3')
        h3.innerHTML = `Search Result: ${phones.length} <br>`
        searchAmount.appendChild(h3)
        phones.forEach(phone => {
            // console.log(phone)
            const div = document.createElement('div')
            div.classList.add('col')

            // console.log(phone.slug)
            error_Msg.innerHTML = '';

            div.innerHTML = `
        <img src="${phone.image}" class="card-img-top text-center" alt="..." />
            <div class="card border border-2 rounded shadow-lg">
                <div class="card-body">
                    <h2 class="card-title text-secondary">Brand: <span class="text-custom">${phone.brand}</span></h2>
                    <h5 class="card-title text-danger">Model: <span class="text-custom2">${phone.phone_name}</span></h5>
                    <a href='#phone_details' onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-outline-primary">Show Details</a>
                </div>
            </div>
        `;
            searchResult.appendChild(div)
        })
        toggleSpinner('none')
    }
    // <div onclick="loadMealDetail(${phone.idMeal})" class="card">

}

// loading individual phones
const loadPhoneDetails = phoneSlug => {

    console.log(phoneSlug);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`;
    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(json => displayPhoneDetails(json.data))

}

// displaying individual spec
const displayPhoneDetails = phone => {
    const phonedetails = document.getElementById('phone_details')
    console.log(phone)
    phonedetails.innerHTML = '';
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
        <div class='row p-md-5 p-sm-5'>
            <div class="col-md-6 col-sm-12 border border-1 border-primary rounded">
                <img src="${phone.image}" class="card-img-top" alt="..." />
                <div>
                    <h5>Release Date: <h6 class='text-secondary'>${phone.releaseDate? phone.releaseDate :'Release date not published yet' }</h6></h5>
                </div>
            </div>
            <div class="col-md-6 col-sm-12 border border-1 border-success rounded">
                <h2>Brand: <span class='text-primary fw-bold'>${phone.brand} </span></h2>
                <h5>Name: <h6 class='text-secondary'>${phone.name}</h6>
                <h4 class='text-success'>Specification:</h4>
                <h5>Chipset:</h5> <h6 class='text-secondary'>${phone.mainFeatures.chipSet? phone.mainFeatures.chipSet :'Information not found' }</h6>
                <h5>Display:</h5> <h6 class='text-secondary'>${phone.mainFeatures? phone.mainFeatures.displaySize :'Information not found' }</h6>
                <h5>Memory: </h5><h6 class='text-secondary'>${phone.mainFeatures? phone.mainFeatures.memory :'Information not found' }</h6>
                <h5>Storage:</h5> <h6 class='text-secondary'>${phone.mainFeatures? phone.mainFeatures.storage :'Information not found' }</h6>
                <h5>Sensors:</h5> <h6 class='text-secondary'>${phone.mainFeatures? phone.mainFeatures.sensors :'Information not found' }</h6>

            </div>
        </div> 
        <div class='p-md-5 p-sm-5 border border-1 border-dark rounded'>
            <h6>Other Services:</h6>
            Bluetooth: <p class='text-secondary'>${phone.others? phone.others.Bluetooth :'Not Found' }</p>
            GPS: <p class='text-secondary'>${phone.others? phone.others.GPS :'Not Found' }</p>
            NFC: <p class='text-secondary'>${phone.others? phone.others.NFC :'Not Found' }</p>
            Radio: <p class='text-secondary'>${phone.others? phone.others.Radio :'Not Found' }</p>
            USB: <p class='text-secondary'>${phone.others? phone.others.USB :'Not Found' }</p>
            WLAN: <p class='text-secondary'>${phone.others? phone.others.WLAN :'Not Found' }</p>
        </div>    
    `;
    phonedetails.appendChild(div)

}