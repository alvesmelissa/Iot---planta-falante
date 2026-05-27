const form = document.getElementById("form-login");

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

    const dadosLogin = {
        email: email,
        password: senha
    };

    try{

        const resposta = await fetch(
            `${API_URL}/api/auth/login`,

            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(dadosLogin)
            }
        );

        if(resposta.ok){
            const dados = await resposta.json();

            localStorage.setItem(
                "token",
                dados.token
            );

            alert("Login realizado com sucesso!");

            window.location.href = "perfil.html";
        }

        else{
            alert("E-mail ou senha inválidos.");
        }

    }

    catch(erro){
        console.error("Erro na API");

        alert("Erro na conexão com a API.");
    }

});
