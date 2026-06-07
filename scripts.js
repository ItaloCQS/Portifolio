/**
 * @param {string} id
 * @param {string} path
 */
async function loadComponent(id, path) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const response = await fetch(path);        
    const html = await response.text();
    element.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', async () => {
    
    await Promise.all([
        loadComponent('header', 'components/header.html'),
        loadComponent('tech', 'components/tecnologias.html'),
        loadComponent('about', 'components/sobre.html'),
        loadComponent('training', 'components/formacao.html'),
        loadComponent('projects', 'components/projetos.html'),
        loadComponent('footer', 'components/footer.html')
    ]);

    initScrollAnimations();

    setupThemeToggle();

    if (window.lucide) {
        lucide.createIcons();
    }
});

function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIconSun = document.getElementById('theme-icon-sun');
    const themeIconMoon = document.getElementById('theme-icon-moon');
    const htmlElement = document.documentElement;

    if (localStorage.getItem('theme') === 'light') {
        htmlElement.classList.add('light');
        htmlElement.classList.remove('dark');
        themeIconSun.classList.add('hidden');
        themeIconMoon.classList.remove('hidden');
    } else {
        htmlElement.classList.add('dark'); 
    }

    themeToggleBtn?.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        htmlElement.classList.toggle('light');
        
        if (htmlElement.classList.contains('light')) {
            localStorage.setItem('theme', 'light');
            themeIconSun.classList.add('hidden');
            themeIconMoon.classList.remove('hidden');
        } else {
            localStorage.setItem('theme', 'dark');
            themeIconSun.classList.remove('hidden');
            themeIconMoon.classList.add('hidden');
        }
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-10', 'translate-y-12');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-element').forEach((el) => {
        observer.observe(el);
    });

    if (typeof VanillaTilt !== "undefined") {
        VanillaTilt.init(document.querySelectorAll(".tilt-element"), {
            max: 25,
            speed: 500,
            glare: true,
            "max-glare": 0.3,
            scale: 1.1
        });
    }
}