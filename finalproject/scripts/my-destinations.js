
// ============= DATE INPUT SECTION ==============
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const form = document.getElementById('tripForm');

startInput.addEventListener('change', () => {
    endInput.min = startInput.value;
});

form.addEventListener('submit', (event) => {
    if (endInput.value <= startInput.value) {
        alert("The end date must be after the start date.");
        event.preventDefault();
    }
});

// ============= LOAD DESTINATIONS SECTION =============

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    if (params.has('from') && params.has('destination') && params.has('startDate') && params.has('endDate')) {
        const newTrip = {
            from: params.get('from'),
            destination: params.get('destination'),
            startDate: params.get('startDate'),
            endDate: params.get('endDate')
        };

        let myDestinations = JSON.parse(localStorage.getItem('myDestinations')) || [];

        myDestinations.push(newTrip);

        localStorage.setItem('myDestinations', JSON.stringify(myDestinations));
    }

    loadUserDestinations();
});

function loadUserDestinations() {
    const DestinationsDiv = document.getElementById('Destinations');
    DestinationsDiv.innerHTML = '';

    const myDestinations = JSON.parse(localStorage.getItem('myDestinations')) || [];

    myDestinations.forEach(dest => {
        const destinationCard = document.createElement('div');
        destinationCard.classList.add('destinationCard');

        const cardLabels = document.createElement('div');
        cardLabels.classList.add('cardLabels');

        const h2 = document.createElement('h2');
        h2.textContent = `${dest.from} → ${dest.destination}`;

        const p1 = document.createElement('p');
        p1.textContent = `Departure: ${dest.startDate}`;

        const p2 = document.createElement('p');
        p2.textContent = `Return: ${dest.endDate}`;

        cardLabels.appendChild(h2);
        cardLabels.appendChild(p1);
        cardLabels.appendChild(p2);
        destinationCard.appendChild(cardLabels);
        DestinationsDiv.appendChild(destinationCard);
    });
}


//============= handle user data functions ========

async function getUserDataForm() {
  let whatsapp = false;

  const result = await Swal.fire({
    title: 'Please, enter your contact information below to receive this destination\'s details:',
    html:
      '<input id="swal-input-name" class="swal2-input" placeholder="Your name" autocomplete="given-name">' +
      '<input id="swal-input-email" class="swal2-input" placeholder="Your email" type="email">' +
      '<input id="swal-input-tel" class="swal2-input" placeholder="Phone Number" type="tel">',
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    preConfirm: async () => {
      const name = document.getElementById('swal-input-name').value;
      const email = document.getElementById('swal-input-email').value;
      var tel = document.getElementById('swal-input-tel').value;

      if (!name && !email) {
        Swal.showValidationMessage('Please, fill in your name, email and phone number first.');
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

      // Verificação de WhatsApp
      if (tel) {
        const askWhatsApp = await Swal.fire({
          title: 'Almost there...',
          text: 'Would you like to receive destination info on WhatsApp?',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No, thanks'
        });

        if (askWhatsApp.isConfirmed) {
          let validado = false;
          let code = '';
          let attempts = 0;
          let phone = '';

          while (!validado && attempts < 3) {
            const { value: telInput } = await Swal.fire({
              title: 'Enter your WhatsApp number:',
              input: 'tel',
              inputPlaceholder: 'e.g. +55 99 99999-9999',
              showCancelButton: true,
              confirmButtonText: 'Send code'
            });

            if (!telInput) break;

            phone = telInput;
            code = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');

            // Envia o código para o WhatsApp
            await validateWhatsApp({ name, email, tel: phone }, code);

            const { value: inputCode } = await Swal.fire({
              title: 'Enter the code we sent to WhatsApp:',
              input: 'text',
              inputPlaceholder: '6-digit code',
              showCancelButton: true,
              confirmButtonText: 'Validate',
              cancelButtonText: 'Resend'
            });

            if (inputCode === code) {
              whatsapp = true;
              tel = phone;
              await Swal.fire({
                title: `Success, ${name}!`,
                text: `Your WhatsApp ${tel} was validated successfully!`,
                icon: 'success'
              });
              validado = true;
              break;
            } else {
              attempts++;
              await Swal.fire({
                icon: 'error',
                title: 'Invalid code',
                text: 'Please check the code and try again.'
              });
            }
          }
        }
      }

      return { name, email, tel, whatsapp };
    }
  });

  if (result.isConfirmed) {
    const { name, email, tel, whatsapp } = result.value;

    const userContactData = {
      name,
      email,
      tel,
      whatsapp
    };

    setUserContactData(userContactData);
    return userContactData;
  } else {
    return null;
  }
}

function getUserContactData(){
    return JSON.parse(localStorage.getItem(`userContactData`));
}

function setUserContactData(userContactData){
    localStorage.setItem(`userContactData`, JSON.stringify(userContactData));
};

// =========== send whatsapp functions ============

async function sendWhatsAppDetails(destination){
  let userContactData = getUserContactData() || null;
  if (!userContactData){
    const response = await getUserDataForm();
    if (response){
      userContactData = getUserContactData();
    } else {
      return null;
    }
  } else {
    const result = await Swal.fire({
        title: `Would you like to receive this destination details on your WhatsApp ${userContactData.tel}?`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Receive on WhatsApp',
        cancelButtonText: 'No, thanks',
    })
    if (result.isConfirmed){
      sendWhatsApp(userContactData, destination);
      // Swal.fire({
      //     title: `Success, ${userContactData.name}!`,
      //     text: `'${destination.name}' data sent to ${userContactData.tel}`,
      //     icon: 'success',
      //     confirmButtonText: 'Ok',
      // })
    }
  }
}

function sendWhatsApp(userContactData, destination) {
  fetch('https://apiwp.spaceimob.app.br/message/sendMedia/eric_byu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apiKey': 'B1C3F8B00411-46FD-967A-6F78A314CA5E'
    },
    body: JSON.stringify({
        number    :`${userContactData.tel}@s.whatsapp.net`,
        mediatype :"image",
        media     : destination.public_url,
        caption   : `Hi ${userContactData.name},  here are the details for *${destination.name}* \n\n*Description:* ${destination.description}.\n\n*Average Weekly Cost USD:* ${destination.average_weekly_cost_usd}.`
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.status);
    }
    // return response.json();
    return true;
  })
  .then(data => {
    console.log(data)
    return true;
  })
  .catch(error => {
    console.log(error)
    return null;
  });
}

function validateWhatsApp(userContactData, code){
  fetch('https://apiwp.spaceimob.app.br/message/sendText/eric_byu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apiKey': 'B1C3F8B00411-46FD-967A-6F78A314CA5E'
    },
    body: JSON.stringify({
        number    :`${userContactData.tel}@s.whatsapp.net`,
        text   : `Hi ${userContactData.name}! Here is your verification code: *${code}*.`
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.status);
    }
    // return response.json();
    return true;
  })
  .then(data => {
    console.log(data)
    return true;
  })
  .catch(error => {
    console.log(error)
    return null;
  });
}

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
  } else {
    const result = await Swal.fire({
        title: `Would you like to receive this destination details on your email ${userContactData.email}?`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Receive on email',
        cancelButtonText: 'No, thanks',
    })
    if (result.isConfirmed){
      sendEmail(userContactData, destination);
      // Swal.fire({
      //     title: `Success, ${userContactData.name}!`,
      //     text: `'${destination.name}' data sent to ${userContactData.email}`,
      //     icon: 'success',
      //     confirmButtonText: 'Ok',
      // }).then(() =>{
      //   return true;
      // })
    }
  }
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
      subject: `${userContactData.name}, check '${destination.name}' details here!!`,
      title: `Here are your destination ${userContactData.name}!`,
      destinationName: destination.name,
      destinationDescription: destination.description,
      USD: String(destination.average_weekly_cost_usd)
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