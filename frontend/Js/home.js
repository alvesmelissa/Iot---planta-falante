const token = localStorage.getItem("token");

if(!token){
    alert("Usuário não autenticado.");

    window.location.href = "login.html";
}

async function carregarHome() {
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
            alert("Erro ao carregar dados da planta.");
            return;
        }

        const dados = await resposta.json();

        document.getElementById("nomePlantaTopo").textContent = dados.nomePlanta;

        document.getElementById("nomePlantaPrincipal").textContent = dados.nomePlanta;

        document.getElementById("nomeUsuario").textContent = `Olá, ${dados.nomeUsuario}!`; 

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

        document.getElementById("falaPlanta").textContent = dados.alerta;

    }catch (erro){
        console.error("Erro completo:", erro);

        alert("Erro na conexão com a API.");
    }
}

carregarHome();

document.getElementById("btnAdicionarPlanta").addEventListener("click", () => {
    window.location.href = "perfil.html";
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