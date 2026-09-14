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

function mostrarLocalizacao() {
    const botao = document.querySelector("#btn-localizacao");
    const resultado = document.querySelector("#localizacao");

    if (!navigator.geolocation) {
        resultado.textContent = "Geolocalização não suportada neste dispositivo.";
        return;
    }

    botao.textContent = "Buscando...";

    navigator.geolocation.getCurrentPosition(
        async (posicao) => {
            const lat = posicao.coords.latitude;
            const lon = posicao.coords.longitude;

            try {
                const resposta = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`
                );
                const dados = await resposta.json();
                const cidade = dados.address.city || dados.address.town || dados.address.village || "Cidade desconhecida";
                const estado = dados.address.state || "";

                resultado.textContent = `📍 Você está em: ${cidade}${estado ? ", " + estado : ""}`;
                botao.textContent = "Atualizar Localização";
            } catch {
                resultado.textContent = `📍 Coordenadas: ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
                botao.textContent = "Atualizar Localização";
            }
        },
        () => {
            resultado.textContent = "❌ Permissão negada ou erro no GPS.";
            botao.textContent = "Tentar Novamente";
        }
    );
}

carregarJogos();