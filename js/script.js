const API = "https://www.gamerpower.com/api/giveaways?type=game";

async function carregarJogos() {
    try {
        const resposta = await fetch(API);
        const jogos = await resposta.json();
        const grid = document.querySelector("#games");

        const html = jogos.map((jogo, index) => {
            const isFirst = index === 0;
            return `
                <article class="game">
                    <img 
                        src="${jogo.thumbnail}" 
                        alt="${jogo.title}"
                        width="300"
                        height="168"
                        ${isFirst ? 'fetchpriority="high"' : 'loading="lazy"'} 
                    />
                    <h2>${jogo.title}</h2>
                </article>
            `;
        }).join("");

        grid.innerHTML = html;
    } catch (error) {
        document.querySelector("#games").innerHTML = "Erro ao carregar jogos.";
        console.error("Erro ao carregar jogos:", error);
    }
}

carregarJogos();