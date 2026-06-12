const token = localStorage.getItem("token");
const plantaId = localStorage.getItem("plantaId");

if (!token) {
    alert("Usuário não autenticado.");
    window.location.href = "login.html";
}

if (!plantaId) {
    alert("Nenhuma planta selecionada.");
    window.location.href = "quiz.html";
}

async function carregarHome() {
    try {
        const resposta = await fetch(
            `${API_URL}/api/monitoramento/home/${plantaId}`,
            {
                method: "GET",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!resposta.ok) {
            alert("Erro ao carregar dados da planta.");
            return;
        }

        const dados = await resposta.json();

        const nomeUsuario = localStorage.getItem("nomeUsuario");

        document.getElementById("nomeUsuario").textContent =
        nomeUsuario ? `Olá, ${nomeUsuario}!` : "Olá!";

        document.getElementById("nomePlantaTopo").textContent = dados.nomePlanta;

        document.getElementById("nomePlantaPrincipal").textContent = dados.nomePlanta;



        let emocao_planta = "";

        if(dados.humor === "FELIZ"){
            emocao_planta = `../img/feliz/${dados.icone}muitofeliz.png`;
        } 
        
        else{
            emocao_planta = `../img/triste/${dados.icone}triste.png`;
        }
        
        document.getElementById("iconePlanta").src = emocao_planta;

        document.getElementById("iconePlanta").alt = dados.nomePlanta;
        
        document.getElementById("iconePequeno").src = emocao_planta;

        document.getElementById("iconePequeno").alt = dados.nomePlanta;
    
        document.getElementById("umidadeSolo").textContent = dados.umidadeSolo;

        document.getElementById("umidadeAr").textContent = dados.umidadeAr;

        document.getElementById("temperatura").textContent = dados.temperatura;

        document.getElementById("luminosidade").textContent = dados.luminosidade;

        const porcentagem = document.getElementById("porcentagemSaude");  //a porcentagem será decidida a partir do humor da planta, assim como a foto dinâmica
        const barra = document.getElementById("barraSaude");
        const status = document.getElementById("statusSaude");

        status.classList.remove(
            "excelente",
            "boa",
            "atencao",
            "critica"
        );

        if (dados.humor === "FELIZ") {

            porcentagem.textContent = "100%";

            status.textContent = "Excelente 🌱";
            status.classList.add("excelente");

            barra.style.width = "100%";
            barra.style.background = "#4caf50";

        } else {

            porcentagem.textContent = "40%";

            status.textContent = "Atenção ⚠️";
            status.classList.add("atencao");

            barra.style.width = "40%";
            barra.style.background = "#ff9800";
        }
        
        
        document.getElementById("falaPlanta").textContent = dados.alerta;

        const fala = document.querySelector(".fala"); //adicionando mudança de cor de acordo com o alerta da planta

        fala.classList.remove("saudavel", "alerta");

        if (dados.humor === "FELIZ") {
            fala.classList.add("saudavel");
        } else {
        fala.classList.add("alerta");
}

    }catch (erro){
        console.error("Erro completo:", erro);

        alert("Erro na conexão com a API.");
    }
}

carregarHome();

document.getElementById("btnAdicionarPlanta").addEventListener("click", () => {
    window.location.href = "quiz.html";
});

//adicionando carrosel de dicas

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        slides.forEach(slide => {
            slide.classList.remove("ativo");
        });

        dots.forEach(d => {
            d.classList.remove("ativo");
        });

        slides[index].classList.add("ativo");
        dot.classList.add("ativo");

        slideAtual = index; //garantindo que não ocorra a quebra do carrossel no último slide

    });

});


//adicionando um setIntervalo para que as dicas mudem sozinhas a cada oito segundos
let slideAtual = 0;

setInterval(() => {

    slides[slideAtual].classList.remove("ativo");
    dots[slideAtual].classList.remove("ativo");

    slideAtual++;

    if (slideAtual >= slides.length) {
        slideAtual = 0;
    }

    slides[slideAtual].classList.add("ativo");
    dots[slideAtual].classList.add("ativo");

}, 8000);

//perfil
const perfilContainer = document.getElementById("perfilContainer");
const menuPerfil = document.getElementById("menuPerfil");

perfilContainer.addEventListener("click", (e) => {
    e.stopPropagation();
    menuPerfil.classList.toggle("ativo");
});

document.addEventListener("click", () => {
    menuPerfil.classList.remove("ativo");
});

// remove os dados que estão armazenados no localstore após deslogar
const btnLogout = document.getElementById("btnLogout");

btnLogout.addEventListener("click", () => {

    const confirmar = confirm("Deseja realmente sair?");

    if (!confirmar) {
        return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("plantaId");

    window.location.href = "login.html";
});