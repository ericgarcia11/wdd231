// ============ load members cards section ============
async function loadMembers() {
    const response = await fetch('./data/members.json');
    const members = await response.json();
    // console.log(members);
    const membersDiv = document.getElementById('members');
    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('memberCard');
        memberCard.id   =   member.id;

        const img = document.createElement('img');
        img.src = member.image;
        img.loading = 'lazy';
        img.alt = member.name;

        const cardLabels = document.createElement('div');
        cardLabels.classList.add('cardLabels');

        const cardLabelName = document.createElement('div');
        cardLabelName.classList.add('cardLabel');
        const labelName = document.createElement('label');
        labelName.textContent = 'Name:';
        const spanName  = document.createElement('span');
        spanName.textContent = member.name;
        cardLabelName.appendChild(labelName);
        cardLabelName.appendChild(spanName);

        const cardLabelAddress = document.createElement('div');
        cardLabelAddress.classList.add('cardLabel');
        const labelAddress = document.createElement('label');
        labelAddress.textContent = 'Address:';
        const spanAddress  = document.createElement('span');
        spanAddress.textContent = member.address;
        cardLabelAddress.appendChild(labelAddress);
        cardLabelAddress.appendChild(spanAddress);

        const cardLabelWebsite = document.createElement('div');
        cardLabelWebsite.classList.add('cardLabel');
        const labelWebsite = document.createElement('label');
        labelWebsite.textContent = 'Website:';
        const spanWebsite  = document.createElement('span');
        spanWebsite.textContent = member.website;
        cardLabelWebsite.appendChild(labelWebsite);
        cardLabelWebsite.appendChild(spanWebsite);

        const cardLabelPhone = document.createElement('div');
        cardLabelPhone.classList.add('cardLabel');
        const labelPhone = document.createElement('label');
        labelPhone.textContent = 'Phone:';
        const spanPhone  = document.createElement('span');
        spanPhone.textContent = member.phone;
        cardLabelPhone.appendChild(labelPhone);
        cardLabelPhone.appendChild(spanPhone);

        cardLabels.appendChild(cardLabelName);
        cardLabels.appendChild(cardLabelAddress);
        cardLabels.appendChild(cardLabelWebsite);
        cardLabels.appendChild(cardLabelPhone);

        memberCard.appendChild(img);
        memberCard.appendChild(cardLabels);

        membersDiv.appendChild(memberCard);
    });
}

loadMembers();

// ============ menu class section ============
const members = document.getElementById('members');
const gridButton = document.getElementById('grid');
const listButton = document.getElementById('list');
let menuClass = getMenuClass() || `membersGrid`;

function getMenuClass(){
    return JSON.parse(localStorage.getItem(`menuClass`));
}

function setMenuClass(){
    localStorage.setItem(`menuClass`, JSON.stringify(menuClass));
};

if (menuClass === 'membersGrid'){
    members.classList.add('membersGrid');
    members.classList.remove('membersList');
} else {
    members.classList.remove('membersGrid');
    members.classList.add('membersList');
}

gridButton.addEventListener('click', function(){
    members.classList.add('membersGrid');
    members.classList.remove('membersList');
    menuClass = 'membersGrid';
    setMenuClass();
})

listButton.addEventListener('click', function(){
    members.classList.remove('membersGrid');
    members.classList.add('membersList');
    menuClass = 'membersList';
    setMenuClass();
})
