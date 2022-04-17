 function attachEvents() {
    document.getElementById('submit').addEventListener('click', display);
    const locationElement = document.getElementById('location');
    const forecastElement = document.getElementById('forecast');
    const currentWeatherElement = forecastElement.children[0];
    const upcomingWeatherElement = forecastElement.children[1];

    
    async function getLocation(){
        const url = 'http://localhost:3030/jsonstore/forecaster/locations';
        try{
            const res = await fetch(url);
            const data = await res.json();
            
           const index = data.findIndex(c=> c.name == locationElement.value) ;
           
            if(res.status != 200 || index == -1){
                throw new Error('Invalid location');
            }
            return data[index].code;
        }catch{
            forecastElement.style.display = '';
            forecastElement.textContent = 'Error';
        }
    }

    async function getCurrentWeather(code){
        const urlToday = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
        const resToday = await fetch(urlToday);
        const dataToday = await resToday.json();

        return dataToday;
    }

    async function getUpcomingWeather(code){
        const urlUpcoming = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;
        const resUpcoming = await fetch(urlUpcoming);
        const dataUpcoming = await resUpcoming.json();

        return dataUpcoming;
    }

    async function display(){
        
        const locationCode = await getLocation();

        locationElement.value = '';

        const[currentWeatherObj, upcomingWeatherObj] = await Promise.all([getCurrentWeather(locationCode), getUpcomingWeather(locationCode)]);

        const symbols = {
            'Sunny': '\u2600',
            'Partly sunny': '\u26C5',
            'Overcast': '\u2601',
            'Rain': '\u2614',
            'Degrees': '\xB0'
        }

        currentWeatherDisplay(currentWeatherObj);
        upcomingWeatherDisplay(upcomingWeatherObj);

        function currentWeatherDisplay(obj) {
            forecastElement.style.display = 'block';
            currentWeatherElement.replaceChildren();

            const div = document.createElement('div');
            div.classList.add('forecasts');

            const spanSymbol = document.createElement('span');
            spanSymbol.classList.add('condition-symbol');
            spanSymbol.textContent =symbols[obj.forecast.condition];

            const spanCondition = document.createElement('span');
            spanCondition.classList.add('condition');
            const span1 = document.createElement('span');
            span1.classList.add('forecast-data');
            span1.textContent = obj.name;
            const span2 = document.createElement('span');
            span2.classList.add('forecast-data');
            span2.textContent = `${obj.forecast.low}${symbols['Degrees']}/${obj.forecast.high}${symbols['Degrees']}`;
            const span3 = document.createElement('span');
            span3.classList.add('forecast-data');
            span3.textContent = obj.forecast.condition;
            
            spanCondition.appendChild(span1);
            spanCondition.appendChild(span2);
            spanCondition.appendChild(span3);

            div.appendChild(spanSymbol);
            div.appendChild(spanCondition);

            currentWeatherElement.appendChild(div);
        }

        function upcomingWeatherDisplay(obj){
            forecastElement.style.display = 'block';
            upcomingWeatherElement.replaceChildren();

            const div = document.createElement('div');
            div.classList.add('forecasts-info');

            for(let el of obj.forecast){
                const spanUpcoming = document.createElement('span');
                spanUpcoming.classList.add('condition');
                
                    const span1 = document.createElement('span');
                    span1.classList.add('symbol');
                    span1.textContent = symbols[el.condition];

                const span2 = document.createElement('span');
                span2.classList.add('forecast-data');
                span2.textContent = `${el.low}${symbols['Degrees']}/${el.high}${symbols['Degrees']}`;
            const span3 = document.createElement('span');
            span3.classList.add('forecast-data');
            span3.textContent = el.condition;

            spanUpcoming.appendChild(span1);
            spanUpcoming.appendChild(span2);
            spanUpcoming.appendChild(span3);
            div.appendChild(spanUpcoming);
            }
            upcomingWeatherElement.appendChild(div);
        }
        
    }
}

attachEvents();