/**
 * @param {string} id
 * @param {string} path
 */

async function loadComponent(id, path) {
    const element = document.getElementById(id);
    const response = await fetch(path);        
    const html = await response.text();
    element.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', 'components/header.html');
    loadComponent('tech', 'components/tecnologias.html');
    loadComponent('about', 'components/sobre.html');
    loadComponent('projects', 'components/projetos.html');
    loadComponent('footer', 'components/footer.html');
});