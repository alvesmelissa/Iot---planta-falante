const dadosSalvos = localStorage.getItem("dadosPlanta");

const dadosPlanta = JSON.parse(dadosSalvos);

console.log(dadosPlanta.icone);

document.getElementById("iconePlanta").src = dadosPlanta.icone;

let umidade = 0;
let temperatura = 0;
let luminosidade = "";

function atualizarFala(){
    let falar = "";

    if(umidade < 30){
        falar = "Estou com sede! Quero água.";
    }

    else if(umidade >= 30 && umidade <= 70){
        falar = "O clima está perfeito!";
    }

    else if(umidade > 70){
        falar = "Estou ficando encharcada. Regue menos!";
    }

    else if(temperatura > 35){
        falar = "Estou com calor! Aqui está quente.";
    }

    else if(temperatura < 15){
        falar = "O clima esfriou.";
    }

    else if(luminosidade === "Baixa"){
        falar = "Preciso de mais sol.";
    }

    else if(luminosidade === "Alta"){
        falar = "Estou me queimando no sol!";
    }

    document.getElementById("falaPlanta").textContent = falar;
}

// MQTT
const options = {
    username: "SEU_USUARIO",
    password: "SUA_SENHA"
};

const client = mqtt.connect(
    "wss://SEU_HOST:8884/mqtt",
    options
);


client.on("connect", () => {
    console.log("Conectado ao HiveMQ!");
    client.subscribe("planta/umidade");
    client.subscribe("planta/temperatura");
    client.subscribe("planta/luminosidade");
});


client.on("message", (topic, message) => {
    const valor = message.toString();

    if(topic === "planta/umidade"){
        umidade = Number(valor);
        document.getElementById("umidade").innerText = umidade + "%";
    }


    if(topic === "planta/temperatura"){
        temperatura = Number(valor);
        document.getElementById("temperatura").innerText = temperatura + "°C";
    }


    if(topic === "planta/luminosidade"){
        luminosidade = valor;
        document.getElementById("luminosidade").innerText = luminosidade;
    }

    atualizarFala();
});