const container = document.querySelector("#produtos");
const cesto = document.querySelector("#cesto");
const filtroCategoria = document.querySelector("#filtro-categoria");
const filtroPreco = document.querySelector("#filtro-preco");
const pesquisaInput = document.querySelector("#pesquisa");

let todosProdutos = [];

Promise.all([
  fetch('https://fakestoreapi.com/products').then(res => res.json()),
  fetch('https://fakestoreapi.com/products/categories').then(res => res.json())
])
.then(([produtos, categorias]) => {
  todosProdutos = produtos;
  carregarCategorias(categorias);
  carregarProdutos(produtos);
})
.catch(error => console.error("Erro ao buscar dados:", error));

function carregarCategorias(categorias) {
  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat[0].toUpperCase() + cat.slice(1);
    filtroCategoria.appendChild(option);
  });
}

function carregarProdutos(produtos) {
  container.innerHTML = "";
  produtos.forEach(element => {
    const card = document.createElement("article");
    const nome = document.createElement("h2");
    const image = document.createElement("img");
    const price = document.createElement("p");
    const description = document.createElement("p");
    const btn = document.createElement("button");

    btn.textContent = "+ Adicionar ao Cesto";
    btn.style.padding = "0.5rem";
    btn.style.cursor = "pointer";
    image.style.width = "50%";
    description.style.textAlign = "center";

    card.classList.add("card");
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";
    card.style.justifyContent = "space-between";
    card.style.width = "20vw";
    card.style.minHeight = "30vw";
    card.style.gap = "0.8vw";
    card.style.padding = "1vw";
    card.style.border = "1px solid #ccc";
    card.style.borderRadius = "10px";
    card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";

    nome.textContent = element.title;
    image.src = element.image;
    price.innerText = "💶 " + element.price + " €";
    description.innerText = element.description.slice(0, 80) + "...";

    card.append(nome, image, price, description, btn);
    container.appendChild(card);

    btn.addEventListener("click", () => adicionarAoCesto(element));
  });
}

filtroCategoria.addEventListener("change", e => {
  const categoria = e.target.value;
  if (!categoria) {
    carregarProdutos(todosProdutos);
  } else {
    fetch(`https://fakestoreapi.com/products/category/${categoria}`)
      .then(res => res.json())
      .then(produtos => carregarProdutos(produtos))
      .catch(err => console.error("Erro ao filtrar:", err));
  }
});

filtroPreco.addEventListener("change", e => {
  let produtosFiltrados = [...todosProdutos];

  if (filtroCategoria.value) {
    produtosFiltrados = produtosFiltrados.filter(p => p.category === filtroCategoria.value);
  }

  if (e.target.value === "asc") {
    produtosFiltrados.sort((a, b) => a.price - b.price);
  } else if (e.target.value === "desc") {
    produtosFiltrados.sort((a, b) => b.price - a.price);
  }

  carregarProdutos(produtosFiltrados);
});

pesquisaInput.addEventListener("input", e => {
  const termo = e.target.value.toLowerCase();
  const filtrados = todosProdutos.filter(p => p.title.toLowerCase().includes(termo));
  carregarProdutos(filtrados);
});

function adicionarAoCesto(produto) {
  let cestoLocal = JSON.parse(localStorage.getItem("cesto")) || [];
  cestoLocal.push(produto);
  localStorage.setItem("cesto", JSON.stringify(cestoLocal));
  renderizarCesto();
}

function renderizarCesto() {
  const cestoLocal = JSON.parse(localStorage.getItem("cesto")) || [];
  cesto.innerHTML = "<h2>🛒 Cesto</h2>";

  cestoLocal.forEach((element, index) => {
    const card = document.createElement("article");
    const nome = document.createElement("h3");
    const image = document.createElement("img");
    const price = document.createElement("p");
    const btnRemover = document.createElement("button");

    nome.textContent = element.title;
    image.src = element.image;
    image.style.width = "40%";
    price.innerText = "💶 " + element.price + " €";

    btnRemover.textContent = "Remover do Cesto";
    btnRemover.style.backgroundColor = "red";
    btnRemover.style.color = "white";
    btnRemover.style.border = "none";
    btnRemover.style.padding = "0.5rem";
    btnRemover.style.marginTop = "0.5rem";
    btnRemover.style.cursor = "pointer";
    btnRemover.style.borderRadius = "6px";

    btnRemover.addEventListener("click", () => removerDoCesto(index));

    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";
    card.style.border = "1px solid #ddd";
    card.style.padding = "0.5rem";
    card.style.borderRadius = "8px";
    card.style.marginBottom = "0.8rem";

    card.append(nome, image, price, btnRemover);
    cesto.appendChild(card);
  });
}

function removerDoCesto(index) {
  let cestoLocal = JSON.parse(localStorage.getItem("cesto")) || [];
  cestoLocal.splice(index, 1);
  localStorage.setItem("cesto", JSON.stringify(cestoLocal));
  renderizarCesto();
}

renderizarCesto();
