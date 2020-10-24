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
