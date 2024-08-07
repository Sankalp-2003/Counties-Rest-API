const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
const themeChanger = document.querySelector('.theme-changer')


let allCountriesData 

fetch('https://restcountries.com/v3.1/all')
.then((res)=> res.json())
.then((data) => {
  renderCountries(data)
  allCountriesData = data
})

filterByRegion.addEventListener('change',(e)=>{
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
.then((res)=> res.json())
.then(renderCountries)
  
})

function renderCountries(data){
  countriesContainer.innerHTML = ''
  data.forEach((country)=>{
    // console.log(country.region);
    
    
const countryCard = document.createElement('a')

countryCard.classList.add('country-card')
countryCard.href = `/country.html?name=${country.name.common}`

countryCard.innerHTML = `
 <img src="${country.flags.svg}" alt="flag">
        <div class="card-text">
          <h3>${country.name.common}</h3>
          <p><b>Population: </b>${ Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
            country.population,
          )}</p>
          <p><b>Region: </b>${country.region}</p>
          <p><b>Capital: </b>${country.capital}</p>
        </div>
`

countriesContainer.append(countryCard)
  })
}

searchInput.addEventListener('input',(e)=>{
  // console.log(allCountriesData.filter((country)));
  const filterdeCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  console.log(filterdeCountries);
  renderCountries(filterdeCountries)
})

// localStorage.setItem('theme', '')

// themeChanger.addEventListener('click',()=>{
//   let currentTheme = localStorage.getItem('theme')
//   if(currentTheme === 'light'){
//     console.log('i is light');
//     currentTheme = 'dark'
  
//   }else{
//     console.log('it is dark');
//     currentTheme = 'light'
//   }
// })

function applayTheme(theme){
  if(theme === 'dark'){
    document.body.classList.add('dark')
    themeChanger.innerHTML = `<i class="fa-regular fa-sun"></i> &nbsp;&nbsp;Light Mode`;
  }else{
    document.body.classList.remove('dark')
    themeChanger.innerHTML = `<i class="fa-regular fa-moon"></i> &nbsp;&nbsp;Dark Mode`;
  }
}

const currentTheme = localStorage.getItem('theme') || 'light'
applayTheme(currentTheme)

themeChanger.addEventListener('click',()=>{
  const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark'
  applayTheme(newTheme)

  localStorage.setItem('theme', newTheme)
})



