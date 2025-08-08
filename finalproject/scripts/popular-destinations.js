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

        destinationCard.addEventListener('click', async function(){
          let userContactData = getUserContactData() || null;
          if (!userContactData){
            const response = await getUserDataForm();
            if (response){
              userContactData = getUserContactData();
            }
          }
          await sendEmailDetails(destination);
          if (userContactData.whatsapp){
            await sendWhatsAppDetails(destination);
          }
        })
    });
}

loadDestinations();

//============= handle user data functions ========

// async function getUserDataForm(){
//   const result = await Swal.fire({
//     title: 'Please, enter your contact information below to receive this destinations details:',
//     html:
//       '<input id="swal-input-name" class="swal2-input" placeholder="Your name" autocomplete="given-name">' +
//       '<input id="swal-input-email" class="swal2-input" placeholder="Your email" type="email">' +
//       '<input id="swal-input-tel" class="swal2-input" placeholder="WhatsApp Phone Number" type="tel">',
//     showCancelButton: true,
//     confirmButtonText: 'Confirm',
//     cancelButtonText: 'Cancel',
//     preConfirm: () => {
//       const name = document.getElementById('swal-input-name').value;
//       const email = document.getElementById('swal-input-email').value;
//       const tel = document.getElementById('swal-input-tel').value;

//       if (!name && !email) {
//         Swal.showValidationMessage('Please, fill in your name, email and whatsapp phone number first.');
//         return false;
//       }

//       if (!name) {
//         Swal.showValidationMessage('Please, fill in your name first');
//         return false;
//       }

//       if (!email) {
//         Swal.showValidationMessage('Please, fill in your email first');
//         return false;
//       }

//       var whatsapp = false;

//       if (!tel){
//         Swal.fire({
//             title: 'Almost there...',
//             text: 'Would you like to receive information of your destinations of interest on WhatsApp?',
//             showCancelButton: true,
//             confirmButtonText: 'Yes',
//             cancelButtonText: 'No, thanks'
//         }).then((result) =>{
//           if (result.isConfirmed){
//             var code = Math.floor(100000 + Math.random() * 900000);
//             const userContactData = {
//               name: name, 
//               tel: tel, 
//               email: email
//             }
//             await validateWhatsApp(userContactData, code);
//             Swal.fire({
//               title: 'Please, enter the code we have sent to your WhatsApp:',
//               html:
//                 '<input id="swal-input-wwpCode" class="swal2-input" placeholder="WhatsApp Code" type="tel">',
//               showCancelButton: true,
//               confirmButtonText: 'Check code',
//               cancelButtonText: 'Send again',
//               preConfirm: () => {
//                 const wwpCode = document.getElementById('swal-input-wwpCode').value;
//               }
//             }).then((result) =>{
//               if (result.isConfirmed){
//                 if (result.wwpCode == code){
//                   whatsapp = true;
//                     Swal.fire({
//                         title: `Success, ${name}!`,
//                         text: `'Your WhatsApp ${tel} was validated with success!`,
//                         icon: 'success',
//                         confirmButtonText: 'Ok',
//                     })
//                 }
//               } else {
//                 Swal.fire({
//                   title: 'Please, enter the code we have sent to your WhatsApp:',
//                   html:
//                     '<input id="swal-input-wwpCode" class="swal2-input" placeholder="WhatsApp Code" type="tel">',
//                   showCancelButton: true,
//                   confirmButtonText: 'Check code',
//                   cancelButtonText: 'Send again',
//                   preConfirm: () => {
//                     const wwpCode = document.getElementById('swal-input-wwpCode').value;
//                   }
//                 })
//               }
//             })
//           }
//         })
//       }

//       return { name, email, tel };
//     }
//   });
    
//   if (result.isConfirmed) {
//       const { name, email, tel } = result.value;
//       console.log('name:', name);
//       console.log('Email:', email);
//       console.log('Email:', tel);

//       const userContactData = {
//         name: name,
//         email: email,
//         tel: tel
//       }

//       setUserContactData(userContactData);
//       return true;
//   } else {
//     return false;
//   }
// }

async function getUserDataForm() {
  let whatsapp = false;

  const result = await Swal.fire({
    title: 'Please, enter your contact information below to receive this destination\'s details:',
    html:
      '<input id="swal-input-name" class="swal2-input" placeholder="Your name" autocomplete="given-name">' +
      '<input id="swal-input-email" class="swal2-input" placeholder="Your email" type="email">' +
      '<input id="swal-input-tel" class="swal2-input" placeholder="WhatsApp Phone Number" type="tel">',
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    preConfirm: async () => {
      const name = document.getElementById('swal-input-name').value;
      const email = document.getElementById('swal-input-email').value;
      const tel = document.getElementById('swal-input-tel').value;

      if (!name && !email) {
        Swal.showValidationMessage('Please, fill in your name, email and WhatsApp phone number first.');
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
      if (!tel) {
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
    // if (result.isConfirmed){
    //   sendWhatsApp(userContactData, destination);
    //   Swal.fire({
    //       title: `Success, ${userContactData.name}!`,
    //       text: `'${destination.name}' data sent to ${userContactData.tel}`,
    //       icon: 'success',
    //       confirmButtonText: 'Ok',
    //   })
    // }
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
    return true;
  })
  .catch(error => {
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
    return true;
  })
  .catch(error => {
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
    // if (result.isConfirmed){
    //   sendEmail(userContactData, destination);
    //   Swal.fire({
    //       title: `Success, ${userContactData.name}!`,
    //       text: `'${destination.name}' data sent to ${userContactData.email}`,
    //       icon: 'success',
    //       confirmButtonText: 'Ok',
    //   }).then(() =>{
    //     return true;
    //   })
    // }
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