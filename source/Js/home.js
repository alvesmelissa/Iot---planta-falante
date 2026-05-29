const token = localStorage.getItem("token");

if(!token){
    alert("Usuário não autenticado.");
    
    window.location.href = "login.html";

    return;
}

async function carregarHome(){
    try{
        const resposta = await fetch(
            `${API_URL}/api/monitoramento/home`,
            {
                method: "GET",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if(!resposta.ok){
            alert("Erro ao carregar dados.");

            return;
        }

        const dados = await resposta.json();

        document.getElementById("nomeUsuario").textContent = dados.nomeUsuario;

        let emocao_planta = "";

        if(dados.humor === "FELIZ"){
            emocao_planta = `../img/feliz/${dados.icone}muitofeliz.png`;
        }

        else{
            emocao_planta = `../img/triste/${dados.icone}muitotriste.png`;
        }

        document.getElementById("iconePlanta").src = emocao_planta;

        document.getElementById("umidade").innerText = dados.umidadeSolo + "%";

        document.getElementById("temperatura").innerText = dados.temperatura + "°C";

        document.getElementById("luminosidade").innerText = dados.luminosidade;

        document.getElementById("falaPlanta").textContent = dados.alerta;

    }

    catch(erro){
        console.log(erro);

        alert("Erro na conexão com a API.");
    }

}

carregarHome();