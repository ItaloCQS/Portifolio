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

// Transformamos essa função em 'async'
document.addEventListener('DOMContentLoaded', async () => {
    
    // O Promise.all faz o site carregar tudo ao mesmo tempo e espera terminar
    await Promise.all([
        loadComponent('header', 'components/header.html'),
        loadComponent('tech', 'components/tecnologias.html'),
        loadComponent('about', 'components/sobre.html'),
        loadComponent('training', 'components/formacao.html'),
        loadComponent('projects', 'components/projetos.html'),
        loadComponent('footer', 'components/footer.html')
    ]);

    initScrollAnimations();

    if (window.lucide) {
        lucide.createIcons();
    }
});

// Função para animar os elementos quando aparecem na tela (Scroll Reveal)
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-10', 'translate-y-12');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                
                // Opcional: faz o observer parar de olhar depois que animou a primeira vez
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