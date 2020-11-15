export default class StepSlider {
  constructor({ steps, value = 0 }) {
    
    this.steps = steps; // количество интервалов
    this.activeStep = 1;  // текущий интервал
    this.clickFirst = true; // первый клик для вычисления каких-то параметров

    this.elem = document.createElement("div");
    this.elem.classList.add("slider");
    this.elem.addEventListener("click", (event)=>this.clickSlider(event))

    let tempHTML = `<div class="slider__thumb" style="left: 0%;">
                      <span class="slider__value">${value}</span>
                    </div>
                    <div class="slider__progress" style="width: 0%;"></div>
                    <div class="slider__steps">${this.generateSpan(steps)}</div>`;

    this.elem.insertAdjacentHTML("afterbegin", tempHTML);

  } // --- constructor ---


  // --- generateSpan() ---
  generateSpan(steps) {
      let tempSpan = "";
      for(let i=0; i<steps; i++){
          tempSpan = tempSpan + ((i==0) ? `<span class="slider__step-active"></span>` : `<span></span>`);
        } 
      return tempSpan;
    }
  // --- generateSpan() ---


  // --- clickSlider() ---
  clickSlider(event){

    // при первом клике сделать первоначальные вычисления
    if(event.target.classList.contains("slider") && this.clickFirst==true) {
      this.clickFirst = false;
      this.massInterval = this.getIntervals(this.steps, event.target.offsetWidth);
      this.thumb = this.elem.querySelector(".slider__thumb");
      
      //alert( this.massInterval[0].left + " -- " + this.massInterval[0].right + " -- " + this.massInterval[0].number + " -- " + this.massInterval[0].left);
      //alert( this.massInterval[1].left + " -- " + this.massInterval[1].right + " -- " + this.massInterval[1].number + " -- " + this.massInterval[1].left);
      //alert( this.massInterval[2].left + " -- " + this.massInterval[2].right + " -- " + this.massInterval[2].number + " -- " + this.massInterval[2].left);
      //alert( this.massInterval[3].left + " -- " + this.massInterval[3].right + " -- " + this.massInterval[3].number + " -- " + this.massInterval[3].left);
      //alert( this.massInterval[4].left + " -- " + this.massInterval[4].right + " -- " + this.massInterval[4].number + " -- " + this.massInterval[4].left);

      this.goPosition(event);
      return;
    }

    if(event.target.classList.contains("slider")) {
      this.goPosition(event);
      //alert(event.clientX-event.target.offsetLeft + ":" + event.clientY);
      //alert(event.target.offsetLeft + " --- " + event.target.offsetTop);
      //this.center = getCenter();
    }

  } // --- clickSlider() ---

  // --- getIntervals() ---
  getIntervals(steps, sliderWidth){
    let interval = sliderWidth/((steps-1)); // длина одного нтервала
    let partInterval = interval/2;          // половинка интервала
    let qtyInterval = 100/(steps-1);

    interval = Number(interval.toFixed(2));
    qtyInterval = Number(qtyInterval.toFixed(2));
    partInterval = Number(partInterval.toFixed(2));

    let pointLeft = 0;
    let massIntervals = [];
    
   // --- for() ---
    for(let i=0; i<steps; i++){
        
        if(i==0){ // первый интервал слева
              massIntervals.push(
                  { left: pointLeft, 
                    right: partInterval,
                    number: i,
                    left: 0});
              pointLeft = pointLeft + partInterval;
              continue;}

        if(i==steps-1){ // последний интервал справа
              massIntervals.push( 
                  { left: pointLeft, 
                    right: sliderWidth,
                    number: i,
                    left: 100 });
                  break;}

        massIntervals.push( // интервалы между первым и последним
                  { left:  pointLeft, 
                    right: pointLeft = pointLeft + interval,
                    number: i,
                    left: (i * qtyInterval)} );

    } // --- for() ---
    return massIntervals;
  } // --- getIntervals() ---

  // --- getCenter() ---
  goPosition(event){  
    let coordX = event.clientX-event.target.offsetLeft;
    for(let i=0; i<this.massInterval.length; i++){
      if(coordX >= this.massInterval[i].left && coordX <= this.massInterval[i].right) {
        // передвигаем бегунок
        alert(i + "--" + coordX);
        alert( this.massInterval[i].left + " -- " + this.massInterval[i].right + " -- " + this.massInterval[i].number + " -- " + this.massInterval[i].left);
        this.thumb.style.left = String(this.massInterval[i].left) + "%";
      }

    }
  
  }// --- getCenter() ---

}
