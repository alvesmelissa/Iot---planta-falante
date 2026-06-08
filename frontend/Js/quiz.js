const token = localStorage.getItem("token");
const usuarioId = localStorage.getItem("usuarioId");

if(!token){
    alert("Usuário não autenticado.");
    window.location.href = "login.html";
}

const steps = document.querySelectorAll(".step");
const progress = document.querySelector(".progress-fill");
const nextButtons = document.querySelectorAll(".next-btn");

let currentStep = 0;

const quizData = {
    usuarioId: "",
    nomePlanta: "",
    tipoPlanta: "",
    quantidadeSol: "",
    frequenciaRega: "",
    temperatura: 25
};

function updateProgress() {

    const percent =
        ((currentStep + 1) / steps.length) * 100;

    progress.style.width = percent + "%";
}

function updateButtonState() {

    const currentButton =
        steps[currentStep].querySelector(".next-btn");

    if (!currentButton) return;

    let canContinue = false;

    switch (currentStep) {

        case 0:
            canContinue = true;
            break;

        case 1:
            canContinue =
                document
                    .getElementById("nomePlanta")
                    .value
                    .trim()
                    .length > 0;
            break;

        case 2:
            canContinue =
                quizData.tipoPlanta !== "";
            break;

        case 3:
            canContinue =
                quizData.quantidadeSol !== "";
            break;

        case 4:
            canContinue =
                quizData.frequenciaRega !== "";
            break;

        case 5:
        case 6:
            canContinue = true;
            break;
    }

    currentButton.disabled = !canContinue;
}

function showStep(index) {

    steps.forEach(step => {
        step.classList.remove("active");
    });

    steps[index].classList.add("active");

    updateProgress();

    if (index === 6) {
        renderResumo();
    }

    updateButtonState();
}

nextButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        if (btn.disabled) return;

        if (currentStep === 1) {

            quizData.nomePlanta =
                document
                    .getElementById("nomePlanta")
                    .value
                    .trim();
        }

        if (currentStep === 5) {

            quizData.temperatura =
                document
                    .getElementById("temperatura")
                    .value;
        }

        currentStep++;

        showStep(currentStep);
    });

});

document
    .querySelectorAll("[data-group]")
    .forEach(card => {

        card.addEventListener("click", () => {

            const group =
                card.dataset.group;

            document
                .querySelectorAll(
                    `[data-group="${group}"]`
                )
                .forEach(item => {
                    item.classList.remove("selected");
                });

            card.classList.add("selected");

            const value =
                card.dataset.value;

            switch (group) {

                case "tipo":
                    quizData.tipoPlanta = value;
                    break;

                case "sol":
                    quizData.quantidadeSol = value;
                    break;

                case "rega":
                    quizData.frequenciaRega = value;
                    break;
            }

            updateButtonState();

        });

    });
    
const nomeInput =
    document.getElementById("nomePlanta");

nomeInput.addEventListener(
    "input",
    updateButtonState
);

const temp =
    document.getElementById("temperatura");

const tempNumber =
    document.getElementById("tempNumber");

temp.addEventListener("input", () => {

    tempNumber.textContent =
        temp.value + "°C";

});

function renderResumo() {

    document.getElementById("resumo").innerHTML = `

        <div class="resumo-item">
            <b>Nome:</b> ${quizData.nomePlanta}
        </div>

        <div class="resumo-item">
            <b>Planta:</b> ${quizData.tipoPlanta}
        </div>

        <div class="resumo-item">
            <b>Sol:</b> ${quizData.quantidadeSol}
        </div>

        <div class="resumo-item">
            <b>Rega:</b> ${quizData.frequenciaRega}
        </div>

        <div class="resumo-item">
            <b>Temperatura:</b> ${quizData.temperatura}°C
        </div>

    `;
}

document
    .getElementById("finishBtn")
    .addEventListener("click", async () => {

        const token =
            localStorage.getItem("token");

        if (!token) {

            alert("Usuário não autenticado.");

            window.location.href =
                "login.html";

            return;
        }

    const dadosApi = {
        usuarioId: usuarioId,
        nomePlanta: quizData.nomePlanta,
        icone: quizData.tipoPlanta,
        umidadePlanta: quizData.frequenciaRega,
        tempPlanta: quizData.temperatura,
        solPlanta: quizData.quantidadeSol  
};

console.log("Enviando:", dadosApi);

        try {
            const resposta = await fetch(
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
                        JSON.stringify(dadosApi)
                }
            );

        if (resposta.ok) {
            const dadosResposta = await resposta.json();

            localStorage.setItem("plantaId", dadosResposta.id );

        alert("Perfil criado!");

        window.location.href = "home.html";
}

        else {
                const erro = await resposta.text();

                console.error("Status:", resposta.status);
                console.error("Resposta:", erro);

                alert("Erro ao salvar perfil!");
            }

        }

        catch (erro) {
            console.log(erro);

            alert("Erro na conexão com a API.");
        }

    });

showStep(0);
updateButtonState();