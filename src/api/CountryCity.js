import React from "react";
import { useState, useEffect, useRef } from "react";
import axois from "axios"

const CountryAPi = () => {

    const [countriesData, setCountriesData] = useState([])
    const [countryName, setCountryName] = useState("")
    const formRef = useRef(null)

        const fetchApi = async () => {
            try{
                const response = await axois.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
                console.log(response.data)
                const getCountryNames = response.data.map(country => ({
                    
                    flag: country.flag,
                    coastOfArms: 
                    `https://mainfacts.com/media/images/coats_of_arms/${country.cca2.toLowerCase()}.png`,
                    name: country.name.common,
                    capital: country.capital,
                    language: Object.values(country.languages).map(lang => lang).join(''),
                    region: country.region, 
                    currencies: Object.values(country.currencies).map(curr => `${curr.name} ${curr.symbol}` ).join('')
                    
                }));
                getCountryNames.sort((a, b) => a.name.localeCompare(b.name))
                setCountriesData(getCountryNames)

            
        }
        catch(error){
            console.log(error, "error")
        }
    }
    
    const onButtonFocus= () => {
        formRef.current.focus();
        console.log("Focused")
    }
    
    function handleForm (e)  {
        e.preventDefault()
        fetchApi()
    }
    const handleInputChange = (e) => {
        setCountryName(e.target.value)
    }
    function windowLoad() {
        window.location.reload();
    }



    return(
        <header>
            <main className="container">
                <div className="country">
                    
                    <div className="input-button-container">
                    <form className="form-container" onSubmit={handleForm}>
                        <input
                        ref={formRef}
                        placeholder="Country?"
                        type="text"
                        value={countryName}
                        onChange={handleInputChange}
                        />     
                        <button className="button-search" type="submit">Search...</button>    
                        <button className="button-focus" onClick={onButtonFocus}>Focus input</button>       
                    </form>
                          
                        </div>
                        {countriesData.length > 0 && (
                            <div className="container-information">
                        
                    <ul>
                    {countriesData.map((city, index) => (
                        <li className="info-list" key={index}>
                            <div className="flag-container">
                            <span className="Flag">{city.flag}</span>
                            {city.coastOfArms && (
                <img className="coastOfArms" src={city.coastOfArms} alt={`Coat of Arms for ${city.name}`} />
            )}
                            </div>
                            <div className="list-items">
                            <strong className="Country"><span className="country-span">{city.name} </span></strong>
                            <strong className="Capital">Capital: {city.capital} </strong>
                            <strong className="Language">Language: {city.language}</strong>
                            <strong className="Region">Region: {city.region} </strong>
                            <strong className="Currencies">Currencies: {city.currencies} </strong>
                            </div>
                        </li>
                    ))}
                    <a onClick={windowLoad} className="reload-page"><span>Try Again</span></a>
                    </ul>
                    </div>
                )}
                    
                </div>
            </main>
        </header>
    )
}

export default CountryAPi;