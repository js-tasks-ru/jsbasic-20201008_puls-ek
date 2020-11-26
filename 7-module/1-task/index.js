import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.visibleArrowLeft = false;
    this.visibleArrowRight = true;
    this.activeLink = undefined;
    
    this.elem = document.createElement("div");
    this.elem.classList.add("ribbon");

    this.elem.insertAdjacentHTML("beforeend", this.createButtonLeftRight("right"));
    this.elem.append(this.createLinks());// cсоздаем ссылки
    this.elem.insertAdjacentHTML("beforeend", this.createButtonLeftRight("left"));
 
    // элементы с которыми работаем
    this.arrowLeft    = this.elem.querySelector('button.ribbon__arrow_left');
    this.arrowRight   = this.elem.querySelector('button.ribbon__arrow_right');
    this.ribbonInner  = this.elem.querySelector('div.ribbon__inner');

    // устанавливаем обработчик на стрелки
    this.arrowLeft.addEventListener("click",    (event) => this.onClickArrow(event));
    this.arrowRight.addEventListener("click",   (event) => this.onClickArrow(event));
    this.ribbonInner.addEventListener("scroll", (event) => this.scrollRibbon(event));
    this.ribbonInner.addEventListener("click",  (event) => this.clickRibbon(event));
  }

  //--- createButtonLeftRight() ---
  createButtonLeftRight(param) {
   
    let button;

    if(param == "left"){ 
            button = `<button class="ribbon__arrow ribbon__arrow_left">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
            </button>`;
          return button;}

    if(param == "right"){ 
            button = `<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
              <img src="/assets/images/icons/angle-icon.svg" alt="icon">
              </button>`;
            return button;}
    }
  //--- createButtonLeftRight() ---

  // --- clickRibbon() ---
  clickRibbon(event) {   


      if(event.target.tagName == "A" && this.activeLink == undefined) {
          event.target.classList.add("ribbon__item_active"); 
          this.activeLink = event.target;
          this.elem.dispatchEvent(this.createEvent(event.target));
          return;
        }

      if(event.target.tagName == "A" && this.activeLink != event.target) {
          this.activeLink.classList.remove("ribbon__item_active");  
          event.target.classList.add("ribbon__item_active"); 
          this.activeLink = event.target;
          this.elem.dispatchEvent(this.createEvent(event.target));
          return;
        }

      if(event.target.tagName == "A" && this.activeLink == event.target) {
          this.elem.dispatchEvent(this.createEvent(event.target));
        }

    }  
  // --- clickRibbon() ---


  // createEvent()
  createEvent(elem){

    let userEvent = new CustomEvent('ribbon-select', { // имя события должно быть именно 'ribbon-select'
            detail: elem.dataset.id, // уникальный идентификатора категории из её объекта
            bubbles: true // это событие всплывает - это понадобится в дальнейшем
          });

    return userEvent;

  }

  // --- createLink() ---
  createLinks() {   
    let elemDiv = document.createElement("div");
    elemDiv.classList.add("ribbon__inner");
    let tempLink;
    for(let i=0; i<this.categories.length; i++) {
        tempLink = `<a href="#" class="ribbon__item" data-id="${this.categories[i].id}">${this.categories[i].name}</a>`;
        elemDiv.insertAdjacentHTML("beforeend", tempLink);
      }
    return elemDiv;
   }  
  // --- createLink() ---



  // --- onClickArrow() ---
  onClickArrow(event){
      let elem = event.target;
      // клик на картинке или на диве слева
      if(elem.classList.contains("ribbon__arrow_left")  || elem.parentElement.classList.item(1) == "ribbon__arrow_left"){ 
        this.move("left"); }
      // клик на картинке или на диве	справа
      if(elem.classList.contains("ribbon__arrow_right") || elem.parentElement.classList.item(1) == "ribbon__arrow_right"){
        this.move("right"); }
    }
  // --- onClickArrow() ---



  // --- move() ---
  move(direction){
       if(direction == "left")  { this.ribbonInner.scrollBy(-350,0); }
       if(direction == "right") { this.ribbonInner.scrollBy(350,0); }
    }
  // --- move() ---



  // --- scrollRibbon() ---
  scrollRibbon(event) {   

      let scrollWidth = event.target.scrollWidth;
      let scrollLeft  = event.target.scrollLeft;
      let clientWidth = event.target.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth; // число пикселей, например, 100 или 0.
      
      if(scrollRight<1){this.arrowRight.classList.remove("ribbon__arrow_visible");  this.visibleArrowRight = false;} 
      if(scrollLeft <1){this.arrowLeft.classList.remove("ribbon__arrow_visible"); this.visibleArrowLeft = false;}
      
      if(scrollLeft >1 && this.visibleArrowLeft == false) {this.arrowLeft.classList.add("ribbon__arrow_visible"); this.visibleArrowLeft = true;}
      if(scrollRight >1 && this.visibleArrowRight == false) {this.arrowRight.classList.add("ribbon__arrow_visible"); this.visibleArrowRight = true;}

    }  
  // --- scrollRibbon() ---


} // class RibbonMenu
