/**
 * truncate
 * @param {string} str
 * @param {number} maxlength
 * @returns {string}
 */
function truncate(str, maxlength) {
		
	if (firstTest(str, maxlength)) {
			str = str.slice(0, maxlength-1) + "…";
			return str;
		}
		
	return str;	
}


function firstTest(str, maxlength){
		if (!str || typeof str != 'string' || str.length <= maxlength ) return false; 
		return true;
	}