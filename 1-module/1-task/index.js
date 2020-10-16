/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
	
	let result=1;
			if(n==0 || n==1){
				return result;
			}else {
				while(n>1){
					result = result *(n--);
				}	
			}
			return result;
}
