// ================= LOGIN =================
const loginModal = document.getElementById('loginModal');
const loginSubmit = document.getElementById('loginSubmit');
const mainContent = document.getElementById('mainContent');
const mainHeader = document.getElementById('mainHeader');
const welcomeUser = document.getElementById('welcomeUser');
const logoutBtn = document.getElementById('logoutBtn');

const productsContainer = document.getElementById('productsContainer');
const basketItems = document.getElementById('basketItems');
const basketTotal = document.getElementById('basketTotal');

const sizePopup = document.getElementById('sizePopup');
const confirmSizeBtn = document.getElementById('confirmSizeBtn');
const closePopup = document.getElementById('closePopup');

let basket = [];
let selectedProduct = null;

// ================= LOGIN =================
loginSubmit.addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if(!username || !password){
        alert("Մուտքագրիր անուն և գաղտնաբառ");
        return;
    }
    loginModal.classList.remove('show');
    mainContent.classList.remove('hide');
    mainHeader.classList.remove('hide');
    welcomeUser.textContent = `Բարի գալուստ, ${username}!`;
    renderProducts('fish');
    sessionStorage.setItem('basketItems', JSON.stringify([]));
});

logoutBtn.addEventListener('click', () => {
    mainContent.classList.add('hide');
    mainHeader.classList.add('hide');
    loginModal.classList.add('show');
    sessionStorage.setItem('basketItems', JSON.stringify([]));
});

// ================= PRODUCTS DATA =================
const products = {
    fish: [
        { name: "Սաղմոն", image: "salmon.jpg", prices: { small:8000, medium:12000, large:15000 } },
        { name: "Թունա", image: "tuna.jpg", prices: { small:7000, medium:10500, large:13000 } },
        { name: "Իկրա Սև", image: "caviar_black.jpg", prices: { small:20000, medium:35000, large:50000 } },
        { name: "Իկրա Կարմիր", image: "caviar_red.jpg", prices: { small:15000, medium:25000, large:40000 } },
        { name: "Սեբաս", image: "sebas.jpg", prices: { small:9000, medium:14000, large:18000 } },
        { name: "Սքվիդ ֆիշ", image: "squid_fish.jpg", prices: { small:6000, medium:9000, large:12000 } },
        { name: "Լաբրաքս", image: "labrax.jpg", prices: { small:10000, medium:16000, large:22000 } },
        { name: "Անկորա", image: "anchora.jpg", prices: { small:5000, medium:8000, large:11000 } },
        { name: "Պարվուս", image: "parvus.jpg", prices: { small:6500, medium:10000, large:15000 } },
        { name: "Գալենոս", image: "galenos.jpg", prices: { small:7000, medium:11000, large:14000 } },
        { name: "Թյուզ", image: "tyuz.jpg", prices: { small:7500, medium:11500, large:14500 } }
    ],
    crustaceans: [
        { name: "Լոբստեր", image: "lobster.jpg", prices: { small:15000, medium:25000, large:35000 } },
        { name: "Կրաբ", image: "crab.jpg", prices: { small:10000, medium:18000, large:25000 } },
        { name: "Օկտոպուս", image: "octopus.jpg", prices: { small:12000, medium:18000, large:25000 } },
        { name: "Շելֆիշ", image: "shellfish.jpg", prices: { small:8000, medium:13000, large:20000 } },
        { name: "Կլամ", image: "clam.jpg", prices: { small:7000, medium:12000, large:18000 } },
        { name: "Կրիվետկա", image: "carida.jpg", prices: { small:9000, medium:14000, large:20000 } },
    ],
    beer: [
        { name: "Lager", image: "lager.jpg", prices: { small:1500, medium:2000, large:3000 } },
        { name: "Dark Beer", image: "darkbeer.jpg", prices: { small:1800, medium:2500, large:3500 } },
        { name: "Pale Ale", image: "paleale.jpg", prices: { small:2000, medium:2700, large:3800 } },
        { name: "Stout", image: "stout.jpg", prices: { small:2200, medium:3000, large:4200 } },
        { name: "Wheat Beer", image: "wheatbeer.jpg", prices: { small:1800, medium:2500, large:3500 } },
        { name: "IPA", image: "ipa.jpg", prices: { small:2500, medium:3300, large:4500 } },
        { name: "Saison", image: "saison.jpg", prices: { small:1900, medium:2600, large:3700 } }
    ]
};

// ================= RENDER PRODUCTS =================
function renderProducts(category){
    productsContainer.innerHTML = '';
    products[category].forEach(product=>{
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price-list">
                <p>Փոքր՝ ${product.prices.small}֏</p>
                <p>Միջին՝ ${product.prices.medium}֏</p>
                <p>Մեծ՝ ${product.prices.large}֏</p>
            </div>
            <button class="addBasketBtn">Քցել Զամբյուղ</button>
            <div class="basket-qty">Քանակ՝ 0</div>
        `;
        productsContainer.appendChild(card);

        const addBtn = card.querySelector('.addBasketBtn');
        const qtyDisplay = card.querySelector('.basket-qty');

        addBtn.addEventListener('click', ()=>{
            selectedProduct = product;
            sizePopup.classList.remove('hide');
        });
    });
}

// ================= SIZE POPUP =================
let chosenSize = null;
sizePopup.querySelectorAll('.size-options button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        chosenSize = btn.dataset.size;
    });
});

confirmSizeBtn.addEventListener('click', ()=>{
    if(!chosenSize){ alert("Ընտրեք չափը"); return; }
    let existing = basket.find(item => item.name===selectedProduct.name && item.size===chosenSize);
    if(existing) existing.qty++;
    else basket.push({
        name: selectedProduct.name,
        size: chosenSize,
        price: selectedProduct.prices[chosenSize],
        qty: 1
    });
    sessionStorage.setItem('basketItems', JSON.stringify(basket));
    updateBasket();
    sizePopup.classList.add('hide');
    chosenSize = null;
});

closePopup.addEventListener('click', ()=>{
    sizePopup.classList.add('hide');
    chosenSize = null;
});

// ================= UPDATE BASKET =================
function updateBasket(){
    basketItems.innerHTML = '';
    let total = 0;
    basket.forEach(item=>{
        const li = document.createElement('li');
        li.textContent = `${item.name} (${item.size}) x${item.qty} (${item.price*item.qty}֏)`;
        basketItems.appendChild(li);
        total += item.price*item.qty;
    });
    basketTotal.textContent = total;
}

// ================= CATEGORY BUTTONS =================
document.querySelectorAll('.categoryBtn').forEach(btn=>{
    btn.addEventListener('click', ()=>renderProducts(btn.dataset.cat));
});
