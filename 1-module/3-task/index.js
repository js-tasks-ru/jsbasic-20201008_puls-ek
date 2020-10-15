/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
	if(str === undefined || str.length == 0){
		return str;
	} else { 
			return str[0].toUpperCase() + (str.length>1 ? str.slice(1): '');
		}
	}
