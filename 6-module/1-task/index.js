/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {

  constructor(rows) {
    this.elem = this.createAll(rows);  
    // ПОЧЕМУ-ТО НЕ СМОГ ПОВЕСИТЬ ОБРАБОТЧИК СРАЗУ ЭЛЕМЕНТА ????
    let massElemClose = this.elem.querySelectorAll("tr :last-child");
    for (let elem of massElemClose) { elem.addEventListener("click", this.delElement) }
  } // constructor
    
    createAll(rows){ 
      
      let massLength = rows.length;

	  let tab = document.createElement("table");
      let thead = document.createElement("thead");
      let row = createRows(rows[0], true); // задполняем заголовок таблицы
      thead.append(row);
      tab.append(thead);

      // заполняем тело таблицы
      let tbody = document.createElement("tbody"); 
      for(let i=0; i<massLength; i++) {   
          row = createRows(rows[i], false);  
          tbody.append(row);
        }  
      
      // функция, которая создает строку и заполняет ее
      function createRows(row, head) {
        
		let tr = document.createElement("tr"),
        counter = 0,
        th;
        
		for(let key in row){
            th = document.createElement("th"); 
            tr.append(th);  
            
			if(head) {
				switch(counter) {
          
						case 0: th.textContent = "Имя" ; break;
						case 1: th.textContent = "Возраст" ; break;
						case 2: th.textContent = "Зарплата" ; break;
						case 3: th.textContent = "Город" ; break;
						//default: break;
          } ; counter++;}
           
        if(!head) {th.textContent = key;}
      }
		// добавляем последний столбик c крестиком
		th = document.createElement("th");
		if(!head) { th.insertAdjacentHTML("afterBegin","<button>X</button>") } //th.addEventListener("click", this.delElement) } // добавить обработчик
		tr.append(th); 
		return tr;	
    }// function createRow
    
       tab.append(tbody);
       return tab;
    }

  delElement(event){ event.target.parentElement.parentElement.remove(); }

} // class UserTable
