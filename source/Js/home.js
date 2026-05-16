const dadosSalvos = localStorage.getItem("dadosPlanta");

const dadosPlanta = JSON.parse(dadosSalvos);

document.getElementById("nomeUsuario").textContent = `Olá, ${dadosPlanta.usuario}!`;

document.getElementById("iconePlanta").textContent = dadosPlanta.icone;


// Valores para teste
let umidade = 10;
let temperatura = 31;
let luminosidade = "Alta";

document.getElementById("umidade").textContent = `${umidade}%`;
document.getElementById("temperatura").textContent = `${temperatura}°C`;
document.getElementById("luminosidade").textContent = luminosidade;

let falar = "";

if(umidade < 30){
    fala = "Estou com sede! Quero àgua.";
}
else if(umidade >= 30 && umidade <= 70){
    fala = "O clima está perfeito!"
}
else if(umidade > 70){
    fala = "Estou ficando muito molhada. Regue menos!"
}
else if(temperatura > 35){
    fala = "Está com calor! Aqui está quente.";
}
else if(temperatura < 15){
    fala = "O clima esfriou. Posso ficar resfriada."
}
else if(luminosidade === "Baixa"){
    fala = "Preciso de mais sol!";
}
else if(luminosidade === "Alta"){
    fala = "Estou queimando! Sol muito forte.";
}

document.getElementById("falaPlanta").textContent = falar;

