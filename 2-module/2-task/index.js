/**
 * Проверяем объект obj на пустоту
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
  // сорри за мой английский
  let qtyProp = 0;
  for(key in obj){ qtyProp = qtyProp + 1;}
  return !qtyProp;
  
}

// - объект со свойством undefined должен считаться не пустым
// - если у объекта есть хоть одно свойство, то он не пустой
// - {} должен вернуть true
// - объект с удалённым свойством - пустой