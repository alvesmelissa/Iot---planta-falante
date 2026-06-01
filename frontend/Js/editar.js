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
// CARREGAR DADOS DA PLANTA
// ==============================

async function carregarPlanta() {

    const idPlanta =
        localStorage.getItem("idPlanta");

    if (!idPlanta) {

        console.log(
            "Nenhuma planta encontrada."
        );

        return;
    }

    try {

        const resposta =
            await fetch(
                `${API_URL}/api/planta`,
                {
                    method: "GET",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        if (!resposta.ok) {

            console.log(
                "Erro ao carregar planta."
            );

            return;
        }

        const planta =
            await resposta.json();

        console.log(
            "Dados da planta:"
        );

        console.log(planta);

        // Nome da planta

        document
            .getElementById("planta")
            .value =
            planta.nomePlanta || "";

        // Tipo ambiente

        document
            .getElementById("tipo")
            .value =
            planta.tipoAmbiente || "";

        // Ícone

        iconeSelecionado =
            planta.icone || "";

        icones.forEach(botao => {

            if (
                botao.dataset.planta ===
                planta.icone
            ) {

                botao.classList.add(
                    "selecionado"
                );

            }

        });

        // Campos extras
        // Ainda não existem no backend

        const dadosExtras =
            JSON.parse(
                localStorage.getItem(
                    "dadosExtrasPlanta"
                )
            );

        if (dadosExtras) {

            document
                .getElementById("lugar")
                .value =
                dadosExtras.lugar || "";

            document
                .getElementById("rega")
                .value =
                dadosExtras.frequenciaRega || "";

        }

    }

    catch (erro) {

        console.error(
            "Erro ao carregar planta:",
            erro
        );

    }

}

// ==============================
// SELEÇÃO DE ÍCONE
// ==============================

icones.forEach(botao => {

    botao.addEventListener("click", () => {

        icones.forEach(i => {
            i.classList.remove(
                "selecionado"
            );
        });

        botao.classList.add(
            "selecionado"
        );

        iconeSelecionado =
            botao.dataset.planta;

        console.log(
            "Ícone selecionado:",
            iconeSelecionado
        );

    });

});

// ==============================
// SALVAR ALTERAÇÕES
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

        const idPlanta =
            localStorage.getItem(
                "idPlanta"
            );

        if (!idPlanta) {

            alert(
                "ID da planta não encontrado."
            );

            return;
        }

        const dadosBackend = {

            nomePlanta,
            icone: iconeSelecionado,
            tipoAmbiente

        };

        const dadosExtras = {

            lugar,
            frequenciaRega: rega

        };

        try {

            const resposta =
                await fetch(
                    `${API_URL}/api/planta/${idPlanta}/configurar`,
                    {
                        method: "PATCH",

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

            localStorage.setItem(
                "dadosPlanta",
                JSON.stringify(planta)
            );

            localStorage.setItem(
                "dadosExtrasPlanta",
                JSON.stringify(
                    dadosExtras
                )
            );

            if (
                planta.id !== undefined
            ) {

                localStorage.setItem(
                    "idPlanta",
                    planta.id
                );

            }

            alert(
                "Perfil atualizado com sucesso!"
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

carregarPlanta();