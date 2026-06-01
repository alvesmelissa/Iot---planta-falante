// ==============================
// AUTENTICAÇÃO
// ==============================

const token = localStorage.getItem("token");

/*if (!token) {

    alert("Usuário não autenticado.");

    window.location.href = "login.html";
}*/

// ==============================
// ELEMENTOS
// ==============================

const dropdown =
    document.getElementById("dropdownPlantas");

const plantaSelect =
    document.getElementById("plantaSelect");

const listaPlantas =
    document.getElementById("listaPlantas");

const btnNovaPlanta =
    document.getElementById("btnNovaPlanta");

// ==============================
// DROPDOWN
// ==============================

plantaSelect.addEventListener("click", (e) => {

    e.stopPropagation();

    dropdown.classList.toggle("ativo");

});

document.addEventListener("click", () => {

    dropdown.classList.remove("ativo");

});

// ==============================
// CARREGAR PLANTAS
// ==============================

async function carregarPlantas() {

    try {

        const resposta = await fetch(
            `${API_URL}/api/planta`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!resposta.ok) {

            throw new Error(
                "Erro ao carregar plantas"
            );
        }

        const plantas =
            await resposta.json();

        renderizarPlantas(plantas);

    }

    catch (erro) {

        console.error(erro);

        listaPlantas.innerHTML = `
            <div class="estado-vazio">
                Nenhuma planta encontrada
            </div>
        `;
    }
}

// ==============================
// RENDERIZAR PLANTAS
// ==============================

function renderizarPlantas(plantas) {

    listaPlantas.innerHTML = "";

    plantas.forEach(planta => {

        const item =
            document.createElement("div");

        item.className =
            "item-planta";

        let caminhoImagem;

        if (planta.humor === "FELIZ") {

            caminhoImagem =
                `../img/feliz/${planta.icone}muitofeliz.png`;

        } else {

            caminhoImagem =
                `../img/triste/${planta.icone}triste.png`;
        }

        item.innerHTML = `
            <img src="${caminhoImagem}">
            <span>${planta.nome}</span>
        `;

        item.addEventListener(
            "click",
            () => selecionarPlanta(planta)
        );

        listaPlantas.appendChild(item);

    });

}

// ==============================
// SELECIONAR PLANTA
// ==============================

function selecionarPlanta(planta) {

    let caminhoImagem;

    if (planta.humor === "FELIZ") {

        caminhoImagem =
            `../img/feliz/${planta.icone}muitofeliz.png`;

    } else {

        caminhoImagem =
            `../img/triste/${planta.icone}triste.png`;
    }

    document.getElementById(
        "nomePlantaTopo"
    ).textContent = planta.nome;

    document.getElementById(
        "iconePequeno"
    ).src = caminhoImagem;

    dropdown.classList.remove(
        "ativo"
    );

    carregarHistorico(
        planta.id
    );
}

// ==============================
// BOTÃO NOVA PLANTA
// ==============================

btnNovaPlanta.addEventListener(
    "click",
    () => {

        window.location.href =
            "perfil.html";

    }
);

// ==============================
// CARREGAR HISTÓRICO
// ==============================

async function carregarHistorico(idPlanta) {

    try {

        const resposta = await fetch(
            `${API_URL}/api/monitoramento/historico`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        if (!resposta.ok) {

            throw new Error(
                "Erro ao carregar histórico"
            );
        }

        const dados =
            await resposta.json();

        atualizarResumo(
            dados
        );

        atualizarSaude(
            dados
        );

        atualizarHumor(
            dados
        );

        atualizarTimeline(
            dados.eventos
        );

    }

    catch (erro) {

        console.error(erro);

        mostrarEstadoVazio();
    }
}

// ==============================
// RESUMO
// ==============================

function atualizarResumo(dados) {

    document.getElementById(
        "diasBons"
    ).textContent =
        dados.diasBons ?? "--";

    document.getElementById(
        "diasAtencao"
    ).textContent =
        dados.diasAtencao ?? "--";

    document.getElementById(
        "diasRuins"
    ).textContent =
        dados.diasRuins ?? "--";
}

// ==============================
// SAÚDE
// ==============================

function atualizarSaude(dados) {

    const saude =
        dados.saudeMedia ?? 0;

    document.getElementById(
        "porcentagemSaude"
    ).textContent =
        `${saude}%`;

    document.getElementById(
        "barraSaude"
    ).style.width =
        `${saude}%`;

    const texto =
        document.getElementById(
            "textoSaude"
        );

    if (saude >= 80) {

        texto.textContent =
            "Sua planta teve uma ótima semana.";

    }

    else if (saude >= 60) {

        texto.textContent =
            "Sua planta está saudável.";

    }

    else if (saude >= 40) {

        texto.textContent =
            "Sua planta precisa de atenção.";

    }

    else {

        texto.textContent =
            "Sua planta passou por dificuldades.";
    }
}

// ==============================
// HUMOR DA SEMANA
// ==============================

function atualizarHumor(dados) {

    const container =
        document.getElementById(
            "humorSemana"
        );

    const humorSemana =
        dados.humorSemana || [];

    if (
        humorSemana.length === 0
    ) {

        container.innerHTML = `
            <div class="estado-vazio">
                <i class="fa-solid fa-seedling"></i>
                <h3>Sem histórico</h3>
            </div>
        `;

        return;
    }

    container.innerHTML = "";

    humorSemana.forEach(dia => {

        let emoji = "😊";

        if (
            dia.humor === "ATENCAO"
        ) {

            emoji = "😐";
        }

        if (
            dia.humor === "TRISTE"
        ) {

            emoji = "😟";
        }

        container.innerHTML += `
            <div class="humor-dia">
                <span>${dia.dia}</span>
                <p>${emoji}</p>
            </div>
        `;
    });

}

// ==============================
// TIMELINE
// ==============================

function atualizarTimeline(eventos) {

    const timeline =
        document.getElementById(
            "timeline"
        );

    if (
        !eventos ||
        eventos.length === 0
    ) {

        timeline.innerHTML = `
            <div class="estado-vazio">

                <i class="fa-solid fa-seedling"></i>

                <h3>
                    Nenhum evento registrado
                </h3>

                <p>
                    Os acontecimentos aparecerão aqui.
                </p>

            </div>
        `;

        return;
    }

    timeline.innerHTML = "";

    eventos.forEach(evento => {

        timeline.innerHTML += `

        <div class="evento">

            <div class="icone-evento ${evento.tipo}">

                <i class="${evento.icone}"></i>

            </div>

            <div class="conteudo-evento">

                <h4>
                    ${evento.descricao}
                </h4>

                <p>
                    ${evento.dataHora}
                </p>

            </div>

        </div>

        `;
    });
}

// ==============================
// ESTADO VAZIO
// ==============================

function mostrarEstadoVazio() {

    document.getElementById(
        "timeline"
    ).innerHTML = `
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

// ==============================
// INICIALIZAÇÃO
// ==============================

async function iniciar() {

    await carregarPlantas();

}

iniciar();

// ==============================
// ADICIONAR PLANTA
// ==============================

document
    .getElementById(
        "btnAdicionarPlanta"
    )
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "perfil.html";

        }
    );