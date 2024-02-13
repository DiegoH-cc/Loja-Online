let carrinho = []

function adicionarProduto(nome,preco,imagem){
    carrinho.push({nome,preco,imagem});
    atualizarCarrinho();

}

function removerProduto(index){
    //Splice permite remover ou alterar
    carrinho.splice(index,1);
    atualizarCarrinho();
}

function atualizarCarrinho(){
    // Criando uma contante pois não vamos alterar ela
    const listaCarrinho = document.getElementById("lista-carrinho");
    listaCarrinho.innerHTML = "";

    //forEach vai pecorrer o array nome, preco, imagem
    carrinho.forEach((produto,index)=> {
        const li = document.createElement("li");
        li.innerHTML = `
        <img src="${produto.imagem}">
        <span>${produto.nome}</span>
        <span>${produto.preco}</span>
        <button onclick="removerProduto(${index})">Remover</button>
        `;

        // apppenChild vai criar a lista que criamos a cima 
        listaCarrinho.appendChild(li);

    });

    const totalCarrinho = document.getElementById("total-carrinho");
    
    const total = carrinho.reduce
    ((total,produto)=> total + produto.preco, 0);

    totalCarrinho.innerText = total.toFixed(2);

    const carrinhoDiv = document.getElementById("carrinho");

    carrinhoDiv.style.display = "block"; // tornan o carrinho visivel de forma automática
}

//função auto executável
(function (){

    paypal.Buttons({
        createOrder: function(data, actions){
            return actions.order.create({
                purchase_units: [{

                    amount:{
                        currency_code: 'USD',
                        value: carrinho.reduce((total,produto)=> total + produto.preco,0)
                    }
                }]            
            });
        },

        onApprove: function(data, actions){
            return actions.order.capture().the(function(details){

                alert("Pagamento realizado com sucesso !");
                console.log(details);
                carrinho = []; // limpar o carrinho após a compra ser realizada
                atualizarCarrinho();
            });
        },

        onError: function(err){
            alert("Ocorreu um erro durante o pagamento", err);
        }

    }).render('#paypal-button-container');

})();