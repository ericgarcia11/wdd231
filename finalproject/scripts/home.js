document.getElementById('ctaBtn').addEventListener('click', function(){
    window.location.href = 'my-destinations.html';
})

// ============== scroll menu bg color section =============
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 300) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});