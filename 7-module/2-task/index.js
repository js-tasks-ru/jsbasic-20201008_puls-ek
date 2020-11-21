import createElement from '../../assets/lib/create-element.js';

/*export default class Modal {
  constructor() {
    this.container = document.body.querySelector(".container") 
    this.openWindow = false;
    document.body.addEventListener("keydown", (event) => this.keydown(event)); 
  }

  keydown(event){
    if(this.openWindow == true){ this.close(); }
  }

  // --- open() ---
  open(){
    this.modal = document.createElement("div");
    this.modal.classList.add("modal");
    this.modal.innerHTML = this.tempModal();
    let modalBody = this.modal.querySelector(".modal__body");
    modalBody.append(this.node);
    this.container.append(this.modal);
    document.body.classList.add("is-modal-open"); 
    let modalClose = this.modal.querySelector(".modal__close");
    modalClose.addEventListener("click", (event) => this.close());
    this.openWindow = true;
  }
  // --- open() ---

  setTitle(text){ this.title = text; } //this.modalTitle.textContent = text; }
  setBody(node){ this.node = node; } //this.modalBody.append(elem); }

  // --- tempModal() ---
  tempModal(){
      let modalContent =   `<div class="modal__overlay"></div>
                              <div class="modal__inner">
                                <div class="modal__header">
                                  <!--Кнопка закрытия модального окна-->
                                  <button type="button" class="modal__close">
                                    <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
                                  </button>
                                  <h3 class="modal__title">${this.title}</h3>
                                  <div class="modal__body"></div>
                                </div>
                              </div>`;
                            
                            return modalContent;}
    // --- tempModal() ---

  // --- close() ---
  close(){
    this.modal.remove();
    document.body.classList.remove("is-modal-open"); 
  }
  // --- close() ---

} // --- constructor() ---*/



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

    // обработчик для Esc
    document.body.addEventListener("keydown", this.fnKeydown = (event) => this.keydown(event)); 

    // обработчик для крестика
    let modalClose = this.elem.querySelector(".modal__close");
    modalClose.addEventListener("click", (event) => this.close());
  }

  keydown(event){
    if(event.code == "Escape" && this.openWindow == true){ this.close(); }
  }

  // --- open() ---
  open(){
    document.body.append(this.elem);
    document.body.classList.add("is-modal-open"); 
    this.openWindow = true;
  }
  // --- open() ---
  setTitle(text){ this.modalTitle.textContent = text;} 
  setBody(node){ 
      // удаляем все вложенные элементы
      while (this.modalBody.firstChild) { this.modalBody.removeChild(this.modalBody.firstChild);}
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
    alert(this.fnKeydown);
    document.body.removeEventListener("keydown", this.fnKeydown); 
  }
  // --- close() ---

} // --- constructor() ---
