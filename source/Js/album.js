const form = document.getElementById("form-album");

const foto = document.getElementById("foto");
const estado = document.getElementById("estado");
const descricao = document.getElementById("descricao");

const areaHistorico = document.getElementById("historico-album");

let imagemSalva = "";

foto.addEventListener("change", function(){
    const arquivo = foto.files[0];

    if(arquivo){
        const leitor = new FileReader();

        leitor.addEventListener("load", function(){
            imagemSalva = leitor.result;
        });

        leitor.readAsDataURL(arquivo);
    }
});

form.addEventListener("submit", function(event){
    event.preventDefault();

    const dataAtual = new Date();

    const dia = String(dataAtual.getDate()).padStart(2, "0");
    const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
    const ano = dataAtual.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;

    const registroAlbum = {
        data: dataFormatada,
        foto: imagemSalva,
        estado: estado.value,
        descricao: descricao.value
    };

    let albumSalvo = localStorage.getItem("albumPlanta");

    let album = [];

    if(albumSalvo){
        album = JSON.parse(albumSalvo);
    }

    let registroExiste = false;

    album.forEach(function(registro){
        if(registro.foto === registroAlbum.foto &&
            registro.estado === registroAlbum.estado &&
            registro.descricao === registroAlbum.descricao
        )
        {registroExiste = true;
        }
    });

    if(registroExiste === false){
        album.unshift(registroAlbum);
        localStorage.setItem("albumPlanta", JSON.stringify(album));
    }

    mostrarRegistros();

    form.reset();

    imagemSalva = "";
});

function mostrarRegistros(){
    areaHistorico.innerHTML = `<h2>Registros Salvos</h2>`;

    let albumSalvo = localStorage.getItem("albumPlanta");

    let album = [];

    if(albumSalvo){
        album = JSON.parse(albumSalvo);
    }

    album.forEach(function(registro){
        const card = document.createElement("div");

        card.classList.add("foto-salva");

        card.innerHTML = `
            <div class="info-foto">
                 <h3>${registro.data}</h3>
            </div>
            
            <img class="imagem" src="${registro.foto}">

            <div class="info-foto">
                <p>${registro.estado}</p>

                <p>${registro.descricao}</p>
            </div>
        `;        
        areaHistorico.appendChild(card);
    });
}

mostrarRegistros();