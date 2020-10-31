/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
			
  //alert("Привет"); 
  
  if(!str || !str.trim() || str.length==0 || str=="") {return str;}
  
  let massSubstring = [];
  let first = true;
  let position = 0;
  let substring = "";
  let strRes = "";
  let firstToUpper = false;

  for(i=0; i<str.length; i++) {

    // пропускаем все пробелы слева
    if(str[i] == "-" && first && i==position) {
        firstToUpper = true;
      position=i+1;
      continue; }
    
    // нашли первый пробел на первой позиции
    if(str[i] == "-" && first) {
      substring = str.slice(position,i);
      substring = firstToUpper ? (substring[0].toUpperCase() + substring.slice(1)) : substring;
      massSubstring.push(substring);
      position = i+1; 
      first = false; 
      continue;
    }
    
    // нашли повторный пробел
    if(str[i] == "-" && !first) {
      substring = str.slice(position,i);
      substring = substring[0].toUpperCase() + substring.slice(1);
      massSubstring.push(substring);
      position = i+1; 
    }
  }

  // после всех итерация проверяем 
  // есть ли хотябы один символ после последнего пробела в строке
  if(str.length >= position) {
      substring = str.slice(position);
      substring = substring[0].toUpperCase() + substring.slice(1);
      massSubstring.push(substring);
    }
  
  for(i=0; i<massSubstring.length; i++) { strRes = strRes + massSubstring[i]; }
  return strRes;

}


//alert(camelize('background-color'));
//alert(camelize('list-style-image'));
//alert(camelize('-webkit-transition'));
