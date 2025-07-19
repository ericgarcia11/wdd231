// ========== load members cards seciton ===========
const membersContainer = document.querySelector('.membersContainer');

async function loadMembers(){
    const response = await fetch('./data/members.json');
    var members = await response.json();
    members = members.filter(member => member.member_level < 3);
    function shuffle(members) {
        for (let i = members.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [members[i], members[j]] = [members[j], members[i]];
        }
        return members;
    }
    members = shuffle(members).slice(0, 3);
    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('memberCard');
        const img = document.createElement('img');
        img.src = member.image;
        img.alt = member.name;
        img.loading = "lazy";
        const cardData = document.createElement('div');
        cardData.classList.add('cardData');
        const memberName = document.createElement('legend');
        memberName.classList.add('memberName');
        memberName.textContent = member.name;
        const memberAddress = document.createElement('legend');
        memberAddress.classList.add('memberAddress');
        memberAddress.textContent = member.address;
        const div = document.createElement('div');
        const phone = document.createElement('legend');
        phone.textContent = 'Phone: ';
        const span = document.createElement('span');
        span.textContent = member.phone;
        div.appendChild(phone);
        div.appendChild(span);

        const div1 = document.createElement('div');
        const website = document.createElement('legend');
        website.textContent = 'Website: ';
        const span1 = document.createElement('span');
        span1.textContent = member.website;
        div1.appendChild(website);
        div1.appendChild(span1);

        const div2 = document.createElement('div');
        const level = document.createElement('legend');
        level.textContent = 'Member Level: ';
        const span2 = document.createElement('span');
        if (member.member_level == 1){
            span2.textContent = 'Gold';
        } else {
            span2.textContent = 'Silver';
        }
        div2.appendChild(level);
        div2.appendChild(span2);
        
        cardData.appendChild(memberName);
        cardData.appendChild(memberAddress);
        cardData.appendChild(div);
        cardData.appendChild(div1);
        cardData.appendChild(div2);
        memberCard.appendChild(img);
        memberCard.appendChild(cardData);
        membersContainer.appendChild(memberCard);
    });
}

loadMembers();

// ============== scroll menu bg color section =============
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 300) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

//  ================= weather section ================



displayWeatherData();

displayForecast();

async function displayForecast(){
    const foreCasts = await getThreeDayForecast();

    console.log(foreCasts);
    const day1 = 'Today';
    const description1 = foreCasts[0].description;
    // const icon1 = foreCasts[0].icon;
    const maxTemp1 = foreCasts[0].maxTemp;


    const foreCast2 = foreCasts[1];
    const dateStr2 = foreCast2.date;
    const date2 = new Date(dateStr2);
    const weekDay2 = date2.getDay();
    const day2 =  getDay(weekDay2);
    const description2 = foreCasts[1].description;
    // const icon2 = foreCasts[1].icon;
    const maxTemp2 = foreCasts[1].maxTemp;

    const foreCast3 = foreCasts[2];
    const dateStr3 = foreCast3.date;
    const date3 = new Date(dateStr3);
    const weekDay3 = date3.getDay();
    const day3 =  getDay(weekDay3);
    const description3 = foreCasts[2].description;
    // const icon3 = foreCasts[2].icon;
    const maxTemp3 = foreCasts[2].maxTemp;

    const forecast = document.getElementById('forecast');
    const legend1 = document.createElement('legend');
    legend1.textContent = `${day1}: ${maxTemp1}°C, ${description1}.`;
    const legend2 = document.createElement('legend');
    legend2.textContent = `${day2}: ${maxTemp2}°C, ${description2}.`;
    const legend3 = document.createElement('legend');
    legend3.textContent = `${day3}: ${maxTemp3}°C, ${description3}.`;

    forecast.appendChild(legend1);
    forecast.appendChild(legend2);
    forecast.appendChild(legend3);
}

function getDay(weekDay){
    if (weekDay == 0){
        return 'Sunday';
    } else if (weekDay == 1){
        return 'Monday';
    } else if (weekDay == 2){
        return 'Tuesday';
    } else if (weekDay == 3){
        return 'Wednesday';
    } else if (weekDay == 4){
        return 'Thrusday';
    } else if (weekDay == 5){
        return 'Friday';
    } else {
        return 'Saturday';
    } 
}

async function getWeather() {
    const lat = -29.3608;
    const lon = -50.8119;
    const key = "8f170162610ad4f194f5353446432099";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;

    // console.log("Chamando API OpenWeather:", url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        // console.error('Erro ao buscar dados da API:', error);
        return null;
    }
}

async function displayWeatherData(){
    const weatherData = await getWeather();

    const weatherContainer = document.getElementById('weatherContainer');
    const temperature   = weatherData.main.temp;
    const tempMin       = weatherData.main.temp_min;
    const tempMax       = weatherData.main.temp_max;
    const humidity      = weatherData.main.humidity;
    const descriptoin   = weatherData.weather[0].description;
    const icon          = weatherData.weather[0].icon;

    const img = document.createElement('img');
    img.src = `images/weather/${icon}.webp`;
    img.alt = descriptoin;
    img.loading = "lazy";

    const weatherDataDiv = document.createElement('div');
    weatherDataDiv.classList.add('weatherData');

    const div1 = document.createElement('div');
    const legend1 = document.createElement('legend');
    legend1.textContent = `${temperature}°C -- ${descriptoin}`;
    div1.appendChild(legend1);

    const div2 = document.createElement('div');
    const legend2 = document.createElement('legend');
    legend2.textContent = `High: `;
    const span2 = document.createElement('span');
    span2.textContent = `${tempMax}°`;
    div2.appendChild(legend2);
    div2.appendChild(span2);

    const div3 = document.createElement('div');
    const legend3 = document.createElement('legend');
    legend3.textContent = `Low: `;
    const span3 = document.createElement('span');
    span3.textContent = `${tempMin}°`;
    div3.appendChild(legend3);
    div3.appendChild(span3);

    const div4 = document.createElement('div');
    const legend4 = document.createElement('legend');
    legend4.textContent = `Humidity: `;
    const span4 = document.createElement('span');
    span4.textContent = `${humidity}%`;
    div4.appendChild(legend4);
    div4.appendChild(span4);

    weatherDataDiv.appendChild(div1);
    weatherDataDiv.appendChild(div2);
    weatherDataDiv.appendChild(div3);
    weatherDataDiv.appendChild(div4);

    weatherContainer.appendChild(img);
    weatherContainer.appendChild(weatherDataDiv);
}

async function getThreeDayForecast() {
    const lat = -29.3608;
    const lon = -50.8119;
    const key = "8f170162610ad4f194f5353446432099";
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const data = await response.json();

        const today = new Date();
        const dates = [
            today,
            new Date(today.getTime() + 86400000),
            new Date(today.getTime() + 2 * 86400000)
        ].map(date => date.toISOString().slice(0, 10)); 

        const dailyForecasts = [];

        dates.forEach(dateStr => {
            const dayData = data.list.filter(item => item.dt_txt.startsWith(dateStr));

            let selected = dayData.find(item => item.dt_txt.includes("12:00:00"));

            if (!selected && dayData.length > 0) {
                selected = dayData[0];
            }

            if (selected) {
                dailyForecasts.push({
                    date: dateStr,
                    maxTemp: selected.main.temp_max,
                    description: selected.weather[0].description,
                    icon: selected.weather[0].icon
                });
            }
        });

        return dailyForecasts;

    } catch (error) {
        console.error("Erro ao buscar forecast:", error);
    }
}
