var opcoesJogadores = [{texto: 'Masculino', value: 'masculino'}, 
                        {texto: 'Feminino', value: 'feminino'}, 
                        {texto: 'Elenco Completo', value: 'all'}]

function entrar() {
    var senha = document.getElementById('entrada-senha').value
    var ESTRELA = hex_md5(senha)
    if (ESTRELA === hex_md5('ESTRELA')){
        sessionStorage.setItem("login", ESTRELA);
        limpar()
        initialize()
    }
    else
        alert('senha incorreta')
}

function sair(){
    sessionStorage.clear();
    limpar()
    initialize()
}

function initialize(){
    let data = sessionStorage.getItem("login");
    if(data){
        constroiPaginaInicial()
    }
    else{
        constroiPaginaLogin()
    }
}

function constroiPaginaLogin(){
    document.getElementById('texto-boas-vindas').textContent = 'Bem Vindo ao site oficial de atletas do Botafogo'
    document.getElementById('botao-sair').className = 'esconder'
    
    var container = document.createElement('div');
    container.setAttribute("id", "container-entrada");
    document.body.appendChild(container);

    var containerInterno = document.createElement('div');
    containerInterno.setAttribute("id", "container-interno");
    container.appendChild(containerInterno);

    var containerInternoAtletas = document.createElement('h1');
    containerInternoAtletas.className = 'atletas'
    containerInternoAtletas.textContent = 'Atletas do Botafogo em 2023'
    containerInterno.appendChild(containerInternoAtletas);

    var containerInternoAtletasDescricao = document.createElement('p');
    containerInternoAtletasDescricao.className = 'atletas-descricao'
    containerInternoAtletasDescricao.textContent = 'Venha ver os melhores Atletas do melhor time do Brasil'
    containerInterno.appendChild(containerInternoAtletasDescricao);

    var fakeForm = document.createElement('div');
    fakeForm.setAttribute("id", "fake-form");
    container.appendChild(fakeForm);

    var entradaSenha = document.createElement("input");
    entradaSenha.setAttribute("id", "entrada-senha");
    entradaSenha.setAttribute("type", "password");
    entradaSenha.placeholder = 'Informe a senha.'
    fakeForm.appendChild(entradaSenha);

    var botaoSenha = document.createElement("button");
    botaoSenha.className = 'botao-senha'
    botaoSenha.textContent = 'Entrar'
    botaoSenha.onclick = entrar
    fakeForm.appendChild(botaoSenha);

    var textoSenha = document.createElement("p");
    textoSenha.className = 'texto-senha'
    textoSenha.textContent = 'Efetue login com a senha: ESTRELA'
    fakeForm.appendChild(textoSenha);
}

function constroiPaginaInicial(){
    document.getElementById('texto-boas-vindas').textContent = 'Bem Vindo a Pagina de atletas do Botafogo'
    document.getElementById('botao-sair').className = ''

    var div = document.createElement('div');
    document.body.appendChild(div);

    var barraEscolha = document.createElement('div');
    barraEscolha.setAttribute("id", "barra-escolhas");
    div.appendChild(barraEscolha);

    opcoesJogadores.forEach( function(opcao) {
        var botaoEscolha = document.createElement("button");
        botaoEscolha.className = 'botoes-escolhas'
        botaoEscolha.textContent = opcao.texto
        botaoEscolha.value = opcao.value
        botaoEscolha.setAttribute('onclick', 'selecionar(this.value)');
        barraEscolha.appendChild(botaoEscolha);
    })

    var select = document.createElement("select");
    select.setAttribute("id", "select-plantel");
    select.setAttribute('onchange', 'selecionar(this.value)');
    div.appendChild(select);

    var opt = document.createElement('option');
    opt.value = null;
    opt.selected = true
    opt.disabled = true;
    opt.innerHTML = 'Escolha o elenco';
    select.appendChild(opt);

    opcoesJogadores.forEach( function(opcao) {
        var optEscolha = document.createElement("option");
        optEscolha.value = opcao.value
        optEscolha.innerHTML = opcao.texto
        select.appendChild(optEscolha);
    })

    var textoEspera = document.createElement('h2');
    textoEspera.setAttribute("id", "texto-espera");
    textoEspera.textContent = 'Carregando...'
    div.appendChild(textoEspera);

    var containerJogadores = document.createElement('div');
    containerJogadores.setAttribute("id", "container-jogadores");
    div.appendChild(containerJogadores);
}

function limpar(){
    var e = document.getElementsByTagName('div')[0];
    e.innerHTML = ''
    e.remove()
}

async function selecionar(valor) {
    if(valor){
        var containerJogadores = document.getElementById('container-jogadores');
        containerJogadores.innerHTML = '';
        var textoEspera = document.getElementById('texto-espera');
        textoEspera.style.display = 'flex'
        const response = await fetch('https://botafogo-atletas.mange.li/' + valor);
        const data = await response.json();
        data.forEach(function(jogador){
            var jogadorArticle = document.createElement('article');
            jogadorArticle.setAttribute("data-id", jogador.id);
            jogadorArticle.className = 'jogador'
            jogadorArticle.onclick = function(){ redirecionar(jogador.id) }
            containerJogadores.appendChild(jogadorArticle);

            var jogadorImg = document.createElement('img');
            jogadorImg.src = jogador.imagem
            jogadorImg.alt = 'Imagem de '+ jogador.nome + ', atleta de futebol do Botafogo.'
            jogadorArticle.appendChild(jogadorImg);

            var jogadorDetalhes = document.createElement('h3');
            jogadorDetalhes.className = 'jogador-detalhes'
            jogadorArticle.appendChild(jogadorDetalhes);

            var jogadorMaisDetalhes = document.createElement('span');
            jogadorDetalhes.appendChild(jogadorMaisDetalhes);

            var jogadorNome = document.createElement('h2');
            jogadorNome.className = 'jogador-nome'
            jogadorNome.innerHTML = jogador.nome
            jogadorArticle.appendChild(jogadorNome);
        })
        textoEspera.style.display = 'none'
    }
}

function redirecionar(jogadorId){
    window.location.href = 'detalhes.html?id=' + jogadorId;
}



initialize()