/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
			
	let strRes = "";
	let first = true;

	for(i=0; i<users.length; i++) {

			//небольшая предварительнаяч проверка
			if(typeof users[i] == "object" && "age" in users[i] && "name" in users[i]) {
					
					if (users[i]["age"] <= age && first == true ) {
							strRes = strRes + users[i]["name"] + ", " + users[i]["balance"];
							first = false;
							continue;	
						} 

					if (users[i]["age"] <= age) {
							strRes =  strRes + "\n" + users[i]["name"] + ", " + users[i]["balance"];	
						}

				} ;
		}
	
	return strRes;
	
}
