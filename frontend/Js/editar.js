const token = localStorage.getItem("token");

if(!token){
    alert("Usuário não autenticado.");

    window.location.href = "login.html";
}

const form = document.getElementById("form-quiz");

const icones = document.querySelectorAll(".icone");

let iconeSelecionado = "";

async function carregarPerfil() {

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
            console.log("Não foi possível carregar os dados.");
            return;
        }

        const dados = await resposta.json();

        console.log("Dados recebidos:");
        console.log(dados);

        document.getElementById("planta").value =
            dados.nomePlanta || "";

        if (dados.tipoAmbiente) {
            document.getElementById("tipo").value =
                dados.tipoAmbiente;
        }

        iconeSelecionado = dados.icone;

        document
            .querySelectorAll(".icone")
            .forEach(botao => {

                if (
                    botao.dataset.planta === dados.icone
                ) {
                    botao.classList.add("selecionado");
                }
            });

    }

    catch (erro) {
        console.log("Erro ao carregar perfil:");
        console.log(erro);
    }
}


icones.forEach(function (botao) {

    botao.addEventListener("click", function () {

        document
            .querySelectorAll(".icone")
            .forEach(i => {
                i.classList.remove("selecionado");
            });

        botao.classList.add("selecionado");

        iconeSelecionado =
            botao.dataset.planta;

        console.log("Ícone selecionado:");
        console.log(iconeSelecionado);

    });

});

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Usuário não autenticado.");
        return;
    }

    const dadosPerfil = {

        nomePlanta:
            document.getElementById("planta").value,

        icone:
            iconeSelecionado,

        tipoAmbiente:
            document.getElementById("tipo").value

    };

    if (iconeSelecionado === "") {
        alert("Selecione um ícone!");
        return;
    }

    try {

        const resposta = await fetch(
            `${API_URL}/api/planta/configurar`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",

                    Authorization:
                        `Bearer ${token}`
                },

                body:
                    JSON.stringify(dadosPerfil)
            }
        );

        if (resposta.ok) {

            alert("Salvo com sucesso!");

            console.log(dadosPerfil);

            localStorage.setItem(
                "dadosPlanta",
                JSON.stringify(dadosPerfil)
            );

            window.location.href =
                "home.html";

        }

        else {

            alert("Erro ao salvar perfil.");

        }

    }

    catch (erro) {

        console.log(erro);

        alert("Erro na conexão com a API.");

    }

});

carregarPerfil();