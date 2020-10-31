/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @returns {number[]}
 */
function filterRange(arr, a, b) {
  
    let massResult = [];  
    
    if (a > b) {let buf = a; a = d; b = buf; }
    
    for(i=0; i<arr.length; i++) {
      if(arr[i]>=a && arr[i]<=b) massResult.push(arr[i]);
    }

    return massResult;

}
