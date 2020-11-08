import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
   
    this.product = product;
    this.elem = document.createElement("div");
    this.elem.classList.add('card');

    let template =  `
      <div class="card__top">
        <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
        <span class="card__price">${"€" + product.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">Laab kai chicken salad</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>`;

      this.elem.insertAdjacentHTML("afterbegin", template);
      let elementBut = this.elem.querySelector('.card__button');
      elementBut.addEventListener("click", () => this.onClick());
    }

    onClick () {
      let userEvent = new CustomEvent("product-add", { // имя события должно быть именно "product-add"
        detail: this.product.id, // Уникальный идентификатора товара из объекта товара
        bubbles: true // это событие всплывает - это понадобится в дальнейшем
      });
      this.elem.dispatchEvent(userEvent);
    }

  }
