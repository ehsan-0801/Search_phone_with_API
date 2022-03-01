const searchPhones = () =>{
    const searchfield = document.getElementById('search_field')
    const searchText =searchfield.value;
    // console.log(searchText);
    searchfield.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(json => displaySearchResults(json.data))
}
const displaySearchResults = phones =>{
    // console.log(phones)
    const searchResult = document.getElementById('search_result')
    searchResult.innerHTML = '';
    
    // searchResult.textContent = '';
    // if(phones.length == 0){
    // }
    // else{
        phones.forEach(phone => {
        // console.log(phone)
        const div = document.createElement('div')
        div.classList.add('col')
        // console.log(phone.slug)
        div.innerHTML = `
        <img src="${phone.image}" class="card-img-top text-center" alt="..." />
            <div class="card border border-2 rounded shadow-lg">
                <div class="card-body">
                    <h2 class="card-title text-secondary">Brand: <span class="text-custom">${phone.brand}</span></h2>
                    <h5 class="card-title text-danger">Model: <span class="text-custom2">${phone.phone_name}</span></h5>
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-outline-primary">Show Details</button>
                </div>
            </div>
        `;
        searchResult.appendChild(div)
        
    })
    // <div onclick="loadMealDetail(${phone.idMeal})" class="card">
    
}
const loadPhoneDetails = phoneSlug =>
{

    console.log(phoneSlug);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`;
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(json => console.log(json))
}
const displayPhoneDetails = Phone => {
    const mealdetails = document.getElementById('phone_details')
    const div =document.createElement('div')
    div.classList.add('card')
    div.innerHTML =`
                <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
                    <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">
                        ${meal.strInstructions.slice(0,150)}
                    </p>
                    <a href="${meal.strYoutube}" class="btn btn-primary">Watch  videos</a>
                    </div>`;
                    mealdetails.appendChild(div)

}