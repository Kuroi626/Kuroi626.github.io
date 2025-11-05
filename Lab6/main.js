const container = document.querySelector("#produtos");
const cesto = document.querySelector("#cesto");

carregarProdutos();
atualizaCesto();

function carregarProdutos() {
  produtos.forEach(element => {
    const card = document.createElement("article");  
    const nome = document.createElement("h2");
    const image = document.createElement("img");
    const price = document.createElement("p");
    const description = document.createElement("p");
    const btn = document.createElement("button");
    
    btn.style.width = "40%";
    btn.innerText = "+ Adicionar ao Cesto";
    image.style.width = "50%";
    image.style.height = "30%";
    description.style.textAlign = "center";
    card.classList.add("card");
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.width = "18vw";
    card.style.height = "30vw";
    card.style.gap = "1vw";
    nome.style.textAlign = "center";
    card.style.justifyContent = "center";
    card.style.alignItems = "center";

    image.src = element.image;
    nome.textContent = element.title;
    price.innerText = "Custo total: " + element.price + " €";
    description.innerText = element.description;

    card.appendChild(nome);
    card.appendChild(image);
    card.appendChild(price);
    card.appendChild(description);
    card.appendChild(btn);
    container.appendChild(card);

    btn.addEventListener("click", () => {
      adicionarAoCesto(element);
    });
  });
}

function adicionarAoCesto(produto) {
  let cestoAtual = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
  cestoAtual.push(produto);
  localStorage.setItem("produtos-selecionados", JSON.stringify(cestoAtual));
  atualizaCesto();
}

function atualizaCesto() {
  cesto.innerHTML = "";
  const produtosGuardados = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
  produtosGuardados.forEach(produto => {
    const card = criaProdutoCesto(produto);
    cesto.appendChild(card);
  });
  atualizaPrecoTotal(produtosGuardados);
}

function criaProdutoCesto(produto) {
  const card = document.createElement("article");
  const nome = document.createElement("h3");
  const image = document.createElement("img");
  const price = document.createElement("p");
  const btnRemover = document.createElement("button");

  nome.textContent = produto.title;
  image.src = produto.image;
  image.style.width = "30%";
  price.textContent = produto.price + " €";

  btnRemover.textContent = "Remover do Cesto";
  btnRemover.style.backgroundColor = "red";
  btnRemover.style.color = "white";

  btnRemover.addEventListener("click", () => {
    removerDoCesto(produto.title);
  });

  card.appendChild(nome);
  card.appendChild(image);
  card.appendChild(price);
  card.appendChild(btnRemover);
  return card;
}

function removerDoCesto(nomeProduto) {
  let cestoAtual = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
  cestoAtual = cestoAtual.filter(p => p.title !== nomeProduto);
  localStorage.setItem("produtos-selecionados", JSON.stringify(cestoAtual));
  atualizaCesto();
}

function atualizaPrecoTotal(listaProdutos) {
  let total = listaProdutos.reduce((soma, p) => soma + Number(p.price), 0);
  let totalElement = document.querySelector("#total");

  if (!totalElement) {
    totalElement = document.createElement("p");
    totalElement.id = "total";
    cesto.appendChild(totalElement);
  }

  totalElement.textContent = `Total: ${total.toFixed(2)} €`;
}
