/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
	
	let sum = 0;
	
	//if(typeof salaries != "object") return 0;
	
	for (key in salaries) {
		if(typeof salaries[key] == "number") {
			sum = sum + salaries[key];
		}
	}
	
	return sum;
}
