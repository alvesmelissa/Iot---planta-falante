const token = localStorage.getItem("token");
const usuarioId = localStorage.getItem("usuarioId");
const plantaId = localStorage.getItem("plantaId");
const plantaDados = JSON.parse(localStorage.getItem("plantaDados"));

if (!token) {
    alert("Usuário não autenticado.");
    window.location.href = "login.html";
}

if (!plantaId) {
    alert("Nenhuma planta encontrada.");
    window.location.href = "home.html";
}

let tipoSelecionado = "";
let solSelecionado = "";
let regaSelecionada = "";

const nomeInput = document.getElementById("nomePlanta");
const tempInput = document.getElementById("temperatura");
const tempNumber = document.getElementById("tempNumber");
const salvarBtn = document.getElementById("salvarBtn");

function selecionarCard(cards, valor) {
    cards.forEach(card => {
        card.classList.remove("selected");

        if (card.dataset.value === valor) {
            card.classList.add("selected");
        }
    });
}

function preencherCampos(planta) {
    if (!planta) return;

    nomeInput.value = planta.nomePlanta || "";

    tipoSelecionado = planta.icone || "";
    solSelecionado = planta.solPlanta || "";
    regaSelecionada = planta.umidadePlanta || "";

    const temperatura = parseInt(planta.tempPlanta) || 25;
    tempInput.value = temperatura;
    tempNumber.textContent = temperatura + "°C";

    selecionarCard(document.querySelectorAll(".card-option"), tipoSelecionado);

    selecionarCard(document.querySelectorAll('[data-group="sol"]'), solSelecionado);

    selecionarCard(document.querySelectorAll('[data-group="rega"]'), regaSelecionada);
}

document.addEventListener("DOMContentLoaded", () => {
    if (plantaDados) {
        preencherCampos(plantaDados);
    }

    tempNumber.textContent = tempInput.value + "°C";
});

tempInput.addEventListener("input", () => {
    tempNumber.textContent = tempInput.value + "°C";
});

document.querySelectorAll(".card-option").forEach(card => {
    card.addEventListener("click", () => {
        document.querySelectorAll(".card-option").forEach(item => {
            item.classList.remove("selected");
        });

        card.classList.add("selected");
        tipoSelecionado = card.dataset.value;
    });
});

document.querySelectorAll('[data-group="sol"]').forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll('[data-group="sol"]').forEach(opcao => {
            opcao.classList.remove("selected");
        });

        item.classList.add("selected");
        solSelecionado = item.dataset.value;
    });
});

document.querySelectorAll('[data-group="rega"]').forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll('[data-group="rega"]').forEach(opcao => {
            opcao.classList.remove("selected");
        });

        item.classList.add("selected");
        regaSelecionada = item.dataset.value;
    });
});

salvarBtn.addEventListener("click", async () => {
    const dadosApi = {
        usuarioId: Number(usuarioId),
        nomePlanta: nomeInput.value.trim(),
        icone: tipoSelecionado,
        umidadePlanta: regaSelecionada,
        tempPlanta: `${tempInput.value}°C`,
        solPlanta: solSelecionado
    };

    console.log("Enviando PATCH:", dadosApi);

    try {
        const resposta = await fetch(
            `${API_URL}/api/planta/{id}/configurar`,
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
            localStorage.setItem("plantaDados", JSON.stringify(dadosApi));

            alert("Planta atualizada com sucesso!");          
            
            window.location.href = "home.html";
        } 
        
        else {
            const erro = await resposta.text();

            console.error("Status:", resposta.status);
            console.error("Erro:", erro);

            alert("Erro ao atualizar planta.");
        }

    } 
    
    catch (erro) {
        console.error(erro);

        alert("Erro na conexão com a API.");
    }
});