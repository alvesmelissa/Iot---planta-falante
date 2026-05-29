// ============================================
// DADOS DA PLANTA ATIVA (vindos do Quiz/Login)
// ============================================
let plantaAtiva = {
    id: 1,
    nome: "Meu Cacto",
    tipo: "cacto",        // cacto, jiboia, samambaia, etc.
    localizacao: "Sol pleno",
    frequenciaRega: "Moderadamente"
};

// Carregar dados salvos do quiz
const dadosSalvos = localStorage.getItem('dadosPlanta');
if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos);
    plantaAtiva.nome = dados.plantName || "Minha Planta";
    plantaAtiva.tipo = dados.plantType || "cacto";
    plantaAtiva.localizacao = dados.localizacao || "Meia-sombra";
}

// Aplicar nome da planta na tela
const nomePlantaTopo = document.getElementById('nomePlantaTopo');
if (nomePlantaTopo) {
    nomePlantaTopo.innerHTML = plantaAtiva.nome;
}

// ============================================
// MAPEAMENTO DE IMAGENS POR TIPO DE PLANTA
// ============================================
const imagensPorPlanta = {
    cacto: {
        feliz: '../img/feliz/cactomuitofeliz.png',
        triste: '../img/triste/cactomuitotriste.png'
    },
    jiboia: {
        feliz: '../img/feliz/jiboiamuitofeliz.png',
        triste: '../img/triste/jiboiamuitotriste.png'
    },
    samambaia: {
        feliz: '../img/feliz/samambaiamuitofeliz.png',
        triste: '../img/triste/samambaiamuitotriste.png'
    },
    suculenta: {
        feliz: '../img/feliz/suculentamuitofeliz.png',
        triste: '../img/triste/suculentamuitotriste.png'
    },
    rosa: {
        feliz: '../img/feliz/hibiscomuitofeliz.png',
        triste: '../img/triste/hibiscomuitotriste.png'
    },
    orquidea: {
        feliz: '../img/feliz/orquideamuitofeliz.png',
        triste: '../img/triste/orquideamuitotriste.png'
    },
    jade: {
        feliz: '../img/feliz/jademuitofeliz.png',
        triste: '../img/triste/jademuitotriste.png'
    },
    bambu: {
        feliz: '../img/feliz/bambumuitofeliz.png',
        triste: '../img/triste/bambumuitotriste.png'
    },
    girassol: {
        feliz: '../img/feliz/girassolmuitofeliz.png',
        triste: '../img/triste/girassolmuitotriste.png'
    },
    lavanda: {
        feliz: '../img/feliz/lavandamuitofeliz.png',
        triste: '../img/triste/lavandamuitotriste.png'
    },
    liriodapaz: {
        feliz: '../img/feliz/liriodapazmuitofeliz.png',
        triste: '../img/triste/liriodapazmuitotriste.png'
    },
    costeladeadao: {
        feliz: '../img/feliz/costeladeadaomuitofeliz.png',
        triste: '../img/triste/costeladeadaomuitotriste.png'
    },
    espadadesaojorge: {
        feliz: '../img/feliz/espadadesaojorgemuitofeliz.png',
        triste: '../img/triste/espadadesaojorgemuitotriste.png'
    },
    // Fallback genérico
    generica: {
        feliz: '../img/feliz/cactomuitofeliz.png',
        triste: '../img/triste/cactomuitotriste.png'
    }
};

// ============================================
// FUNÇÃO PARA REDIRECIONAR PERFIL PARA CADASTRO
// ============================================
function configurarRedirecionamentoPerfil() {
    const perfilContainer = document.getElementById('perfilContainer');
    const fotoPerfil = document.getElementById('fotoPerfil');
    
    function irParaCadastro() {
        window.location.href = 'cadastro.html';
    }
    
    if (perfilContainer) {
        perfilContainer.addEventListener('click', irParaCadastro);
    }
    
    if (fotoPerfil) {
        fotoPerfil.addEventListener('click', irParaCadastro);
    }
}

// ============================================
// FUNÇÃO PARA ATUALIZAR O BALÃO DE FALA
// ============================================
function atualizarFalaPlanta(dados) {
    const fala = document.getElementById('falaPlanta');
    if (!fala) return;
    
    // Prioridade: problemas mais urgentes primeiro
    if (dados.umidadeSolo < 25) {
        fala.innerHTML = '🌵 Faz tanto tempo que não bebo água... Me regue por favor! 💧';
    } 
    else if (dados.umidadeSolo > 80) {
        fala.innerHTML = '💧 Estou encharcado! Deixe o solo secar um pouco. 🌊';
    }
    else if (dados.temperatura > 35) {
        fala.innerHTML = '🥵 Estou com muito calor! Me leve para um lugar mais fresco. 🌞';
    }
    else if (dados.temperatura < 15) {
        fala.innerHTML = '🥶 Estou com frio! Me proteja do vento e do frio. ❄️';
    }
    else if (dados.luminosidade < 100) {
        fala.innerHTML = '🌑 Estou no escuro! Preciso de mais luz perto da janela. 💡';
    }
    else if (dados.umidadeAr < 35) {
        fala.innerHTML = '💨 O ar está muito seco! Borrife água nas minhas folhas. 💦';
    }
    else {
        // Dica personalizada baseada no tipo da planta
        const dicas = {
            cacto: '🌵 Estou feliz! Lembre-se: cactos gostam de pouca água e muito sol.',
            suculenta: '🌱 Estou bem! Suculentas armazenam água, não exagere na rega.',
            samambaia: '🍃 Que bom! Samambaias gostam de umidade nas folhas e sombra.',
            jiboia: '🌿 Estou ótima! Jiboias se adaptam bem a diferentes ambientes.',
            rosa: '🌹 Que lindo! Rosas gostam de sol direto pela manhã.',
            orquidea: '🌸 Estou florescendo! Orquídeas gostam de luz indireta.',
            generica: '😊 Estou me sentindo bem! Obrigado por cuidar de mim. 💚'
        };
        const tipo = plantaAtiva.tipo.toLowerCase();
        fala.innerHTML = dicas[tipo] || dicas.generica;
    }
}

// ============================================
// FUNÇÃO PARA ATUALIZAR A IMAGEM DA PLANTA
// ============================================
function atualizarImagemPlanta(dados) {
    const imgPlanta = document.getElementById('iconePlanta');
    if (!imgPlanta) return;
    
    const tipo = plantaAtiva.tipo.toLowerCase();
    const imagens = imagensPorPlanta[tipo] || imagensPorPlanta.generica;
    
    // Decidir estado da planta (feliz ou triste)
    let estado = 'feliz';
    
    // Condições para ficar triste
    if (dados.umidadeSolo < 25) {
        estado = 'triste';
    } 
    else if (dados.umidadeSolo > 80) {
        estado = 'triste';
    }
    else if (dados.temperatura > 35) {
        estado = 'triste';
    }
    else if (dados.temperatura < 15) {
        estado = 'triste';
    }
    else if (dados.luminosidade < 100) {
        estado = 'triste';
    }
    else if (dados.umidadeAr < 35) {
        estado = 'triste';
    }
    
    // Trocar a imagem
    imgPlanta.src = imagens[estado];
    imgPlanta.alt = `${plantaAtiva.nome} - ${estado}`;
    
    // Atualizar também o ícone pequeno no topo
    const iconePequeno = document.getElementById('iconePequeno');
    if (iconePequeno) {
        iconePequeno.src = imagens[estado];
    }
}

// ============================================
// FUNÇÕES DE STATUS DOS SENSORES
// ============================================
function atualizarStatusTemperatura(valor) {
    const el = document.getElementById('tempStatus');
    if (!el) return;
    
    if (valor < 16) {
        el.innerHTML = 'Muito frio';
        el.className = 'status perigo';
    } else if (valor < 20) {
        el.innerHTML = 'Frio';
        el.className = 'status alerta';
    } else if (valor > 35) {
        el.innerHTML = 'Muito quente';
        el.className = 'status perigo';
    } else if (valor > 30) {
        el.innerHTML = 'Quente';
        el.className = 'status alerta';
    } else {
        el.innerHTML = 'Ideal';
        el.className = 'status ideal';
    }
}

function atualizarStatusUmidadeAr(valor) {
    const el = document.getElementById('umidadeArStatus');
    if (!el) return;
    
    if (valor < 35) {
        el.innerHTML = 'Muito seco';
        el.className = 'status perigo';
    } else if (valor < 50) {
        el.innerHTML = 'Seco';
        el.className = 'status alerta';
    } else if (valor > 80) {
        el.innerHTML = 'Úmido';
        el.className = 'status alerta';
    } else {
        el.innerHTML = 'Ideal';
        el.className = 'status ideal';
    }
}

function atualizarStatusUmidadeSolo(valor) {
    const el = document.getElementById('soloStatus');
    if (!el) return;
    
    if (valor < 25) {
        el.innerHTML = 'Muito baixa';
        el.className = 'status perigo';
    } else if (valor < 45) {
        el.innerHTML = 'Baixa';
        el.className = 'status alerta';
    } else if (valor > 75) {
        el.innerHTML = 'Alta';
        el.className = 'status alerta';
    } else {
        el.innerHTML = 'Ideal';
        el.className = 'status ideal';
    }
}

function atualizarStatusLuminosidade(valor) {
    const el = document.getElementById('luzStatus');
    if (!el) return;
    
    if (valor < 100) {
        el.innerHTML = 'Muito baixa';
        el.className = 'status perigo';
    } else if (valor < 500) {
        el.innerHTML = 'Baixa';
        el.className = 'status alerta';
    } else if (valor > 8000) {
        el.innerHTML = 'Alta';
        el.className = 'status alerta';
    } else {
        el.innerHTML = 'Ideal';
        el.className = 'status ideal';
    }
}

// ============================================
// FUNÇÃO PARA ATUALIZAR A BARRA DE SAÚDE
// ============================================
function atualizarBarraSaude() {
    let saude = 0;
    
    // Umidade do Solo (peso 35%)
    if (dadosSensor.umidadeSolo >= 40 && dadosSensor.umidadeSolo <= 70) saude += 35;
    else if (dadosSensor.umidadeSolo >= 25 && dadosSensor.umidadeSolo <= 80) saude += 20;
    else if (dadosSensor.umidadeSolo >= 15 && dadosSensor.umidadeSolo <= 85) saude += 10;
    else saude += 5;
    
    // Temperatura (peso 25%)
    if (dadosSensor.temperatura >= 18 && dadosSensor.temperatura <= 28) saude += 25;
    else if (dadosSensor.temperatura >= 15 && dadosSensor.temperatura <= 32) saude += 15;
    else saude += 5;
    
    // Luminosidade (peso 25%)
    let luzIdeal = 2000;
    if (plantaAtiva.localizacao === 'Sol pleno') luzIdeal = 3000;
    if (plantaAtiva.localizacao === 'Sombra') luzIdeal = 500;
    
    if (dadosSensor.luminosidade >= luzIdeal * 0.5 && dadosSensor.luminosidade <= luzIdeal * 1.5) saude += 25;
    else if (dadosSensor.luminosidade >= luzIdeal * 0.3) saude += 15;
    else saude += 5;
    
    // Umidade do Ar (peso 15%)
    if (dadosSensor.umidadeAr >= 50 && dadosSensor.umidadeAr <= 70) saude += 15;
    else if (dadosSensor.umidadeAr >= 40 && dadosSensor.umidadeAr <= 80) saude += 10;
    else saude += 5;
    
    const percentual = Math.min(100, Math.max(0, saude));
    const barra = document.getElementById('barraSaude');
    const porcentagemEl = document.getElementById('porcentagemSaude');
    
    if (barra) {
        barra.style.width = `${percentual}%`;
        
        // Cor da barra
        if (percentual < 25) {
            barra.style.background = '#f44336';
            if (porcentagemEl) porcentagemEl.style.color = '#f44336';
        } else if (percentual < 50) {
            barra.style.background = '#ff9800';
            if (porcentagemEl) porcentagemEl.style.color = '#ff9800';
        } else if (percentual < 70) {
            barra.style.background = '#ffc107';
            if (porcentagemEl) porcentagemEl.style.color = '#ffc107';
        } else if (percentual < 90) {
            barra.style.background = '#8bc34a';
            if (porcentagemEl) porcentagemEl.style.color = '#8bc34a';
        } else {
            barra.style.background = '#4caf50';
            if (porcentagemEl) porcentagemEl.style.color = '#4caf50';
        }
    }
    
    if (porcentagemEl) {
        porcentagemEl.innerHTML = `${Math.floor(percentual)}%`;
    }
}

// ============================================
// DADOS SIMULADOS DOS SENSORES (DEPOIS VEM DO MQTT)
// ============================================
let dadosSensor = {
    temperatura: 28,
    umidadeAr: 65,
    umidadeSolo: 18,
    luminosidade: 320
};

// ============================================
// FUNÇÃO PRINCIPAL - ATUALIZAR TELA COMPLETA
// ============================================
function atualizarTela() {
    // Atualizar valores numéricos
    const tempEl = document.getElementById('temperatura');
    const umidadeArEl = document.getElementById('umidadeAr');
    const umidadeSoloEl = document.getElementById('umidadeSolo');
    const luminosidadeEl = document.getElementById('luminosidade');
    
    if (tempEl) tempEl.innerHTML = dadosSensor.temperatura;
    if (umidadeArEl) umidadeArEl.innerHTML = dadosSensor.umidadeAr;
    if (umidadeSoloEl) umidadeSoloEl.innerHTML = dadosSensor.umidadeSolo;
    if (luminosidadeEl) luminosidadeEl.innerHTML = dadosSensor.luminosidade;
    
    // Atualizar status dos sensores
    atualizarStatusTemperatura(dadosSensor.temperatura);
    atualizarStatusUmidadeAr(dadosSensor.umidadeAr);
    atualizarStatusUmidadeSolo(dadosSensor.umidadeSolo);
    atualizarStatusLuminosidade(dadosSensor.luminosidade);
    
    // Atualizar balão de fala
    atualizarFalaPlanta(dadosSensor);
    
    // Atualizar imagem da planta (feliz/triste)
    atualizarImagemPlanta(dadosSensor);
    
    // Atualizar barra de saúde
    atualizarBarraSaude();
}

// ============================================
// SIMULAÇÃO DE DADOS (PARA TESTE - DEPOIS SUBSTITUIR PELO MQTT)
// ============================================
function iniciarSimulacao() {
    setInterval(() => {
        dadosSensor.temperatura = (20 + Math.random() * 14).toFixed(1);
        dadosSensor.umidadeAr = (40 + Math.random() * 45).toFixed(0);
        dadosSensor.umidadeSolo = Math.floor(15 + Math.random() * 70);
        dadosSensor.luminosidade = Math.floor(200 + Math.random() * 2000);
        
        atualizarTela();
    }, 10000);
}

// ============================================
// FUNÇÃO PARA RECEBER DADOS REAIS DO MQTT
// ============================================
function receberDadosReais(dados) {
    // dados deve ter o formato:
    // {
    //   temperatura: 23.5,
    //   umidadeAr: 65.2,
    //   umidadeSolo: 42,
    //   luminosidade: 850
    // }
    dadosSensor = dados;
    atualizarTela();
}

// ============================================
// CARREGAR RESUMO DA SEMANA (HISTÓRICO)
// ============================================
function carregarResumoSemana() {
    const container = document.getElementById('listaResumo');
    if (!container) return;
    
    // Dados simulados (depois vem do localStorage/histórico)
    const dias = [
        { nome: 'Seg', texto: 'Atenção', classe: 'amarelo-texto' },
        { nome: 'Ter', texto: 'Sede', classe: 'vermelho-texto' },
        { nome: 'Qua', texto: 'Atenção', classe: 'amarelo-texto' },
        { nome: 'Qui', texto: 'Bem', classe: 'verde-texto' },
        { nome: 'Sex', texto: 'Excelente', classe: 'verde-texto' }
    ];
    
    container.innerHTML = dias.map(d => `
        <div class="item-resumo">
            <span>${d.nome}</span>
            <p class="${d.classe}">${d.texto}</p>
        </div>
    `).join('');
}

// ============================================
// INICIALIZAR
// ============================================
function init() {
    // Configurar redirecionamento do perfil para cadastro
    configurarRedirecionamentoPerfil();
    
    // Carregar resumo da semana
    carregarResumoSemana();
    
    // Carregar imagem inicial
    const tipo = plantaAtiva.tipo.toLowerCase();
    const imagens = imagensPorPlanta[tipo] || imagensPorPlanta.generica;
    
    const imgPlanta = document.getElementById('iconePlanta');
    if (imgPlanta) {
        imgPlanta.src = imagens.feliz;
    }
    
    const iconePequeno = document.getElementById('iconePequeno');
    if (iconePequeno) {
        iconePequeno.src = imagens.feliz;
    }
    
    // Inicializar tela
    atualizarTela();
    
    // Iniciar simulação (substituir pelo MQTT depois)
    iniciarSimulacao();
    
    // Expor função global para ser chamada pelo MQTT
    window.receberDadosReais = receberDadosReais;
}

// Iniciar tudo quando a página carregar
document.addEventListener('DOMContentLoaded', init);