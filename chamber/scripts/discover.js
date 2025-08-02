async function loadInterests() {
    const response = await fetch('./data/interests.json');
    const interests = await response.json();
    // console.log(members);
    const interestsContainer = document.getElementById('interestsContainer');
    interests.forEach(interest => {
        const interestCard = document.createElement('div');
        interestCard.classList.add('interestCard');
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = interest.image;
        img.loading = 'lazy';
        img.alt = interest.name;
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        h2.textContent = interest.name;
        const address = document.createElement('address');
        address.textContent = interest.address;
        const p = document.createElement('p');
        p.textContent = interest.description;
        const button = document.createElement('button');
        button.textContent = 'Learn More';
        
        figure.appendChild(img);
        
        div.appendChild(h2);
        div.appendChild(address);
        div.appendChild(p);
        div.appendChild(button);

        interestCard.appendChild(figure);
        interestCard.appendChild(div);

        interestsContainer.appendChild(interestCard);

    });
}

loadInterests();


const visitElement = document.getElementById('visitNotification');
const lastVisit = localStorage.getItem('lastVisit');
const now = new Date();

if (!lastVisit) {
    visitElement.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const lastVisitDate = new Date(lastVisit);
    const timeDiff = now - lastVisitDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 1) {
        visitElement.textContent = "Back so soon! Awesome!";
    } else if (daysDiff === 1) {
        visitElement.textContent = "You last visited 1 day ago.";
    } else {
        visitElement.textContent = `You last visited ${daysDiff} days ago.`;
    }
}

// Atualiza a data de última visita
localStorage.setItem('lastVisit', now.toISOString());