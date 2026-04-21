// 1. MODO NOTURNO
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Seleciona o ícone dentro do botão
    const icon = themeToggle.querySelector('i');
    
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
});

window.onload = function() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return; // Segurança caso o ID esteja errado

    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.onresize = resize;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
        // Rastro preto transparente
        ctx.fillStyle = "rgba(13, 27, 42, 0.1)"; // Cor do seu fundo dark
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Cor das letras (Azul do seu tema)
        ctx.fillStyle = "#7eec68"; 
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);
};

// 2. CARROSSEL AUTOMÁTICO
let currentSlide = 0;
const slides = document.querySelectorAll('.slider-vertical img');
const legenda = document.getElementById('legenda-foto');

const legendas = [
    "Atividade de Campo na ESA",
    "Formatura do CFGS",
    "Sendo Sargento em Cascavel-PR",
    "Minha Família",
    "Meu Porto Seguro",
    "Minha Paranaense",
    "Que me acompanha nas aventuras",
    "Contemplando o horizonte de Natal-RN",
    "Contemplando o mar de Natal-RN",
    "Meus primeiros 21km",
    "Record Pessoal nos 5km",
    "Sendo feliz na cachoeira",
    "Me amarro em uma aventura"
];

function updateSlides() {
    slides.forEach(slide => slide.classList.remove('active'));
    
    currentSlide++;
    if (currentSlide > slides.length) { currentSlide = 1; }
    
    slides[currentSlide - 1].classList.add('active');
    
    // Evita erro se houver mais slides que legendas
    if (legendas[currentSlide - 1]) {
        legenda.innerText = legendas[currentSlide - 1];
    }
}

// Inicia o loop
setInterval(updateSlides, 3000);

const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Ajusta o tamanho do canvas ao tamanho do header
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    // Fundo semitransparente para criar o efeito de rastro
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cor das letras (usa a sua accent-color ou verde clássico)
    ctx.fillStyle = "#4cc9f0"; // Cor do seu tema dark
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, y * fontSize);

        // Reseta o drop quando chega ao final ou aleatoriamente
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    });
}

// Velocidade da animação (ms)
setInterval(drawMatrix, 50);