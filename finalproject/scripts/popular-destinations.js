// ============ load Destinations cards section ============
async function loadDestinations() {
    const response = await fetch('./data/popular_destinations.json');
    const Destinations = await response.json();
    // console.log(Destinations);
    const DestinationsDiv = document.getElementById('Destinations');
    Destinations.forEach(destination => {
        // console.log(destination);
        const destinationCard = document.createElement('div');
        destinationCard.classList.add('destinationCard');

        const img = document.createElement('img');
        img.src = destination.image;
        img.loading = 'lazy';
        img.alt = destination.name;

        const cardLabels = document.createElement('div');
        cardLabels.classList.add('cardLabels');

        const h2 = document.createElement('h2');
        h2.textContent = destination.name;

        const p = document.createElement('p');
        p.textContent = destination.description;

        const cardLabel = document.createElement('div');
        cardLabel.classList.add('cardLabel');

        const label = document.createElement('label');
        label.textContent = 'Average weekly cost U$:';

        const span = document.createElement('span');
        span.textContent = destination.average_weekly_cost_usd;

        cardLabel.appendChild(label);
        cardLabel.appendChild(span);
        cardLabels.appendChild(h2);
        cardLabels.appendChild(p);
        cardLabels.appendChild(cardLabel);
        destinationCard.appendChild(img);
        destinationCard.appendChild(cardLabels);
        DestinationsDiv.appendChild(destinationCard);

        destinationCard.addEventListener('click', function(){
          sendEmailDetails(destination);
        })
    });
}

loadDestinations();

//============= handle user data functions ========

async function getUserDataForm(){
  const result = await Swal.fire({
    title: 'Please, enter your contact information below to receive this destinations details:',
    html:
      '<input id="swal-input-name" class="swal2-input" placeholder="Your name" autocomplete="given-name">' +
      '<input id="swal-input-email" class="swal2-input" placeholder="Your email" type="email">' +
      '<input id="swal-input-tel" class="swal2-input" placeholder="WhatsApp Phone Number" type="tel">',
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    preConfirm: () => {
      const name = document.getElementById('swal-input-name').value;
      const email = document.getElementById('swal-input-email').value;
      const tel = document.getElementById('swal-input-tel').value;

      if (!name && !email) {
        Swal.showValidationMessage('Please, fill in your name, email and whatsapp phone number first.');
        return false;
      }

      if (!name) {
        Swal.showValidationMessage('Please, fill in your name first');
        return false;
      }

      if (!email) {
        Swal.showValidationMessage('Please, fill in your email first');
        return false;
      }

      return { name, email, tel };
    }
  });
    
  if (result.isConfirmed) {
      const { name, email, tel } = result.value;
      console.log('name:', name);
      console.log('Email:', email);
      console.log('Email:', tel);

      const userContactData = {
        name: name,
        email: email,
        tel: tel
      }

      setUserContactData(userContactData);
      return true;
  } else {
    return false;
  }
}

function getUserContactData(){
    return JSON.parse(localStorage.getItem(`userContactData`));
}

function setUserContactData(userContactData){
    localStorage.setItem(`userContactData`, JSON.stringify(userContactData));
};

// ============ send email functions ==============

async function sendEmailDetails(destination){
  let userContactData = getUserContactData() || null;
  if (!userContactData){
    const response = await getUserDataForm();
    if (response){
      userContactData = getUserContactData();
    } else {
      return null;
    }
  }
  sendEmail(userContactData, destination);
  console.log(userContactData);
  console.log(destination);
}

function sendEmail(userContactData, destination) {
  fetch('https://openai.sobressai.com.br/emails/send-email-template', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eric_dev_key'
    },
    body: JSON.stringify({
      to: userContactData.email, 
      sender: "ericrggarcia@outlook.com",
      subject: `${userContactData.name}, your destination are here!!`,
      title: `Here are your destination ${userContactData.name}!`,
      destinationName: destination.name,
      destinationDescription: destination.description,
      USD: destination.average_weekly_cost_usd
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log('Sucesso:', data);
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}

// ============ menu class section ============
const Destinations = document.getElementById('Destinations');
const gridButton = document.getElementById('grid');
const listButton = document.getElementById('list');
let menuClass = getMenuClass() || `DestinationsGrid`;

function getMenuClass(){
    return JSON.parse(localStorage.getItem(`menuClass`));
}

function setMenuClass(){
    localStorage.setItem(`menuClass`, JSON.stringify(menuClass));
};

if (menuClass === 'DestinationsGrid'){
    Destinations.classList.add('DestinationsGrid');
    Destinations.classList.remove('DestinationsList');
} else {
    Destinations.classList.remove('DestinationsGrid');
    Destinations.classList.add('DestinationsList');
}

gridButton.addEventListener('click', function(){
    Destinations.classList.add('DestinationsGrid');
    Destinations.classList.remove('DestinationsList');
    menuClass = 'DestinationsGrid';
    setMenuClass();
})

listButton.addEventListener('click', function(){
    Destinations.classList.remove('DestinationsGrid');
    Destinations.classList.add('DestinationsList');
    menuClass = 'DestinationsList';
    setMenuClass();
})


window.addEventListener("resize", function () {
  loadStyleCards();
});

loadStyleCards();

function loadStyleCards(){
  if (window.innerWidth < 640) {
    Destinations.classList.remove('DestinationsGrid');
    Destinations.classList.add('DestinationsGrid');
    Destinations.classList.remove('DestinationsList');
    document.getElementById('menu').style.display = 'none';
    document.querySelector('h1').style.marginBottom = '1rem';
  } else {
    document.querySelector('h1').style.marginBottom = '0';
    Destinations.classList.remove('DestinationsGrid');
    Destinations.classList.remove('DestinationsList');
    Destinations.classList.add(getMenuClass() || `DestinationsGrid`);
    document.getElementById('menu').style.display = 'flex';
  }
}