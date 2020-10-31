/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  
  ul = document.createElement("ul");

  for(i=0; i<friends.length; i++) {
	  
      let li = document.createElement("li");
      li.innerHTML = friends[i].firstName + " " + friends[i].lastName;
      ul.append(li);
  }

  return ul;
}
