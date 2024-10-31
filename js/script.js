function loadSection(url, target) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la carga de la sección');
            }
            return response.text();
        })
        .then(data => {
            document.querySelector(target).innerHTML = data;

            // Si la sección cargada es "inicio.html", inicializamos el slider
            if (url === 'inicio.html') {
                initSlider();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function initSlider() {
    let slider = document.querySelector('.slider');
    let slides = document.querySelectorAll('.slide');
    let currentIndex = 0;

    function showNextSlide() {
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    setInterval(showNextSlide, 3000); // Cambia la imagen cada 3 segundos
}

document.querySelector('.nav-toggle').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('active');
});
