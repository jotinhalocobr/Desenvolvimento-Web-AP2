function redirect() {
    window.location.href = 'siteBt.html'
}

function initialize(){
    let data = sessionStorage.getItem("login");
    if(data){
        mostrarDetalhesJogador()
    }
    else{
        recusarEntrada()
    }
}

async function mostrarDetalhesJogador(){
    var jogador = await buscarJogador();

    document.getElementById('texto-espera').style.display = 'none'

    var article = document.createElement('article');
    document.body.appendChild(article);

    var quadroJogador = document.createElement('div');
    quadroJogador.className = 'quadro-jogador'
    article.appendChild(quadroJogador);

    var img = document.createElement('img');
    img.src = jogador.imagem
    quadroJogador.appendChild(img);

    var detalhesJogador = document.createElement('h1');
    detalhesJogador.className = 'detalhes-jogador'
    quadroJogador.appendChild(detalhesJogador);

    quadroJogador.innerHTML += detalhesJogador.innerHTML = '<h1>Nome jogador:</h1>' 
    + '<h2>' + jogador.nome +'</h2>' 
    + '<h2>Posição:</h2>'
    + '<h2>'+ jogador.posicao + '</h2>'
    
    var infoCompleta = document.createElement('div');
    infoCompleta.className = 'info-completa'
    infoCompleta.innerHTML = 
    '<strong>Nome completo: </strong>' 
    +  jogador.nome_completo + '<br>' 
    + '<strong>Nascimento: </strong>'
    +  jogador.nascimento + '<br>' 
    + '<strong>Altura: </strong>'
    +  jogador.altura
    + '<h2>Detalhes do jogador:</h2>'
    + '<p>'+ jogador.descricao +'</p>'
    article.appendChild(infoCompleta);
}

async function buscarJogador(){
    var url_string = window.location.href
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    const response = await fetch('https://botafogo-atletas.mange.li/' + id);
    return await response.json();
}

function recusarEntrada(){
   var texto = document.getElementById('texto-espera')
   texto.innerHTML = 'É preciso estar logado para exibir detalhes.'
   texto.style.width = 'auto'
   texto.style.textAlign = 'center'
}

initialize()