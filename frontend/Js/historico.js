const token = localStorage.getItem("token");

if (!token) {
    alert("Usuário não autenticado.");
    window.location.href = "login.html";
}

const dropdown = document.getElementById("dropdownPlantas");
const plantaSelect = document.getElementById("plantaSelect");
const listaPlantas = document.getElementById("listaPlantas");
const btnNovaPlanta = document.getElementById("btnNovaPlanta");

/* =========================
   DROPDOWN
========================= */

plantaSelect.addEventListener("click", (e) => {
    e.stopPropagation();

    dropdown.classList.toggle("ativo");
});

document.addEventListener("click", () => {
    dropdown.classList.remove("ativo");
});

/* =========================
   CARREGAR PLANTAS
========================= */

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

        if (!resposta.ok) {

            alert("Erro ao carregar plantas.");

            return;
        }

        const plantas = await resposta.json();

        renderizarPlantas(plantas);

        if (plantas.length > 0) {
            selecionarPlanta(plantas[0]);
        }

    }

    catch (erro) {

        console.log(erro);

        mostrarEstadoVazio();
    }
}

/* =========================
   RENDERIZAR PLANTAS
========================= */

function renderizarPlantas(plantas) {

    listaPlantas.innerHTML = "";

    plantas.forEach(planta => {

        const item = document.createElement("div");

        item.className = "item-planta";

        item.innerHTML = `
            <span>${planta.nomePlanta}</span>
        `;

        item.addEventListener(
            "click",
            () => selecionarPlanta(planta)
        );

        listaPlantas.appendChild(item);

    });
}

/* =========================
   SELECIONAR PLANTA
========================= */

function selecionarPlanta(planta) {

    document.getElementById("nomePlantaTopo").textContent =
        planta.nomePlanta || "Minha Planta";

    dropdown.classList.remove("ativo");

    carregarHistorico(planta.id);
}

/* =========================
   CARREGAR HISTÓRICO
========================= */

async function carregarHistorico(idPlanta) {

    try {

        const resposta = await fetch(
            `${API_URL}/api/monitoramento/eventos`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!resposta.ok) {

            mostrarEstadoVazio();

            return;
        }

        const eventos = await resposta.json();

        atualizarTimeline(eventos);

    }

    catch (erro) {

        console.log(erro);

        mostrarEstadoVazio();
    }
}

/* =========================
   TIMELINE
========================= */

function atualizarTimeline(eventos) {

    const timeline =
        document.getElementById("timeline");

    if (!eventos || eventos.length === 0) {

        timeline.innerHTML = `
            <div class="estado-vazio">

                <i class="fa-solid fa-seedling"></i>

                <h3>
                    Nenhum evento registrado
                </h3>

                <p>
                    Os acontecimentos da sua planta aparecerão aqui.
                </p>

            </div>
        `;

        return;
    }

    timeline.innerHTML = "";

    eventos.forEach(evento => {

        let iconeClasse = "feliz";
        let icone = "fa-seedling";

        const tipo =
            (evento.tipoEvento || "")
            .toLowerCase();

        if (
            tipo.includes("agua") ||
            tipo.includes("rega")
        ) {
            iconeClasse = "agua";
            icone = "fa-droplet";
        }

        else if (
            tipo.includes("sol") ||
            tipo.includes("luz")
        ) {
            iconeClasse = "luz";
            icone = "fa-sun";
        }

        else if (
            tipo.includes("temperatura") ||
            tipo.includes("calor")
        ) {
            iconeClasse = "temp";
            icone = "fa-temperature-high";
        }

        const dataFormatada =
            formatarData(evento.dataHora);

        timeline.innerHTML += `

            <div class="evento">

                <div class="icone-evento ${iconeClasse}">
                    <i class="fa-solid ${icone}"></i>
                </div>

                <div class="conteudo-evento">

                    <h4>
                        ${evento.descricao || "Evento registrado"}
                    </h4>

                    <p>
                        ${dataFormatada}
                    </p>

                    <small>
                        ${evento.tipoEvento || ""}
                    </small>

                </div>

            </div>

        `;
    });
}

/* =========================
   FORMATAR DATA
========================= */

function formatarData(data) {

    if (!data)
        return "";

    try {

        return new Date(data)
            .toLocaleString(
                "pt-BR",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

    }

    catch {

        return data;
    }
}

/* =========================
   ESTADO VAZIO
========================= */

function mostrarEstadoVazio() {

    document.getElementById("timeline").innerHTML = `

        <div class="estado-vazio">

            <i class="fa-solid fa-seedling"></i>

            <h3>
                Histórico indisponível
            </h3>

            <p>
                Não foi possível carregar os dados.
            </p>

        </div>

    `;
}

/* =========================
   BOTÕES
========================= */

btnNovaPlanta.addEventListener(
    "click",
    () => {
        window.location.href = "perfil.html";
    }
);

document
    .getElementById("btnAdicionarPlanta")
    .addEventListener(
        "click",
        () => {
            window.location.href = "quiz.html";
        }
    );

/* =========================
   INICIAR
========================= */

carregarPlantas();