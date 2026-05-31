const token = localStorage.getItem("token");

if (!token) {
    alert("Usuário não autenticado.");
    window.location.href = "login.html";
}

const form = document.getElementById("form-quiz");
const icones = document.querySelectorAll(".icone");

let iconeSelecionado = "";

icones.forEach(function (botao) {

    botao.addEventListener("click", function () {

        icones.forEach(i => {
            i.classList.remove("selecionado");
        });

        botao.classList.add("selecionado");

        iconeSelecionado = botao.dataset.planta;

        console.log("Ícone selecionado:");
        console.log(iconeSelecionado);
    });

});

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const nomePlanta =
        document.getElementById("planta").value.trim();

    const tipoAmbiente =
        document.getElementById("tipo").value;

    const lugar =
        document.getElementById("lugar").value;

    const rega =
        document.getElementById("rega").value;

    if (!nomePlanta) {
        alert("Digite o nome da planta.");
        return;
    }

    if (!tipoAmbiente) {
        alert("Selecione o tipo da planta.");
        return;
    }

    if (!iconeSelecionado) {
        alert("Selecione um ícone.");
        return;
    }

    const dadosPerfil = {
        nomePlanta,
        icone: iconeSelecionado,
        tipoAmbiente,
        lugar,
        frequenciaRega: rega
    };

    try {

        const resposta = await fetch(
            `${API_URL}/api/planta/configurar`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify(dadosPerfil)
            }
        );

        if (!resposta.ok) {

            alert("Erro ao salvar perfil.");

            return;
        }

        const dadosResposta =
            await resposta.json();

        console.log(dadosResposta);

        localStorage.setItem(
            "dadosPlanta",
            JSON.stringify(dadosPerfil)
        );


        if (dadosResposta.id) {

            localStorage.setItem(
                "idPlanta",
                dadosResposta.id
            );
        }

        alert("Perfil salvo com sucesso!");

        window.location.href =
            "home.html";

    }

    catch (erro) {

        console.error(erro);

        alert("Erro na conexão com a API.");
    }

});