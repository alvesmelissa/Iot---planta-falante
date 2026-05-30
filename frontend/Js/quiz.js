const steps = document.querySelectorAll(".step");
const progress = document.querySelector(".progress-fill");
const nextButtons = document.querySelectorAll(".next-btn");

let currentStep = 0;

const quizData = {
    nomePlanta:"",
    tipoPlanta:"",
    localizacao:"",
    quantidadeSol:"",
    frequenciaRega:"",
    temperatura:25
};

function updateProgress(){

    const percent =
    ((currentStep + 1) / steps.length) * 100;

    progress.style.width = percent + "%";
}

function updateButtonState(){

    const currentButton =
    steps[currentStep].querySelector(".next-btn");

    if(!currentButton) return;

    let canContinue = false;

    switch(currentStep){

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
            quizData.localizacao !== "";
            break;

        case 4:
            canContinue =
            quizData.quantidadeSol !== "";
            break;

        case 5:
            canContinue =
            quizData.frequenciaRega !== "";
            break;

        case 6:
        case 7:
            canContinue = true;
            break;
    }

    currentButton.disabled = !canContinue;
}

function showStep(index){

    steps.forEach(step=>{
        step.classList.remove("active");
    });

    steps[index].classList.add("active");

    updateProgress();

    if(index === 7){
        renderResumo();
    }

    updateButtonState();
}

nextButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        if(btn.disabled) return;

        if(currentStep === 1){

            quizData.nomePlanta =
            document
            .getElementById("nomePlanta")
            .value
            .trim();
        }

        if(currentStep === 6){

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
.forEach(card=>{

    card.addEventListener("click",()=>{

        const group =
        card.dataset.group;

        document
        .querySelectorAll(
            `[data-group="${group}"]`
        )
        .forEach(item=>{
            item.classList.remove("selected");
        });

        card.classList.add("selected");

        const value =
        card.dataset.value;

        switch(group){

            case "tipo":
                quizData.tipoPlanta = value;
                break;

            case "local":
                quizData.localizacao = value;
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

temp.addEventListener("input",()=>{

    tempNumber.textContent =
    temp.value + "°C";
});

function renderResumo(){

    document.getElementById("resumo").innerHTML = `
        <div class="resumo-item"><b>Nome:</b> ${quizData.nomePlanta}</div>
        <div class="resumo-item"><b>Planta:</b> ${quizData.tipoPlanta}</div>
        <div class="resumo-item"><b>Local:</b> ${quizData.localizacao}</div>
        <div class="resumo-item"><b>Sol:</b> ${quizData.quantidadeSol}</div>
        <div class="resumo-item"><b>Rega:</b> ${quizData.frequenciaRega}</div>
        <div class="resumo-item"><b>Temperatura:</b> ${quizData.temperatura}°C</div>
    `;
}

document
.getElementById("finishBtn")
.addEventListener("click",()=>{

    localStorage.setItem(
        "dadosPlanta",
        JSON.stringify(quizData)
    );

    window.location.href =
    "home.html";
});

showStep(0);
updateButtonState();