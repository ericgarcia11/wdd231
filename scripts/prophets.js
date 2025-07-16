const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');


async function getProphetData(){
    const response = await fetch(url);
    const data = await response.json();
    console.table(data.prophets);
    displayProphets(data.prophets);
}

getProphetData();

const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        const card      = document.createElement('section');
        const fullName  = document.createElement('h2');
        const portrait  = document.createElement('img');
        const birthdate = document.createElement('label');
        const birthplace = document.createElement('label');

        card.classList.add('card');
        fullName.textContent    = `${prophet.name} ${prophet.lastname}`;
        birthdate.textContent   = `Date of Birth: ${prophet.birthdate}`;
        birthplace.textContent  = `Place of Birth: ${prophet.birthplace}`;
        portrait.src            = prophet.imageurl;
        portrait.alt            = fullName.textContent;
        portrait.loading        = `lazy`;
        portrait.setAttribute("width","80px");
        portrait.setAttribute("height","100px");

        card.appendChild(fullName);
        card.appendChild(birthdate);
        card.appendChild(birthplace);
        card.appendChild(portrait);
        cards.appendChild(card);
    });
}
