import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {

    // создаем корневой элемент
    this.elem = document.createElement("div");
    this.elem.classList.add("modal");
    this.elem.insertAdjacentHTML("afterBegin", this.tempModal());

    // выбираем элементы с которыми работаем
    this.container  = document.body.querySelector(".container");
    this.modalTitle = this.elem.querySelector(".modal__title");
    this.modalBody  = this.elem.querySelector(".modal__body");
    
    // признак открытого окна
    this.openWindow = false;

    // обработчик для крестика
    let modalClose = this.elem.querySelector(".modal__close");
    modalClose.addEventListener("click", (event) => this.close());
  }

  // --- open() ---
  open(){
    document.body.append(this.elem);
    document.body.classList.add("is-modal-open"); 
    this.openWindow = true;

    // обработчик для Esc
    document.body.addEventListener("keydown", this.fnKeydown = (event) => this.keydown(event)); 
  }

  keydown(event){
    if(event.code == "Escape" && this.openWindow == true){ this.close(); }
  }

  // --- open() ---
  setTitle(text){ this.modalTitle.textContent = text;} 
  setBody(node){ 
      // удаляем все вложенные элементы
      this.modalBody.innerHTML = '';
      this.modalBody.append(node); 
    }

  // --- tempModal() ---
  tempModal(){
      let modalContent =   `<div class="modal__overlay"></div>
                              <div class="modal__inner">
                                <div class="modal__header">
                                  <!--Кнопка закрытия модального окна-->
                                  <button type="button" class="modal__close">
                                    <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
                                  </button>
                                  <h3 class="modal__title"></h3>
                                  <div class="modal__body"></div>
                                </div>
                              </div>`;
                            
                            return modalContent;}
    // --- tempModal() ---

  // --- close() ---
  close(){
    this.elem.remove();
    document.body.classList.remove("is-modal-open");
    document.body.removeEventListener("keydown", this.fnKeydown); 
  }
  // --- close() ---

} // --- constructor() ---
