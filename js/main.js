let weather = {
    apiKey : "1e7aedbad81635f05d3640a06d16ea84",
    fetchWeather : function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&appid=" 
        + this.apiKey)
        .then((response)=> {
            if(!response.ok){
                alert('No Location Found.');
                throw new Error('No Location Found.');
            }
            return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather : function(data){
        const { name } = data;
        const {icon, main, description} = data.weather[0];
        const { temp, humidity} = data.main;
        const { speed } = data.wind;

        document.querySelector('.city-name').innerText = name;
        document.querySelector('.icon').src = "http://openweathermap.org/img/w/" + icon + ".png";
        document.querySelector('.main-weather').innerText = main;
        let farToC = Number((temp - 273.15));
        let floatToInt = parseInt(farToC);
        document.querySelector('.temp').innerText = floatToInt + " °C";

        let humidityFloat = parseInt(humidity);
        document.querySelector('.humidity').innerText = 'Humidity: ' + humidityFloat + "%";
        document.querySelector('.description').innerText = 'Weather Description: ' + description;
        document.querySelector('.wind').innerText = "Wind Speed : " + speed + "km/h";
    },
    search : function(){
        this.fetchWeather(document.querySelector('.searchInput').value);
    }
}

    document.querySelector('.search-button').addEventListener('click',()=>{
        weather.search();
        document.querySelector('.detailsTitle').style.opacity = '1';
        document.querySelector('.searchInput').value = '';
        document.querySelector('label').classList.remove('label-transform');
    })



document.querySelector('.searchInput').addEventListener('click',()=>{
    let label = document.querySelector('.label');
    label.classList.add('label-transform');
    document.querySelector('.line').classList.add('line-appear')
})

document.querySelector('.searchInput').addEventListener('keyup',(e)=>{
    if(e.key == "Enter"){
        weather.search();
        document.querySelector('.detailsTitle').style.opacity = '1';
        document.querySelector('.searchInput').value = '';
        document.querySelector('label').classList.remove('label-transform');
        document.querySelector('.line').classList.remove('line-appear')
    }
})

document.addEventListener('click',(e)=>{
    if(e.target != document.querySelector('.searchInput')){
        document.querySelector('label').classList.remove('label-transform');
        document.querySelector('.line').classList.remove('line-appear')
        return
    }
})