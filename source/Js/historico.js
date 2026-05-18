const areaHistorico = document.getElementById("registros-historico");

let umidade = 50;
let temperatura = 27;
let luminosidade = "Boa";

const dataAtual = new Date();

const dia = String(dataAtual.getDate()).padStart(2, "0");
const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
const ano = dataAtual.getFullYear();

const dataFormato = `${dia}/${mes}/${ano}`;

const registroDia = {
    data: dataFormato,
    umidade: `${umidade}%`,
    temperatura: `${temperatura}°C`,
    luminosidade: luminosidade
};

let historicoSalvo = localStorage.getItem("historicoPlanta");

let historico = [];

if(historicoSalvo){
    historico = JSON.parse(historicoSalvo);
}

let diaJaExiste = false;

historico.forEach(function(registro){
    if(registro.data === dataFormato){
        diaJaExiste = true;}
});

if(diaJaExiste === false){
    historico.push(registroDia);
    localStorage.setItem("historicoPlanta", JSON.stringify(historico));
}

historico.forEach(function(registro){
    const card = document.createElement("div");
    card.classList.add("dia");

    card.innerHTML = `
        <div class="data">
            ${registro.data}
        </div>

        <ul>
            <li>
                Umidade:
                ${registro.umidade}
            </li>

            <li>
                Temperatura:
                ${registro.temperatura}
            </li>

            <li>
                Luminosidade:
                ${registro.luminosidade}
            </li>
        </ul>`;

    areaHistorico.appendChild(card);
});
