const counterName = new URLSearchParams(location.search).get('name')
const flagImg = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.country-details h1')
const NativeName = document.querySelector('.country-details .native-name')
const Population = document.querySelector('.country-details .population')
const Region = document.querySelector('.country-details .Region')

const SubRegion = document.querySelector('.country-details .SubRegion')
const Capital = document.querySelector('.country-details .Capital')
const Domain = document.querySelector('.country-details .Domain')
const borderCountries = document.querySelector('.border-countries')
const themeChanger = document.querySelector('.theme-changer')

fetch(`https://restcountries.com/v3.1/name/${counterName}?fullText=true`).then((res)=> res.json())
.then(([country])=>{
  // console.log(country.capital)
  flagImg.src = country.flags.svg
  countryNameH1.innerText = country.name.common
    NativeName.innerHTML = `<b>Native Name: </b>${country.name.common}`

  Population.innerHTML = `<b>Population: </b>${ Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
    country.population,
  )}`
  Region.innerHTML = `<b>Region: </b>${country.region}`

  SubRegion.innerHTML = `<b>Sub Region: </b>${country.subregion}`
  Capital.innerHTML = `<b>Capital: </b>${country.capital}`
  Domain.innerHTML = `<b>Top Level Domain: </b>${country.tld}`

  if(country.borders){
    country.borders.forEach((border)=>{
      // console.log(border);
      fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res)=> res.json())
      .then(([borderCountry])=>{
        // console.log(borderCountry);
        const borderCountryTag = document.createElement('a')
        borderCountryTag.innerText = borderCountry.name.common
        borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
        // console.log(borderCountryTag);
        borderCountries.append(borderCountryTag) 
      })
    })
  }
  
})


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