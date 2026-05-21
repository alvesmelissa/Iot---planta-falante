const dadosSalvos =
localStorage.getItem("dadosPlanta");

const dadosPlanta =
JSON.parse(dadosSalvos);

console.log(dadosPlanta.icone);

document.getElementById("iconePlanta").src =
dadosPlanta.icone;


// Valores para teste
let umidade = 30;
let temperatura = 31;
let luminosidade = "Alta";

document.getElementById("umidade").textContent = `${umidade}%`;
document.getElementById("temperatura").textContent = `${temperatura}°C`;
document.getElementById("luminosidade").textContent = luminosidade;

let falar = "";

if(umidade < 30){
    falar = "Estou com sede! Quero àgua.";
}
else if(umidade >= 30 && umidade <= 70){
    falar = "O clima está perfeito!"
}
else if(umidade > 70){
    falar = "Estou ficando muito molhada. Regue menos!"
}
else if(temperatura > 35){
    falar = "Está com calor! Aqui está quente.";
}
else if(temperatura < 15){
    falar = "O clima esfriou. Posso ficar resfriada."
}
else if(luminosidade === "Baixa"){
    falar = "Preciso de mais sol!";
}
else if(luminosidade === "Alta"){
    falar = "Estou queimando! Sol muito forte.";
}

document.getElementById("falaPlanta").textContent = falar;

