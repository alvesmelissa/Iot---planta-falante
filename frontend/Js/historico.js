const token = localStorage.getItem("token");

if(!token){
    alert("Usuário não autenticado.");

    window.location.href = "login.html";
}

const areaHistorico = document.getElementById("registros-historico");

async function carregarHistorico(){
    try{
        const resposta = await fetch(
            `${API_URL}/api/monitoramento/eventos`,
            {
                method: "GET",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if(!resposta.ok){
            alert("Erro ao carregar histórico.");

            return;
        }

        const historico = await resposta.json();

        areaHistorico.innerHTML = "";

        historico.forEach(function(registro){
            const card = document.createElement("div");

            card.classList.add("dia");

            const dataFormatada = new Date(registro.dataHora).toLocaleString("pt-BR");

            card.innerHTML = `
                <div class="data">${dataFormatada}</div>

                <ul>
                    <li>
                        Evento: ${registro.tipoEvento}
                    </li>

                    <li>
                        Descrição: ${registro.descricao}
                    </li>
                </ul>
            `;

            areaHistorico.appendChild(card);

        });

    }

    catch(erro){
        console.log(erro);

        alert("Erro na conexão com a API.");
    }

}

carregarHistorico();