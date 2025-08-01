const levelCards = document.getElementById('levelCards');
const memberLevelDetails = document.getElementById('memberDetails');
const memberLevels = [
    {
        level: 'Gold',
        description: 'Top-tier membership with maximum visibility, exclusive event access, and premium benefits.'
    },
    {
        level: 'Silver',
        description: 'Mid-tier membership offering solid visibility and access to a wide range of chamber benefits.'
    },
    {
        level: 'Bronze',
        description: 'Entry-level membership with essential benefits for growing businesses.'
    },
    {
        level: 'NP',
        description: 'Special membership for non-profit organizations with tailored support and reduced fees.'
    }
];

memberLevels.forEach(memberLevel => {
    displayMemberLevelsCards(memberLevel);
})

function displayMemberLevelsCards(memberLevel){
    const div = document.createElement('div');
    div.classList.add('memberLevelCard');
    div.classList.add(`${memberLevel.level}`);
    const h3 = document.createElement('h3');
    h3.textContent = `${memberLevel.level} Membership Level`;
    const button = document.createElement('button');
    button.textContent = 'Learn More';
    div.appendChild(h3);
    div.appendChild(button);
    levelCards.appendChild(div);
    button.addEventListener('click', function(){
        displaymemberLevelDetails(memberLevel);
    });
}

function displaymemberLevelDetails(memberLevel) {
  memberLevelDetails.innerHTML = '';
  memberLevelDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${memberLevel.level}</h2>
    <p><strong>Description</strong>: ${memberLevel.description}</p>
  `;
  memberLevelDetails.showModal();
  
  closeModal.addEventListener("click", () => {
    memberLevelDetails.close();
  });
}