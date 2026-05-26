const form = document.getElementById("form-cadastro");

form.addEventListener("submit", async function(event){
    event.preventDefault();

    const email = document.getElementById("email").value;

    const senha = document.getElementById("senha").value;

    if(email === ""){
        alert("Digite seu e-mail!");
        return;
    }

    if(senha === ""){
        alert("Digite sua senha!");
        return;
    }

    const dadosCadastro = {
        email: email,
        password: senha
    };

    try{

        const resposta = await fetch(
            "http://localhost:8080/api/auth/cadastro",

            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(dadosCadastro)
            }
        );

        if(resposta.ok){
            alert("Cadastro realizado com sucesso!");

            window.location.href = "login.html";
        }

        else{
            alert("Erro ao cadastrar usuário.");
        }

    }

    catch(erro){
        console.log(erro);

        alert("Erro na conexão com a API.");
    }

});