/**
 * truncate
 * @param {string} str
 * @param {number} maxlength
 * @returns {string}
 */
		function truncate(str, maxlength) {

			//if (firstTest(str, maxlength)) {
			
			if (str.length > maxlength) {
					str = str.slice(0, maxlength-1) + "…";
					return str;
				} else return str;	
		}

		/*function firstTest(str, maxlength){
				
				/*alert(!str);
				alert(typeof str);
				alert(str.length);
				
				if (!str || typeof str != "string" || str.length <= maxlength) return false; 
				return true;
				
			}*/