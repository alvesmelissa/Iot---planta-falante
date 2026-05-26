const form = document.getElementById("form-quiz");

const icones = document.querySelectorAll(".icone");

let iconeSelecionado = "";

icones.forEach(function(botao){
    botao.addEventListener("click", function(){
        iconeSelecionado = botao.querySelector("img").getAttribute("src");
        console.log("Ícone selecionado:");
        console.log(iconeSelecionado);
    });

});

form.addEventListener("submit", async function(event){
    event.preventDefault();

    const token = localStorage.getItem("token");

    if(!token){
        alert("Usuário não autenticado.");
        return;
    }

    const dadosPerfil = {
        nomePlanta: document.getElementById("planta").value,

        icone: iconeSelecionado,

        tipoAmbiente: document.getElementById("tipo").value
    };

    if(iconeSelecionado === ""){
        alert("Selecione um ícone!");
        return;
    }

    try{
        const resposta = await fetch(
            "http://localhost:8080/api/planta/configurar",

            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",

                    Authorization:
                    `Bearer ${token}`
                },

                body: JSON.stringify(dadosPerfil)
            }
        );

        if(resposta.ok){
            alert("Perfil da planta salvo com sucesso!");
            console.log(dadosPerfil);            

            localStorage.setItem("dadosPlanta", JSON.stringify(dadosPerfil));

            window.location.href = "home.html";
        }
        else{
            alert("Erro ao salvar perfil.");
        }

    }

    catch(erro){
        console.log(erro);
        alert("Erro na conexão com a API.");
    }

});
