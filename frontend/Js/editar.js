const token = localStorage.getItem("token");

if (!token) {

    alert("Usuário não autenticado.");

    window.location.href = "login.html";
}

const form =
    document.getElementById("form-quiz");

const icones =
    document.querySelectorAll(".icone");

let iconeSelecionado = "";

// ==============================
// SELEÇÃO DE ÍCONE
// ==============================

icones.forEach(botao => {

    botao.addEventListener("click", () => {

        icones.forEach(i => {
            i.classList.remove("selecionado");
        });

        botao.classList.add("selecionado");

        iconeSelecionado =
            botao.dataset.planta;

        console.log(
            "Ícone selecionado:",
            iconeSelecionado
        );

    });

});

// ==============================
// SALVAR PERFIL
// ==============================

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const nomePlanta =
            document
                .getElementById("planta")
                .value
                .trim();

        const tipoAmbiente =
            document
                .getElementById("tipo")
                .value;

        const lugar =
            document
                .getElementById("lugar")
                .value;

        const rega =
            document
                .getElementById("rega")
                .value;

        // --------------------------
        // VALIDAÇÕES
        // --------------------------

        if (!nomePlanta) {

            alert(
                "Digite o nome da planta."
            );

            return;
        }

        if (!tipoAmbiente) {

            alert(
                "Selecione o tipo da planta."
            );

            return;
        }

        if (!iconeSelecionado) {

            alert(
                "Selecione um ícone."
            );

            return;
        }

        // --------------------------
        // DADOS PARA O BACKEND
        // --------------------------

        const dadosBackend = {

            nomePlanta,
            icone: iconeSelecionado,
            tipoAmbiente

        };

        // --------------------------
        // DADOS EXTRAS
        // --------------------------

        const dadosExtras = {

            lugar,
            frequenciaRega: rega

        };

        try {

            const resposta =
                await fetch(
                    `${API_URL}/api/planta/configurar`,
                    {
                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`

                        },

                        body:
                            JSON.stringify(
                                dadosBackend
                            )
                    }
                );

            if (!resposta.ok) {

                alert(
                    "Erro ao salvar perfil."
                );

                return;
            }

            const planta =
                await resposta.json();

            console.log(
                "Resposta do backend:"
            );

            console.log(planta);

            // --------------------------
            // SALVA DADOS DA API
            // --------------------------

            localStorage.setItem(
                "dadosPlanta",
                JSON.stringify(planta)
            );

            // --------------------------
            // SALVA CAMPOS QUE AINDA
            // NÃO EXISTEM NO BACKEND
            // --------------------------

            localStorage.setItem(
                "dadosExtrasPlanta",
                JSON.stringify(
                    dadosExtras
                )
            );

            // --------------------------
            // ID DA PLANTA
            // --------------------------

            if (planta.id) {

                localStorage.setItem(
                    "idPlanta",
                    planta.id
                );

            }

            alert(
                "Perfil salvo com sucesso!"
            );

            window.location.href =
                "home.html";

        }

        catch (erro) {

            console.error(erro);

            alert(
                "Erro na conexão com a API."
            );

        }

    }
);