const token = localStorage.getItem("token");

if(!token){
    alert("Usuário não autenticado.");

    window.location.href = "login.html";
}

const dropdown = document.getElementById("dropdownPlantas");

const plantaSelect = document.getElementById("plantaSelect");

const listaPlantas = document.getElementById("listaPlantas");

const btnNovaPlanta = document.getElementById("btnNovaPlanta");

plantaSelect.addEventListener("click", (e) => {
    e.stopPropagation();

    dropdown.classList.toggle("ativo");
});

document.addEventListener("click", () => {
    dropdown.classList.remove("ativo");
});

async function carregarPlantas() {
    try {
        const resposta = await fetch(
            `${API_URL}/api/planta`,
            {
                method: "GET",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if(!resposta.ok){
            alert("Erro ao carregar dados da planta.");

            return;
        }


        const plantas = await resposta.json();

        renderizarPlantas(plantas);

        if(plantas.length > 0){
            selecionarPlanta(plantas[0]);
        }

    }

    catch(erro){
        console.log(erro);

        alert("Erro na conexão com a API.");
    }
}

function renderizarPlantas(plantas){
    listaPlantas.innerHTML = "";

    plantas.forEach(planta => {
        const item = document.createElement("div");

        item.className = "item-planta";

        item.innerHTML = `<span>${planta.nomePlanta}</span>`;

        item.addEventListener(
            "click",
            () => selecionarPlanta(planta)
        );

        listaPlantas.appendChild(item);

    });
}

function selecionarPlanta(planta){
    document.getElementById("nomePlantaTopo").textContent = planta.nomePlanta || "Minha Planta";

    dropdown.classList.remove("ativo");

    carregarHistorico();
}

async function carregarHistorico(){
    try{
        const respostaEventos =
            await fetch(
                `${API_URL}/api/monitoramento/eventos`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const respostaHistorico =
            await fetch(
                `${API_URL}/api/monitoramento/historico`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

        let eventos = [];
        let historico = [];

        if(respostaEventos.ok){
            eventos = await respostaEventos.json();
        }

        if(respostaHistorico.ok){
            historico = await respostaHistorico.json();
        }

        atualizarResumo(historico);

        atualizarSaude(historico);

        atualizarHumor(historico);

        atualizarTimeline(eventos);

    }

    catch(erro){
        console.log(erro);

        alert("Erro na conexão com a API.");
    }
}

function atualizarResumo(historico){
    document.getElementById("diasBons").textContent = "--";

    document.getElementById("diasAtencao").textContent = "--";

    document.getElementById("diasRuins").textContent = "--";
}

function atualizarSaude(historico){
    const saude = 80;

    document.getElementById("porcentagemSaude").textContent = `${saude}%`;

    document.getElementById("barraSaude").style.width = `${saude}%`;

    document.getElementById("textoSaude").textContent = "Dados de saúde ainda não disponíveis.";
}

function atualizarHumor(historico){
    const container = document.getElementById("humorSemana");

    container.innerHTML = `
        <div class="estado-vazio">
            <i class="fa-solid fa-seedling"></i>
            <h3>Em desenvolvimento</h3>
        </div>
    `;
}

function atualizarTimeline(eventos){
    const timeline = document.getElementById("timeline");

    if(!eventos || eventos.length === 0){
            timeline.innerHTML = `
            <div class="estado-vazio">
                <i class="fa-solid fa-seedling"></i>
                <h3>Nenhum evento registrado</h3>
                <p>Os acontecimentos aparecerão aqui.</p>
            </div>
        `;
        
        return;
    }

    timeline.innerHTML = "";

    eventos.forEach(evento => {

        timeline.innerHTML += `

        <div class="evento">
            <div class="conteudo-evento">
                <h4>${evento.descricao}</h4>
                <p>${evento.dataHora}</p>
                <small>${evento.tipoEvento}</small>
            </div>
        </div>
        `;
    });
}

function mostrarEstadoVazio(){
    document.getElementById("timeline").innerHTML = `
        <div class="estado-vazio">
            <i class="fa-solid fa-seedling"></i>
            <h3>Histórico indisponível</h3>
            <p>Não foi possível carregar os dados.</p>
        </div>
    `;
}

btnNovaPlanta.addEventListener(
    "click",
    () => {
        window.location.href = "perfil.html";
    }
);

document.getElementById("btnAdicionarPlanta").addEventListener(
        "click",
        () => {
            window.location.href = "perfil.html";
        }
    );

carregarPlantas();