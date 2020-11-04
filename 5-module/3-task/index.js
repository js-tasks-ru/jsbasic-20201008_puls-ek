
function initCarousel() {
  
	  let carousel,
		  arrowLeft,
		  arrowRight;
	  
		// элементы с которыми работаем
		carousel   = document.body.querySelector(".carousel__inner");
		massSlides = document.body.querySelectorAll(".carousel__slide");
		arrowLeft  = document.body.querySelector(".carousel__arrow.carousel__arrow_left");	
		arrowRight = document.body.querySelector(".carousel__arrow.carousel__arrow_right");	
		
		// сразу скрываем стредку вправо
		arrowLeft.style.display = 'none';
		
		let processor = {};
		processor.arrowLeft 	 = arrowLeft; // DIV влево
		processor.arrowRight 	 = arrowRight; // DIV вправо
		processor.carousel	  	 = carousel; // DIV carousel	
		processor.qtySlides		 = massSlides.length;
		processor.current  		 = 1;
		processor.firstClick  	 = true;
		
		processor.move = function (direction, arrow){
							
				if(this.current == 1) {this.arrowLeft.style.display = '';}
				if(this.current == 4) {this.arrowRight.style.display = '';}
				
				this.slideWidth  = this.carousel.offsetWidth; 
				if(this.firstClick) {this.firstClick = false; this.carouselLeft = 0;}
				
				
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
					alert("Привет");
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
		
		// устнавливаем обработчики на стрелки
		let massArrows = document.body.querySelectorAll(".carousel__arrow");
		for(let i=0; i<massArrows.length; i++){massArrows[i].onclick = elemKlick;}
		
		function elemKlick(event){
				
				let elemTarget = event.target;
				
				// клик на картинке или на диве слева
				if(elemTarget.classList.contains("carousel__arrow_left") || elemTarget.parentElement.classList.item(1) == "carousel__arrow_left"){ 
						processor.move("left", this);
					}
					
				// клик на картинке или на диве	справа
				if(elemTarget.classList.contains("carousel__arrow_right") || elemTarget.parentElement.classList.item(1) == "carousel__arrow_right"){
						processor.move("right", this);
					}
				}
			}
