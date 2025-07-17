const yearSpan = document.querySelector("footer span");
const currentYear = new Date().getFullYear();
yearSpan.textContent = ` © ${currentYear}`;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last modified: ${lastModified}`;

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

// ============ theme section ============
const themeImg  = document.getElementById('theme');
const logoImg   = document.getElementById('logo');
const igImg   = document.getElementById('instagram');
const gitImg   = document.getElementById('github');
const lkImg   = document.getElementById('linkedin');

let theme = getTheme() || `light`;

if (theme === 'dark'){
    document.documentElement.classList.add('dark');
    themeImg.setAttribute(`src`,`images/theme.svg`);
    logoImg.setAttribute(`src`,`images/logo_white.svg`);
    igImg.setAttribute(`src`,`images/instagram_white.svg`);
    gitImg.setAttribute(`src`,`images/github_white.svg`);
    lkImg.setAttribute(`src`,`images/linkedin_white.svg`);
} else {
    themeImg.setAttribute(`src`,`images/theme_black.svg`);
    logoImg.setAttribute(`src`,`images/logo_black.svg`);
    igImg.setAttribute(`src`,`images/instagram_black.svg`);
    gitImg.setAttribute(`src`,`images/github_black.svg`);
    lkImg.setAttribute(`src`,`images/linkedin_black.svg`);
}

function getTheme(){
    return JSON.parse(localStorage.getItem(`theme`));
}

function setTheme(){
    localStorage.setItem(`theme`, JSON.stringify(theme));
};

themeImg.addEventListener('click', function(){
    document.documentElement.classList.toggle('dark');
    if (document.documentElement.classList == 'dark'){
        theme = `dark`;
        themeImg.setAttribute(`src`,`images/theme.svg`);
        logoImg.setAttribute(`src`,`images/logo_white.svg`);
        igImg.setAttribute(`src`,`images/instagram_white.svg`);
        gitImg.setAttribute(`src`,`images/github_white.svg`);
        lkImg.setAttribute(`src`,`images/linkedin_white.svg`);
    } else {
        theme = 'light';
        themeImg.setAttribute(`src`,`images/theme_black.svg`);
        logoImg.setAttribute(`src`,`images/logo_black.svg`);
        igImg.setAttribute(`src`,`images/instagram_black.svg`);
        gitImg.setAttribute(`src`,`images/github_black.svg`);
        lkImg.setAttribute(`src`,`images/linkedin_black.svg`);
    }
    setTheme();
    // console.log(theme);
})

window.addEventListener('resize', () => {
    // console.log(`Largura: ${window.innerWidth}px, Altura: ${window.innerHeight}px`);
    if (window.innerWidth <= 822) {
         handleMenuLarge()
    } else {
        handleMenu();
    }
});

window.addEventListener('load', () => {
    if (window.innerWidth <= 822) {
         handleMenuLarge()
    } else {
        handleMenu();
    }
});

function handleMenuLarge(){
    let nav = document.getElementById('navigation');
    let openNav = document.getElementById('openNav');
    let closeNav = document.getElementById('closeNav');
    nav.style.display = 'none';
    openNav.style.display = '';
    closeNav.style.display = '';

    openNav.addEventListener('click', function(){
        nav.style.display = '';
        openNav.style.display = 'none';
    })

    closeNav.addEventListener('click', function(){
        nav.style.display = 'none';
        openNav.style.display = '';
    })
}

function handleMenu(){
    let nav = document.getElementById('navigation');
    let openNav = document.getElementById('openNav');
    let closeNav = document.getElementById('closeNav');
    nav.style.display = 'flex';
    openNav.style.display = 'none';
    closeNav.style.display = 'none';
}