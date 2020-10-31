/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
			
  let massStr = [];
  let massNumber = [];
  let massSubString = [" ", ","];
  let first = true;
  let result = {};
  
  // помещаем исследуемую строку в массив
  let mass = [str];
  
  // передаем массив с нашей первоначальной строкой, 
  // в функции разбиваем ее на подстроки по первому разделителю - возвращаем массив, 
  // а затем разбиваем по второму и тоже возвращаем в виде массива
  mass = splitString(mass, " ");
  mass = splitString(mass, ",");
 
  // в итоги имеем массив в котором числа вперемешку со строками и символвами
  // проверяем есть ли числа среди его элементов, и копируем найденные в новый массив
    for(i=0; i<mass.length; i++) { 
    if(Number(mass[i])) { 
      massNumber.push(Number(mass[i]));	
    } 
   }
  
  // сортируем по возрастанию	
  // сортировку скопировал из учебника
    function compareNumeric(a, b) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
  }		
  massNumber.sort(compareNumeric);
  
  // первый и последние элементы помещаем в объект, который будем возвращать	
    result.min = massNumber[0];
  result.max = massNumber[massNumber.length-1];
  
      // возвращаем макс и мин числа		  
  return result; 
}


// получаем массив строк и возвращаем массив строк
function splitString(mass, symbol) {
  
  let massStr = [];
  let first, pos, str, position;
  
  // выполняем для каждого элемента массива - элементы массива это строки
  outer: for (i=0; i<=mass.length; i++) {
    
    // странно, но при переходе по метке условие остановки в цикле не сработало, 
    // поэтому выполняю свою проверку
    if(i == mass.length) { return massStr; }
    
    position = 0;  // позиция с которой начинаем поиск
    str = mass[i]; // копируем строку из массива в локальную переменную
    first = true;   

    // разбиваем строку str на массив подстрок
    while(true) {
          
          pos = str.indexOf(symbol, position);  
         
          // если разделителя нет, то копируем всю строку до конца и выходим из цикла
          if (pos==-1 && first) {
            massStr.push(str.slice(0));
            continue outer;
          } 
          
          // разделитель найден
          if(pos!=-1) {
            first = false;
            // если разделитель стоит слева, то пропускаем пропускаем итерацию  и перемещаемся к след. символу
            if (str[position] == str[pos]) { position = position + 1; continue;}
            massStr.push(str.slice(position, pos));
            position = pos + 1; //сдвигаем позицию на следующий символ после разделителя 
            continue;
          }
      
          // больше не удается найти разделитель
          if(pos==-1 && !first) {		  
            massStr.push(str.slice(position));
            continue outer;
          }
          }
         }
      } // splitString