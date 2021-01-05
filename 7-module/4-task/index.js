export default class StepSlider {
  
  // --- начало ---
  constructor({ steps, value = 0 }) {
    
    this.steps = steps;     // количество интервалов
    this.clickFirst = true; // первый клик для вычисления каких-то параметров
    this.activePos = 0;     // текущая позиция бегунка

    this.elem = document.createElement("div");
    this.elem.classList.add("slider");
    this.elem.addEventListener("click", (event)=>this.clickSlider(event)); 

    let tempHTML = `<div class="slider__thumb" style="left: 0%;">
                      <span class="slider__value">${value}</span>
                    </div>
                    <div class="slider__progress" style="width: 0%;"></div>
                    <div class="slider__steps">${this.generateSpan(steps)}</div>`;

    this.elem.insertAdjacentHTML("afterbegin", tempHTML);

    // находим бегунок
    let thumb = this.elem.querySelector(".slider__thumb");
    this.thumb = thumb;
    thumb.ondragstart = function(){return false;};
    thumb.addEventListener("pointerdown", (event)=>this.p_DownSlider(event)); // вешаем обработчик на бегунок 

    this.activeSpan     = this.elem.querySelector(".slider__step-active"); // текущий SPAN
    this.massSpan       = this.elem.querySelectorAll(".slider__steps > span"); // все элементы SPAN
    this.sliderValue    = this.elem.querySelector(".slider__value"); // 
    this.sliderProgress = this.elem.querySelector(".slider__progress"); //
  } // --- конец ---

  // --- начало ---
  generateSpan(steps) {
      let tempSpan = "";
      for(let i=0; i<steps; i++){
        if(i==0){
            tempSpan = tempSpan + `<span class="slider__step-active"></span>`;
          } else {tempSpan = tempSpan + `<span></span>`;}
        } 
      return tempSpan;
    } // --- конец ---


  // --- начало ---
  p_DownSlider(event) {

    event.target.style.zIndex = 1000;

    this.elem.classList.add("slider_dragging");
    // при первом клике делаем первоначальные вычисления
    if(this.clickFirst==true) {
      this.clickFirst = false;     
      this.coords = this.elem.getBoundingClientRect();                                          // сбрасываем признак первого нажатия
      this.calcInterval(this.steps, event.target.parentElement.offsetWidth); // выполняем первоначальные вычисления 
    }

    let onMove = (event)=> {
      this.findPosition(event, this.coords, false, "eventOther"); 
    }

    let onUp = (event)=> {
      this.findPosition(event, this.coords, true, "eventOther"); 
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      this.elem.classList.remove("slider_dragging");
    }

    document.addEventListener('pointermove', onMove); 
    document.addEventListener('pointerup', onUp);
  
  } // --- конец ---


    // --- начало ---
    clickSlider(event){

      // при первом клике делаем первоначальные вычисления
      if(event.target !== this.thumb && event.currentTarget.classList.contains("slider") && this.clickFirst==true) {
        this.clickFirst = false; 
        this.coords = this.elem.getBoundingClientRect();                // сбрасываем признак первого нажатия
        this.calcInterval(this.steps, event.currentTarget.offsetWidth); // выполняем первоначальные вычисления 
        this.findPosition(event, this.coords, false, "sliderClick"); // в функции определяем к какому интервало относится сделанный клик
        return;                   // возвращаемся чтобы не выполнилось идущее следом условие
      }
  
      // при повторном клике на слайдере просто определем принадлежности клика интервалу и перемещаем бегунок
      if(event.target !== this.thumb && event.currentTarget.classList.contains("slider")) {
        this.findPosition(event, this.coords, false, "sliderClick");
      }
    } // --- конец ---


  // --- начало ---
  calcInterval(steps, sliderWidth) {

    let remainder = (steps-1) % 2; // остаток от деления на два - будем проверять количество интервалов на четность
    let structParam = {};
    structParam.sliderWidth      = sliderWidth;            // длина в пикселях
    structParam.oneProc          = sliderWidth/100;        // один процент длины в пикселях
    structParam.interval         = sliderWidth/(steps-1);  // длина одного нтервала в пикселях
    structParam.intervalProc     = 100/(steps-1);          // один интервал в процентах
    structParam.interval_05      = structParam.interval/2; // половина интервала в пикселях
    structParam.interval_05_Proc = structParam.intervalProc/2; // половина интервала в процентах
    structParam.qtyInterval      = steps-1;                // количество интервалов
    structParam.qtySpan          = steps;                  // количество спанов
    this.structParam             = structParam;            // также сохраняем ссылку в This

    // еще нужно учесть, что интервал может быть один и состоять всего из 2-ух спанов, 
    // т.е. всего 2 точки - левая и правая

    // определяем четное или нет количество интервалов - понадобится при поиске принадлежности точки к тому или иному интервалу
    // ПОИСК ПРОИСХОДИТ ОТ СЕРЕДИНЫ, А НЕ ОТ ЛЕВОГО КРАЯ
    if(remainder>0) { 
        structParam.eventNumber = false; 
      } else structParam.eventNumber = true;

    if(structParam.eventNumber){  
      structParam.counter = (structParam.qtyInterval / 2 ) - 1;        // начало поиска с середины - 1
      } else { structParam.counter = (structParam.qtyInterval - 1 ) / 2; } // начало поиска с середины

    // заполняем массив с координатами
    let massInterval = this.fillArray(structParam);
    this.massInterval = massInterval;
    // Number(interval.toFixed(5));

  } // --- конец ---

  // --- начало ---
  // заполняем массив с координатами
  // элементы массива - это струкутры, которые описывают интервалы на прямой: левая и прававая координаты, 
  // центр и номер интервала.
  fillArray(struct) { 

      let i=1;
      let massInterval = [];
      
      // первя метка
      massInterval.push({     left   : 0, 
                              right  : struct.interval, 
                              center : struct.interval_05, 
                              number : 0}
                          ); 

      // в цикле заполняем промежуточные точки между первой и последней
      for(i; i < struct.qtyInterval-1; i++) { 
          massInterval.push({ left   : massInterval[i-1].right, 
                              right  : massInterval[i-1].right + struct.interval, 
                              center : massInterval[i-1].right + struct.interval_05, 
                              number : i}
                            );  
          } // for конец

      // последняя метка
      massInterval.push({     left   : massInterval[i-1].right, 
                              right  : massInterval[i-1].right + struct.interval, 
                              center : massInterval[i-1].right + struct.interval_05, 
                              number : i }
                          );
      //alert( massInterval[0].left + " -- " + massInterval[0].right + " -- " + massInterval[0].number + " -- " + massInterval[0].center);
      return massInterval;
   } // --- конец ---

  // --- начало ---
  newPosPx_To_Percent(maxPos, newPos){
    let newPosPercent = (100 * newPos)/maxPos;
    //alert(newPosPercent);
    return newPosPercent;
  }
  // --- конец ---

  // --- начало ---
  findPosition(event, coords, last, nameEvent){
   
    // объявляем переменные
    let newPosLeft, 
        maxPosLeft, 
        newPosPercent, 
        counter;

    // если зашли с клика на полосе Slider
    if (nameEvent == "sliderClick") { 
      newPosLeft = event.pageX - coords.left; // новая координата по Оси X
      maxPosLeft = coords.right - coords.left;                   // максимальная координата по Иксу   
      newPosPercent = this.newPosPx_To_Percent(maxPosLeft, newPosLeft);
      //alert(nameEvent);
      //return;
    } 

    // если зашли с любого другого события
    if (nameEvent == "eventOther") {

      newPosLeft = event.pageX - coords.left;  // новая координата по Оси X
      maxPosLeft = coords.right - coords.left; // максимальная координата по Иксу      
      newPosPercent = this.newPosPx_To_Percent(maxPosLeft, newPosLeft);
  
      if(newPosLeft <= 0) { 
            this.thumb.style.left = `${0}%`; 
            this.sliderProgress.style.width = String(0) + "%"; 
            if(last==true){this.generateEvent(0);}
            return; 
          }
  
      if(newPosLeft >= maxPosLeft) { 
            this.thumb.style.left = `${100}%`; 
            this.sliderProgress.style.width = String(100) + "%"; 
            if(last==true){this.generateEvent(this.structParam.qtyInterval);}
            return; 
          }
        
      // last = true только тогда, когда отпускаем мышку Up, в остальных случаях last = false
      if(last == false){ 
          this.thumb.style.left = `${newPosPercent}%`; // передвигаем бегунок
          this.sliderProgress.style.width = String(newPosPercent) + "%"; // передвигаем строку индикации
        }
    } // если зашли во всех остальных случаях

    counter = this.structParam.counter; // начальный индекс массива с интервалами massInterval
  
    for(;;){
      
      // 1. Если кликнули точно по центру интервала, то считаем что клик относится к метке(спану) расположенному левее
      // и перемещаем бегунок к левой границе интервала
      if(newPosLeft == this.massInterval[counter].center){ this.goPosition(this.massInterval[counter].number, last, nameEvent); break; } 
      
      // 2. Если клик на левой или правой границе интервала
      if(newPosLeft == this.massInterval[counter].left)  { this.goPosition(this.massInterval[counter].number, last, nameEvent); break;} 
      if(newPosLeft == this.massInterval[counter].right) { this.goPosition(this.massInterval[counter].number+1, last, nameEvent); break;} 

      // 3. Если клик правее чем правая граница интервала, тогда берем след интервал справа, и снова проверяем
      if(newPosLeft > this.massInterval[counter].right)  { counter = counter + 1; continue;} 
      
      // 4. Если клик левее чем левая граница интервала, тогда берем след интервала слева, и снова проверяем
      if(newPosLeft < this.massInterval[counter].left)   { counter = counter - 1; continue;} 
      
      // 5. Если клик внутри интервала, то проверяем где находится точка относительно центра
      if(newPosLeft < this.massInterval[counter].right && newPosLeft > this.massInterval[counter].left) { 
      
        // если точка справа от центра, то она относится к правому интервалу
        if(newPosLeft > this.massInterval[counter].center){ this.goPosition(this.massInterval[counter].number+1, last, nameEvent); break;}

        // если точка слева от центра, то она относится к левому интервалу
        if(newPosLeft < this.massInterval[counter].center){ this.goPosition(this.massInterval[counter].number, last, nameEvent); break;}
      
      }           
    }  // for конец*/ 
  }// --- конец ---

  // --- начало ---
  goPosition(numPos, last, nameEvent){

    if(numPos != this.activePos) { 
      this.activePos = numPos;
      this.sliderValue.textContent = numPos;                // устанавливаем номер 
      this.activeSpan.classList.remove("slider__step-active");    // удаляем класс
      this.massSpan[numPos].classList.add("slider__step-active"); // добавляем класс  
      this.activeSpan = this.massSpan[numPos];              // сохраняем активный СПАН
    } 

    if(last == true || nameEvent == "sliderClick"){ 
      //alert("Привет!");   
      let left = this.structParam.intervalProc * numPos;
      this.thumb.style.left = String(left) + "%";           // передвигаем бегунок
      this.sliderProgress.style.width = String(left) + "%"; // передвигаем бегунок
      this.generateEvent(numPos);
    }
  }
  // --- конец --

  // --- начало ---
  generateEvent(numPos){
    let userEvent = new CustomEvent('slider-change', {    // имя события должно быть именно 'slider-change'
      detail: numPos, // значение 0, 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    })
    this.elem.dispatchEvent(userEvent);
  }
  // --- конец ---

}
