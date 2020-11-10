import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  constructor(slides) {

    this.slides = slides;
    //this.elem = document.createElement("div"); 
    //this.elem.classList.add("container");

    let el_Carousel = document.createElement("div");
    el_Carousel.classList.add("carousel");

    // стрелки
    let tempArrows = `<div class="carousel__arrow carousel__arrow_right">
                        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
                      </div>
                      <div class="carousel__arrow carousel__arrow_left">
                        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
                      </div>`;
                  
    el_Carousel.insertAdjacentHTML('afterbegin', tempArrows);

    // слайды
    let el_Carousel_Inner = document.createElement("div"); 
    el_Carousel_Inner.classList.add("carousel__inner");

    for(let i=0; i<slides.length; i++) {
        
        let tempSlides = `<div class="carousel__slide" data-id="${slides[i].id}">
                            <img src="/assets/images/carousel/${slides[i].image}" class="carousel__img" alt="slide">
                            <div class="carousel__caption">
                              <span class="carousel__price">${"€" + slides[i].price.toFixed(2)}</span>
                              <div class="carousel__title">Penang shrimp</div>
                              <button type="button" class="carousel__button">
                                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                              </button>
                            </div>
                          </div>`;
        
        el_Carousel_Inner.insertAdjacentHTML('afterbegin', tempSlides);
    }

    // добавяем верстку в this
    el_Carousel.append(el_Carousel_Inner);
    this.elem = el_Carousel;

    // находим элементы с которыми будем работать и помещаем в this
    this.arrowLeft 	   = this.elem.querySelector(".carousel__arrow.carousel__arrow_left");	 // DIV влево
    this.arrowLeft.style.display = 'none';
		this.arrowRight 	 = this.elem.querySelector(".carousel__arrow.carousel__arrow_right");	 // DIV вправо
    this.carousel	  	 = this.elem.querySelector(".carousel__inner"); // DIV carousel	
    //this.slideWidth    = this.carousel.offsetWidth;
    this.qtySlides		 = slides.length;
		this.carouselLeft  = 0;
		this.current  		 = 1;
    this.firstClick  	 = true;

    // устнавливаем обработчики на стрелки
		let massArrows = el_Carousel.querySelectorAll(".carousel__arrow");
    for(let i=0; i<massArrows.length; i++) { massArrows[i].addEventListener("click", (event) => this.onClickArrow(event)) }

    // устнавливаем обработчики на плюсик
    let massButtons = this.elem.querySelectorAll('.carousel__slide');
    for(let i=0; i<massButtons.length; i++) { massButtons[i].addEventListener("click", (event) => this.onClickButton(event))}

  }

  // обработчик для кнопок листания   
  onClickArrow(event){
        let elem = event.target;
        // клик на картинке или на диве слева
        if(elem.classList.contains("carousel__arrow_left") || elem.parentElement.classList.item(1) == "carousel__arrow_left"){ 
            this.move("left", this.arrowLeft); }
        
            // клик на картинке или на диве	справа
        if(elem.classList.contains("carousel__arrow_right") || elem.parentElement.classList.item(1) == "carousel__arrow_right"){
            this.move("right", this.arrowRight); }
    }

  // обработчик при щелчке на Плюсе
  onClickButton (event) {

    // номер слайда
    let numSlide = this.current-1;
    
    // елемент на котором кликнули
    let elem = event.target;

    if(elem.classList.contains("carousel__button") || elem.parentElement.classList.item(1) == "carousel__button"){
      let userEvent = new CustomEvent("product-add", { // имя события должно быть именно "product-add"
        detail: this.slides[numSlide].id, // Уникальный идентификатора товара из объекта товара
        bubbles: true // это событие всплывает - это понадобится в дальнейшем
      });
      this.elem.dispatchEvent(userEvent);
    }
      
    }

  // функция выполняющая перелистывание   
  move(direction, arrow){

      if(this.current == 1) {this.arrowLeft.style.display = '';}
      if(this.current == this.qtySlides) {this.arrowRight.style.display = '';} 
      if(this.firstClick) {this.firstClick = false; this.carouselLeft = 0;this.slideWidth = this.carousel.offsetWidth;}
      
      if(direction == "right" && this.current == this.qtySlides-1){
        //передвигаем на последний слайдер и скрываем кнопку
        this.current = this.qtySlides;
        //this.carouselLeft = this.carousel.offsetLeft - this.containerWidth;
        this.carouselLeft = this.carouselLeft - this.slideWidth;
        this.carousel.style.transform = "translateX(" + String(this.carouselLeft) + "px)";
        arrow.style.display = 'none';
        return;
      }
      
      if(direction == "right" && this.current < this.qtySlides){
        //cдвигаем влево
        this.current = this.current + 1;
        this.carouselLeft = this.carouselLeft - this.slideWidth;
        this.carousel.style.transform = "translateX(" + String(this.carouselLeft) + "px)";
        arrow.style.display = '';
        return;
      }	
      
      if(direction == "left" && this.current == 2){
        //передвигаем на последний слайдер и скрываем кнопку
        this.current = 1;
        this.carouselLeft = this.carouselLeft + this.slideWidth;
        this.carousel.style.transform = "translateX(" + String(this.carouselLeft) + "px)";
        arrow.style.display = 'none';
        return;
      }				
      
      if(direction == "left" && this.current > 1){
        //cдвигаем вправо
        this.current = this.current - 1;
        this.carouselLeft = this.carouselLeft + this.slideWidth;
        this.carousel.style.transform = "translateX(" + String(this.carouselLeft) + "px)";
        arrow.style.display = '';
        return;
      }	
    }
  }
