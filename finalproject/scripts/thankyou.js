const params = new URLSearchParams(window.location.search);

const fields = [
    'fname',
    'lname',
    'orgTitle',
    'email',
    'tel',
    'orgName',
    'memberLevel',
    'orgDescription'
];

fields.forEach(field => {
    const value = params.get(field);
    document.getElementById(field).textContent = value || '—';
});