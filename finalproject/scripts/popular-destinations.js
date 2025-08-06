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
          console.log("a");
          sendEmailDetails();
        })
    });
}

loadDestinations();

// ============ send email functions ==============

function sendEmailDetails(){
  Swal.fire({
    title: 'Would you like to receive this destination details on you email?',
    html:
      '<input id="swal-input-nome" class="swal2-input" placeholder="Your name" autocomplete="given-name">' +
      '<input id="swal-input-email" class="swal2-input" placeholder="Your email" type="email">',
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    preConfirm: () => {
      const nome = document.getElementById('swal-input-nome').value;
      const email = document.getElementById('swal-input-email').value;

      if (!nome && !email) {
        Swal.showValidationMessage('Please, fill in your name and email first');
        return false;
      }

      if (!nome) {
        Swal.showValidationMessage('Please, fill in your name first');
        return false;
      }

      if (!email) {
        Swal.showValidationMessage('Please, fill in your email first');
        return false;
      }

      return { nome, email };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const { nome, email } = result.value;
      console.log('Nome:', nome);
      console.log('Email:', email);

      // Aqui você chama sua função passando os dados
      sendEmail(nome, email);
    }
  });
}

function sendEmail(nome, email) {
  fetch('https://openai.sobressai.com.br/emails/send-email-template', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      to: email, 
      sender: "ericrggarcia@outlook.com",
      subject: "Your destination details!",
      title: `Welcome ${nome}!`,
      destinationName: "Gramado - RS",
      destinationDescription: "description description description descriptiondescription description descriptiondescriptiondescriptiondescriptiondescriptiondescription description description description",
      USD: "120000"
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
