// ============ footer section ============
const yearSpan = document.querySelector("footer span");
const currentYear = new Date().getFullYear();
yearSpan.textContent = ` © ${currentYear}`;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last modified: ${lastModified}`;


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
    logoImg.setAttribute(`src`,`images/logo_light.svg`);
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

// ============ handle responsive menu section ============

themeImg.addEventListener('click', function(){
    document.documentElement.classList.toggle('dark');
    if (document.documentElement.classList == 'dark'){
        theme = `dark`;
        themeImg.setAttribute(`src`,`images/theme.svg`);
        logoImg.setAttribute(`src`,`images/logo_light.svg`);
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
    themeImg.style.display = '';

    openNav.addEventListener('click', function(){
        nav.style.display = '';
        openNav.style.display = 'none';
        themeImg.style.display = 'none';
    })

    closeNav.addEventListener('click', function(){
        nav.style.display = 'none';
        openNav.style.display = '';
        themeImg.style.display = '';
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