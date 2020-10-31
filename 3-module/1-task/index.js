/**
 * @param   {{ name: string, age: number }[]} users
 * @returns {string[]}  объект
 */
function namify(users) {
	
	let massName = [];
	
	//если пустой его же и возвращаем
	//if( !users || !users.length ) return users;
	
	for(let user of users){
		
		if("name" in user) {
				massName.push(user.name);
			}	
		} 	
		return massName;
	//	
}


/*function firstTest(str){
		if (!str || typeof str != 'string' || !str.trim().length ) return false; 
		return true;
	}*/