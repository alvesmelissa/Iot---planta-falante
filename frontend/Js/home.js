const token = localStorage.getItem("token");

if (!token) {
    alert("Usuário não autenticado.");

    window.location.href = "login.html";
}

async function carregarHome() {
    try {
        const resposta = await fetch(
            `${API_URL}/api/monitoramento/home`,
            {
                method: "GET",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!resposta.ok) {
            alert("Erro ao carregar dados da planta.");
            return;
        }

        const dados = await resposta.json();

        document.getElementById("nomeUsuario").textContent = dados.nomeUsuario;

        let emocao_planta = "";

        if (dados.humor === "FELIZ") {
            emocao_planta = `../img/feliz/${dados.icone}muitofeliz.png`;
        } 
        
        else {
            emocao_planta = `../img/triste/${dados.icone}muitotriste.png`;
        }

        document.getElementById("iconePlanta").src = emocao_planta;

        document.getElementById("iconePlanta").alt = dados.nomePlanta;

        document.getElementById("umidade").textContent = `${dados.umidadeSolo}%`;

        document.getElementById("temperatura").textContent = `${dados.temperatura}°C`;

        document.getElementById("luminosidade").textContent = dados.luminosidade;

        document.getElementById("falaPlanta").textContent = dados.alerta;

    } catch (erro) {
        console.error("Erro completo:", erro);

        alert("Erro na conexão com a API.");
    }
}

carregarHome();