const form = document.getElementById("form-quiz");

const icones = document.querySelectorAll(".icone");
let iconeSelecionado="";

icones.forEach(function(botao){
    botao.addEventListener("click", function(){
        iconeSelecionado = botao.textContent;
        console.log("Ícone selecionado:");
        console.log(iconeSelecionado);
    });

});

form.addEventListener("submit", function(event ){
    event.preventDefault();

    const dados_quiz={
        usuario: document.getElementById("usuario").value,
        planta: document.getElementById("planta").value,
        tipo: document.getElementById("tipo").value,
        lugar: document.getElementById("lugar").value,
        rega: document.getElementById("rega").value,
        icone: iconeSelecionado
    };
    
    localStorage.setItem("dadosPlanta", JSON.stringify(dados_quiz));
    console.log(dados_quiz); 
});