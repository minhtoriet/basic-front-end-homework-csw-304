document.querySelector(".mobile-menu").addEventListener('click', () => {
    document.querySelector(".mobile-nav").classList.toggle('show');
});
document.querySelector('.submit-btn').addEventListener('click', () => {
    let isValid = true;
    function showError(element) {
        element.classList.add('red-border');
        setTimeout(() => {
            element.classList.remove('red-border');
        }, 5000);
        isValid = false;
    }
    let email = document.querySelector('#form-email');
    let name = document.querySelector('#form-name');
    if (name.value.trim() === '') showError(name);
    if (email.value.trim() === '') showError(email);
    if (document.querySelector('#form-datetime').value.trim() === '') showError(document.querySelector('#form-datetime'));

    let emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        showError(email);
    }
    if (name.value.length > 100) {
        showError(name);
    }
    if (document.querySelector('#form-request').value.length > 250) {
        showError(document.querySelector('#form-request'));
    }

});
document.addEventListener('DOMContentLoaded', function () {
    const toTopBtn = document.querySelector('.to-top-button');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            toTopBtn.style.display = 'block';
            toTopBtn.style.opacity = '1';
        } else {
            toTopBtn.style.opacity = '0';
            setTimeout(() => {
                toTopBtn.style.display = 'none';
            }, 200); 
        }
    });
    toTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});