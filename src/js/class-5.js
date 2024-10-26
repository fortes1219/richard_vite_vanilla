/** class 基本用法 */

class employee {
  constructor(name, contry) {
    this.name = name;
    this.contry = contry;
  }

  hello() {
    console.log(`I am ${this.name}, I am from ${this.contry}`);
  }
}

const newEmployee = new employee('Richard', 'Taiwan');
newEmployee.hello();
// console.log('### class', newEmployee);

/** 購物車功能 */

// 商品類別
class Product {
  constructor(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

// 購物車類別
class ShoppingCart {
  #items = new Map();
  #eventHandlers = new Map();

  constructor() {
    this.#eventHandlers.set('itemsChanged', []);
  }

  addItem(product) {
    const quantity = this.#items.get(product) || 0;
    this.#items.set(product, quantity + 1);
    this.#notifyChange();
  }

  removeItem(product) {
    const quantity = this.#items.get(product);
    if (quantity === 1) {
      this.#items.delete(product);
    } else if (quantity > 1) {
      this.#items.set(product, quantity - 1);
    }
    this.#notifyChange();
  }

  getItems() {
    return this.#items;
  }

  getTotalPrice() {
    let total = 0;
    for (const [product, quantity] of this.#items) {
      total += product.price * quantity;
    }
    return total;
  }

  onItemsChanged(callback) {
    this.#eventHandlers.get('itemsChanged').push(callback);
  }

  #notifyChange() {
    this.#eventHandlers.get('itemsChanged').forEach((callback) => callback());
  }
}

// 商品列表元件
class ProductList {
  #container;
  #products;
  #cart;

  constructor(container, products, cart) {
    this.#container = container;
    this.#products = products;
    this.#cart = cart;
    this.render();
  }

  render() {
    this.#container.innerHTML = `
          <h2>商品列表</h2>
          <div class="products-grid">
              ${this.#products.map((product) => this.#renderProductCard(product)).join('')}
          </div>
      `;

    // 為所有加入購物車按鈕添加事件監聽器
    this.#container.querySelectorAll('.add-to-cart-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const productId = parseInt(button.dataset.productId);
        const product = this.#products.find((p) => p.id === productId);
        if (product) {
          this.#cart.addItem(product);
        }
      });
    });
  }

  #renderProductCard(product) {
    return `
          <div class="product-card">
              <img src="${product.image}" alt="${product.name}" class="product-image">
              <h3>${product.name}</h3>
              <p>$${product.price}</p>
              <button class="add-to-cart-btn" data-product-id="${product.id}">
                  加入購物車
              </button>
          </div>
      `;
  }
}

// 購物車UI元件
class CartUI {
  #container;
  #cart;
  #products;

  constructor(container, cart, products) {
    this.#container = container;
    this.#cart = cart;
    this.#products = products;

    // 監聽購物車變化
    this.#cart.onItemsChanged(() => this.render());

    this.render();
  }

  render() {
    this.#container.innerHTML = `
          <h2>購物車</h2>
          <div class="cart-items">
              ${this.#renderCartItems()}
          </div>
          <div class="cart-total">
              總計: $${this.#cart.getTotalPrice()}
          </div>
      `;

    // 為所有購物車按鈕添加事件監聽器
    this.#container.querySelectorAll('.cart-item-add').forEach((button) => {
      button.addEventListener('click', () => {
        const productId = parseInt(button.dataset.productId);
        const product = this.#products.find((p) => p.id === productId);
        if (product) this.#cart.addItem(product);
      });
    });

    this.#container.querySelectorAll('.cart-item-remove').forEach((button) => {
      button.addEventListener('click', () => {
        const productId = parseInt(button.dataset.productId);
        const product = this.#products.find((p) => p.id === productId);
        if (product) this.#cart.removeItem(product);
      });
    });
  }

  #renderCartItems() {
    const items = Array.from(this.#cart.getItems());
    if (items.length === 0) {
      return '<p>購物車是空的</p>';
    }

    return items
      .map(
        ([product, quantity]) => `
          <div class="cart-item">
              <img src="${product.image}" alt="${product.name}" class="cart-item-image">
              <div class="cart-item-details">
                  <h4>${product.name}</h4>
                  <p>$${product.price} x ${quantity}</p>
                  <div class="cart-item-controls">
                      <button class="cart-item-remove" data-product-id="${product.id}">-</button>
                      <span>${quantity}</span>
                      <button class="cart-item-add" data-product-id="${product.id}">+</button>
                  </div>
              </div>
          </div>
      `
      )
      .join('');
  }
}

// 初始化應用程式
function initApp() {
  // 建立商品資料
  const products = [
    new Product(1, 'iPhone 15', 35000, 'src/img/product-1.png'),
    new Product(2, 'MacBook Air', 42000, 'src/img/product-2.png'),
    new Product(3, 'AirPods Pro', 7500, 'src/img/product-3.png'),
  ];

  // 建立購物車實例
  const cart = new ShoppingCart();

  // 獲取容器元素
  const app = document.getElementById('shop');
  app.innerHTML = `
      <div class="container">
          <div class="products-section"></div>
          <div class="cart-section"></div>
      </div>
  `;

  // 初始化元件
  const productsSection = app.querySelector('.products-section');
  const cartSection = app.querySelector('.cart-section');

  new ProductList(productsSection, products, cart);
  new CartUI(cartSection, cart, products);
}

// 啟動應用程式
document.addEventListener('DOMContentLoaded', initApp);

export { Product, ShoppingCart, ProductList, CartUI };
