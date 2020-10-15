/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 * Необходимо, чтобы на сайте можно было поприветствовать только пользователей, 
которые удовлетворяют следующему условию – имя не пустое, без пробелов, минимум 4 символа.
*/

function isValid(name) {
  // не пустое ИЛИ без пробелов ИЛИ менее 4
  if(name === undefined || name.length == 0 || name.indexOf(" ")!=-1 || name.length<4){
		return false;
	} return true;
}

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}
