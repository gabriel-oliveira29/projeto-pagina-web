document.addEventListener("DOMContentLoaded", async () => {
    try {
        const carregarConteudo = async (pagina) => {
            try {
               
                const content = await fetch(pagina)
                    .then(response => response.text());
                
                const conteudo = document.getElementById('conteudo');
                conteudo.innerHTML = content;
                const scripts = conteudo.getElementsByTagName("script");
                for (const script of scripts) {
                    const newScript = document.createElement('script');
                    newScript.text = script.text;
                    document.head.appendChild(newScript).parentNode.removeChild(newScript);
                }

                const linksConteudo = document.querySelectorAll('#conteudo a[href]');
               
                linksConteudo.forEach(link => {
                    link.addEventListener('click', (event) => {
                        event.preventDefault(); 
                        const href = link.getAttribute('href'); 
                        carregarConteudo(href);
                    });
                });

            } catch (error) {
                console.error('Erro ao carregar o conteúdo:', error);
                document.getElementById('conteudo').innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
            }
        };

        const links = document.querySelectorAll('a[href]');

        links.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const href = link.getAttribute('href'); 
                carregarConteudo(href);
            });
        });

        await carregarConteudo('home.html');
    } catch (error) {
        console.error('Erro geral:', error);
        document.getElementById('conteudo').innerHTML = '<p>Erro ao carregar o conteúdo inicial.</p>';
    }
});
