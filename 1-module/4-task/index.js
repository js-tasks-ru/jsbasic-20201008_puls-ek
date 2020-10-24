/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {

	//удаляем пробелы и приводим к нижнему регистру
	str = str.trim().toLowerCase();
		
	if (firstTest(str)) {
			return (str.includes("1xbet") || str.includes("xxx"));			
		}
		
	return false;	
}


function firstTest(str){
		if (!str || typeof str != 'string' || str.trim().length < 3 ) return false; 
		return true;
	}


