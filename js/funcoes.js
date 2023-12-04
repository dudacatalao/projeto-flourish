// Esta funcao carrega todos os produtos nas paginas HOME e PRODUTOS.Ela recebe 2 parametros: A lista dos produtos que será renderizada, e o local onde o HTML será injetado
export function carregaProdutos(lista, gridProduto) {
    lista.forEach(item => {
        const produtoHtml = `
            <section class="products_container">
                <div class="product_card" id="${item.codigoProduto}">
                    <a href="/produto.html">
                        <img class="product_image" src="${item.imagemProduto}" id="${item.codigoProduto}">
                    </a>
                    <h1>${item.nomeProduto}</h1>
                    <p>${item.descricaoProduto}</p>
                    <p>R$ ${item.preco}</p>
                    <a href="produto_solo.html">
                        <button type="button" class="botao">
                            <p>Comprar</p>
                        </button>
                    </a>
                </div>
            </section>`;
        gridProduto.innerHTML += produtoHtml;
    });
}

// Esta funcao adiciona o evento click nos cards de produtos. Ela captura o id do elemento e salva no local storage.
function handleClick(){
    let cardProdtuos = document.querySelectorAll("product")
        cardProdtuos.forEach(card => card.addEventListener('click', (e) => {
    let idProd = e.target.id
        localStorage.setItem("IdProd",idProd)
    }))

}

// Esta funcao localiza um item em uma lista de items: recebe 2 paramentos: A lista de itens, como o catalogo de produtos, e o ID(codigo do produto) que deverá ser encontrado.
export function findItem(items, id){
    let item = items.find(produto => produto.codigoProduto == Id)
    return item
}

// Esta funcao carrega o produto encontrado pela funcao findItem na pagina do produto. Recebe como parametro o produto que será renderizado na pagina do produto
export function carregaProduto(item){
    let insertProduto = document.querySelector("section.product_detail_container")
    let html = `<section class="products_container">
                    <div class="product"> 
                        <img src="${item.imagemProduto}">
                        <h1>${item.nomeProduto}</h1>
                        <p ${item.descricaoProduto}>Bege Claro 2 - 25g</p>
                        <p ${item.preco}>R$ 69,90</p>
                        <a href="prod_solo.html">
                            <button type="button" class="botao">
                                <p>Comprar</p>
                            </button>
                        </a>
                    </div>
                </section>`
    insertProduto.innerHTML = html
}

// Esta função adiciona um item ao carrinho: recebe 2 parametros : o carrinho de compras e o produto que sera adicionado
export function addCarrinho(listaCompras, item, id) {
    const botaoComprar = document.getElementById("button"); // Altere "botaoComprar" para o ID correto do botão
    botaoComprar.addEventListener("click", () => {
        if (listaCompras.find(item => item.codigoProduto == id)) {
            alert("Item já adicionado ao carrinho.");
            let i = listaCompras.findIndex(item => item.codigoProduto == id);
            listaCompras[i].quantidade += 1;
            localStorage.setItem("carrinho", JSON.stringify(listaCompras));
        } else {
            let quantidade = parseInt(document.querySelector("#quantidade").value);
            listaCompras.push({ ...item, quantidade });
            localStorage.setItem("carrinho", JSON.stringify(listaCompras));
            alert("Item adicionado ao carrinho.");
        }
    });
}

export function valorTotalQuantidade (listaCarrinhoDeCompras){
let soma = 0
let quantidade = 0
listaCarrinhoDeCompras.forEach(
  item => {
    soma += ((item.quantidade * item.preco))
    quantidade += item.quantidade
  }  
)
document.querySelector(".qtd_price_area span:nth-child(2)").innerHTML = `R$ ${soma}`
document.querySelector(".qtd_price_area span:first-child").innerHTML = `${quantidade}`
console.log(soma, quantidade)
}



export function listCarrinhoCompras (ListaCarrinhoDeCompras,carrinho){
    ListaCarrinhoDeCompras.forEach(item => {
        let valorTotal = (item.quantidade * item.preco)
        let html =`<li class="cart_item" id="${item.codigoProduto}">
    <p>${item.nomeProduto}</p>
    <div class="cart_item_container">
        <input type="number" name="quantidade" id="" value="${item.quantidade}">
        <span class="valorTotal">R$ ${valorTotal}</span>
        <i class="bi bi-trash3-fill remove" id="${item.codigoProduto}"></i>
    </div>
    </li>`
    carrinho.innerHTML += html  
    });
}

export function deletarItem(listaCarrinhoDeCompras,valorTotalQuantidade){
    let botoesExcluir = document.querySelectorAll(".remove")
        
        botoesExcluir.forEach( botao =>
        botao.addEventListener("click", (event)=> {
       
        let cartList = document.querySelector('ul')
        let item = event.target.parentElement.parentElement
        cartList.removeChild(item)
        let itemId = item.id
        let index = listaCarrinhoDeCompras.findIndex( item => item.codigoProduto == itemId)
        listaCarrinhoDeCompras.splice(index,1)
        localStorage.setItem("carrinho",JSON.stringify(listaCarrinhoDeCompras))
        valorTotalQuantidade(listaCarrinhoDeCompras)
        cartIndicator(listaCarrinhoDeCompras)
        }))
}

export function gerarPedido(listaCarrinhoDeCompras,pedidos){
  
    let id = pedidos.length
     if (pedidos == null || pedidos == 0){id = 1}

    let endereco = {
        nome: document.querySelector("input#nome").value,
        logradouro: document.querySelector("input#logradouro").value,
        cidade: document.querySelector("input#cidade").value,
        bairro: document.querySelector("input#bairro").value,
        estado: document.querySelector("input#estado").value,
        CEP: document.querySelector("input#CEP").value,
        telefone: document.querySelector("input#telefone").value,
        email: document.querySelector("input#email").value
         }

    let pedido = {
        id: id,
        itens: listaCarrinhoDeCompras,
        endereco: endereco
    }

    pedidos.push(pedido)
    localStorage.setItem("pedidos",JSON.stringify(pedidos))
    localStorage.removeItem('carrinho')
    localStorage.removeItem('IdProd')
    alert("compra realizada com sucesso")
    location.reload()

    }

    export function cartIndicator (listaCompras){
        let indicator = document.querySelector(".cart-item-qtd")
    if (listaCompras == null || listaCompras.length == 0){
        indicator.innerHTML = 0 
        indicator.classList.remove('show')
    } else {
        indicator.innerHTML = listaCompras.length
        indicator.classList.add("show")
    }}


