/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
		
		let rows,cels;
		
		rows = table.rows;
		for(let i=0; i<rows.length; i++){
				cells = rows[i].cells;
				cells[i].style.background = "red";
			}
		}
