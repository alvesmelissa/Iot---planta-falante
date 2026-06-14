const token = localStorage.getItem("token");
const usuarioId = localStorage.getItem("usuarioId");

let plantaIdSelecionada = null;

let tipoSelecionado = "";
let solSelecionado = "";
let regaSelecionada = "";

document.addEventListener("DOMContentLoaded", () => {

    const seletorPlanta = document.getElementById("seletorPlanta");

    const areaEdicao = document.getElementById("areaEdicao");

    const estadoVazio = document.getElementById("estadoVazio");

    const nomeInput = document.getElementById("nomePlanta");

    const tempInput = document.getElementById("temperatura");

    const tempNumber = document.getElementById("tempNumber");

    const salvarBtn = document.getElementById("salvarBtn");

    carregarPlantas();

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
                throw new Error("Erro ao buscar plantas");
            }

            const plantas = await resposta.json();

            if (!plantas || plantas.length === 0) {

                estadoVazio.style.display = "block";

                areaEdicao.style.display = "none";

                return;
            }

            estadoVazio.style.display = "none";

            seletorPlanta.innerHTML =
                `<option value="">Selecione uma planta</option>`;

            plantas.forEach(planta => {

                seletorPlanta.innerHTML += `
                    <option value="${planta.id}">
                        ${planta.nomePlanta}
                    </option>
                `;
            });

        }

        catch (erro) {

            console.error(erro);

            estadoVazio.style.display = "block";
        }
    }

    /* =========================
       AO SELECIONAR PLANTA
    ========================= */

    seletorPlanta.addEventListener("change", async () => {

        const id = seletorPlanta.value;

        if (!id) {

            areaEdicao.style.display = "none";

            return;
        }

        plantaIdSelecionada = id;

        localStorage.setItem("plantaId", id);

        await carregarDadosPlanta(id);

        areaEdicao.style.display = "block";
    });

    /* =========================
       CARREGAR DADOS
    ========================= */

    async function carregarDadosPlanta(id) {

        try {

            const resposta = await fetch(
                `${API_URL}/api/monitoramento/home/${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!resposta.ok) {
                throw new Error("Erro ao carregar planta");
            }

            const dados = await resposta.json();

            preencherFormulario(dados);

        }

        catch (erro) {

            console.error(erro);

            alert("Erro ao carregar dados da planta.");
        }
    }

    /* =========================
       PREENCHER FORMULÁRIO
    ========================= */

    function preencherFormulario(dados) {

        nomeInput.value = dados.nomePlanta || "";

        tipoSelecionado = dados.icone || "";

        solSelecionado = dados.solPlanta || "";

        regaSelecionada = dados.umidadePlanta || "";

        const temperatura =
            parseInt(dados.tempPlanta || dados.temperatura || 25);

        tempInput.value = temperatura;

        tempNumber.textContent = `${temperatura}°C`;

        atualizarSelecaoVisual(
            document.querySelectorAll(".card-option"),
            tipoSelecionado
        );

        atualizarSelecaoVisual(
            document.querySelectorAll('[data-group="sol"]'),
            solSelecionado
        );

        atualizarSelecaoVisual(
            document.querySelectorAll('[data-group="rega"]'),
            regaSelecionada
        );
    }

    /* =========================
       MARCAR SELEÇÕES
    ========================= */

    function atualizarSelecaoVisual(cards, valor) {

        cards.forEach(card => {

            card.classList.remove("selected");

            const cardValue =
                (card.dataset.value || "")
                .trim()
                .toLowerCase();

            const valorBusca =
                String(valor)
                .trim()
                .toLowerCase();

            if (cardValue === valorBusca) {
                card.classList.add("selected");
            }
        });
    }

    /* =========================
       TEMPERATURA
    ========================= */

    tempInput.addEventListener("input", () => {

        tempNumber.textContent =
            `${tempInput.value}°C`;
    });

    /* =========================
       ÍCONE
    ========================= */

    document.querySelectorAll(".card-option")
        .forEach(card => {

            card.addEventListener("click", () => {

                document
                    .querySelectorAll(".card-option")
                    .forEach(item =>
                        item.classList.remove("selected")
                    );

                card.classList.add("selected");

                tipoSelecionado =
                    card.dataset.value;
            });
        });

    /* =========================
       SOL
    ========================= */

    document.querySelectorAll('[data-group="sol"]')
        .forEach(item => {

            item.addEventListener("click", () => {

                document
                    .querySelectorAll('[data-group="sol"]')
                    .forEach(opcao =>
                        opcao.classList.remove("selected")
                    );

                item.classList.add("selected");

                solSelecionado =
                    item.dataset.value;
            });
        });

    /* =========================
       REGA
    ========================= */

    document.querySelectorAll('[data-group="rega"]')
        .forEach(item => {

            item.addEventListener("click", () => {

                document
                    .querySelectorAll('[data-group="rega"]')
                    .forEach(opcao =>
                        opcao.classList.remove("selected")
                    );

                item.classList.add("selected");

                regaSelecionada =
                    item.dataset.value;
            });
        });

    /* =========================
       SALVAR
    ========================= */

    salvarBtn.addEventListener("click", async () => {

        if (!plantaIdSelecionada) {

            alert("Selecione uma planta.");

            return;
        }

        const dadosApi = {

            usuarioId: Number(usuarioId),

            nomePlanta:
                nomeInput.value.trim(),

            icone:
                tipoSelecionado,

            solPlanta:
                solSelecionado,

            umidadePlanta:
                regaSelecionada,

            tempPlanta:
                `${tempInput.value}°C`
        };

        try {

            const resposta = await fetch(
                `${API_URL}/api/planta/${plantaIdSelecionada}/configurar`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify(dadosApi)
                }
            );

            if (resposta.ok) {

                alert("Planta atualizada com sucesso!");

                window.location.href = "home.html";
            }

            else {

                const erro =
                    await resposta.text();

                console.error(erro);

                alert("Não foi possível salvar.");
            }

        }

        catch (erro) {

            console.error(erro);

            alert("Erro de comunicação com o servidor.");
        }
    });
});