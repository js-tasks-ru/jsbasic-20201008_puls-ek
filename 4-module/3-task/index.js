/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
		
		let rows, cells, result;	
		rows = table.rows;
		
		for(let i=0; i<rows.length; i++){
				cells = rows[i].cells;	
				result = processCellS(rows[i], cells);
			}
		}
	
	
function processCellS(row, cells){
		
		
			for(let i=0; i<cells.length; i++){
							
				//Добавить inline-стиль style="text-decoration: line-through", если значение ячейки Age меньше 18.
				if(i == 1){	
						let perem = cells[1].textContent;
						if(perem < 18){row.style["text-decoration"] = "line-through";}
					}
				
				//Проставить класс male/female в зависимости от содержимого ячейки Gender.
				if(i == 2){
						
						//Если её значение m – класс male
						if(cells[2].textContent == "m"){row.classList.add('male');}
						
						//Если её значение f – класс female.
						if(cells[2].textContent == "f"){row.classList.add('female');}
					}
					
				//Проставить класс available/unavailable в зависимости от значения атрибута data-available у ячейки Status.
				if(i == 3){
						//Если её значение true – класс available
						if(cells[3].hasAttribute("data-available") && cells[3].dataset.available == "true"){
								row.classList.add('available');
							} 
						
						//если её значение false – класс unavailable
						if(cells[3].hasAttribute("data-available") && cells[3].dataset.available == "false"){
								row.classList.add('unavailable');
							}
							
						//Проставить атрибут hidden, если атрибута data-available нет вообще.
						if(!cells[i].hasAttribute("data-available")){
								row.setAttribute("hidden", true);
							}	
						}
					}
				}
	
