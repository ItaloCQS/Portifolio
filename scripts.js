/**
 * @param {string} id
 * @param {string} path
 */
async function loadComponent(id, path) {
    const element = document.getElementById(id);
    if (!element) return; // Evita erro se o ID não existir no HTML
    
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

    // 1. Só AGORA que o HTML existe, ativamos a animação
    initScrollAnimations();

    // 2. Só AGORA ativamos os ícones (Lucide) para eles não sumirem
    if (window.lucide) {
        lucide.createIcons();
    }
});

// Função para animar os elementos quando aparecem na tela (Scroll Reveal)
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove as classes que escondem o elemento
                entry.target.classList.remove('opacity-0', 'translate-y-10', 'translate-y-12');
                // Adiciona as classes que mostram o elemento
                entry.target.classList.add('opacity-100', 'translate-y-0');
                
                // Opcional: faz o observer parar de olhar depois que animou a primeira vez
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.15 }); // O efeito dispara quando 15% do elemento aparece na tela

    // Seleciona todos os elementos com a classe 'reveal-element'
    document.querySelectorAll('.reveal-element').forEach((el) => {
        observer.observe(el);
    });
}