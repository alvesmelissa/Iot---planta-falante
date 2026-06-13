const token = localStorage.getItem("token");
const usuarioId = localStorage.getItem("usuarioId");
const plantaId = localStorage.getItem("plantaId"); 

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

document.addEventListener("DOMContentLoaded", () => {
    console.log("Carregando dados da Quiz...");

    const nomeInput = document.getElementById("nomePlanta");
    const tempInput = document.getElementById("temperatura");
    const tempNumber = document.getElementById("tempNumber");
    const salvarBtn = document.getElementById("salvarBtn");

    function carregarDadosConfiguracao() {
        const dadosQuizString = localStorage.getItem("plantaDados") || localStorage.getItem("dadosQuiz") || localStorage.getItem("resultadoQuiz");

        const plantaHomeString = localStorage.getItem("dadosPlantaEdicao");

        let dadosHome = plantaHomeString ? JSON.parse(plantaHomeString) : {};

        const dadosQuiz = dadosQuizString ? JSON.parse(dadosQuizString) : {};

        console.log("Carregados do Quiz:", dadosQuiz);

        nomeInput.value = dadosQuiz.nomePlanta || dadosHome.nomePlanta || "Julia";

        tipoSelecionado = dadosQuiz.icone || dadosHome.icone || "";

        solSelecionado = dadosQuiz.solPlanta || dadosQuiz.sol || "";

        regaSelecionada = dadosQuiz.umidadePlanta || dadosQuiz.rega || dadosQuiz.umidade || "";

        const tempBruta = dadosQuiz.tempPlanta || dadosHome.temperatura || dadosHome.tempPlanta || 25;

        const temperatura = parseInt(tempBruta) || 25;

        tempInput.value = temperatura;

        tempNumber.textContent = temperatura + "°C";

        atualizarSelecaoVisual(document.querySelectorAll(".card-option"), tipoSelecionado);
        atualizarSelecaoVisual(document.querySelectorAll('[data-group="sol"]'), solSelecionado);
        atualizarSelecaoVisual(document.querySelectorAll('[data-group="rega"]'), regaSelecionada);
    }

    function atualizarSelecaoVisual(cards, valor) {
        if (!cards || cards.length === 0 || !valor) return;
        
        cards.forEach(card => {
            card.classList.remove("selected");
            
            const dataValue = card.dataset.value ? card.dataset.value.trim().toLowerCase() : "";
            const textoCard = card.innerText ? card.innerText.trim().toLowerCase() : "";
            const valorBusca = String(valor).trim().toLowerCase();

            if (dataValue === valorBusca || textoCard === valorBusca) {
                card.classList.add("selected");
                
                if (card.classList.contains("card-option")) {
                    tipoSelecionado = card.dataset.value || card.innerText.trim();
                } 

                else if (card.getAttribute("data-group") === "sol") {
                    solSelecionado = card.dataset.value;
                } 

                else if (card.getAttribute("data-group") === "rega") {
                    regaSelecionada = card.dataset.value;
                }
            }
        });
    }

    carregarDadosConfiguracao();

    tempInput.addEventListener("input", () => {
        tempNumber.textContent = tempInput.value + "°C";
    });

    document.querySelectorAll(".card-option").forEach(card => {
        card.addEventListener("click", () => {
            document.querySelectorAll(".card-option").forEach(item => item.classList.remove("selected"));
            card.classList.add("selected");
            tipoSelecionado = card.dataset.value || card.innerText.trim();
        });
    });

    document.querySelectorAll('[data-group="sol"]').forEach(item => {
        item.addEventListener("click", () => {
            document.querySelectorAll('[data-group="sol"]').forEach(opcao => opcao.classList.remove("selected"));
            item.classList.add("selected");
            solSelecionado = item.dataset.value;
        });
    });

    document.querySelectorAll('[data-group="rega"]').forEach(item => {
        item.addEventListener("click", () => {
            document.querySelectorAll('[data-group="rega"]').forEach(opcao => opcao.classList.remove("selected"));
            item.classList.add("selected");
            regaSelecionada = item.dataset.value;
        });
    });

    salvarBtn.addEventListener("click", async () => {
        const dadosApi = {
            usuarioId: Number(usuarioId),
            nomePlanta: nomeInput.value.trim(),
            icone: tipoSelecionado || "jiboia", 
            umidadePlanta: regaSelecionada,
            tempPlanta: `${tempInput.value}°C`,
            solPlanta: solSelecionado
        };

        console.log("Salvando mudanças:", dadosApi);

        try {
            const resposta = await fetch(
                `${API_URL}/api/planta/${plantaId}/configurar`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(dadosApi)
                }
            );

            if (resposta.ok) {
                alert("Planta atualizada!");  

                window.location.href = "home.html";
            } 
            
            else {
                const textoErro = await resposta.text();
                console.error(`Erro do Servidor [Status ${resposta.status}]:`, textoErro);
                alert(`Erro ${resposta.status}: Não foi possível salvar as alterações.`);
            }
        } 
        
        catch (erro) {
            console.error("Falha na requisição PATCH:", erro);
            alert("Erro de comunicação com o servidor.");
        }
    });
});