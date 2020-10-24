let calculator = {
  
  read : function(a,b){
				this.peremA = a; 
				this.peremB = b;
			},
	
  sum : function(){ 
				return this.peremA + this.peremB;
			},
  
  mul : function(){
				return this.peremA * this.peremB;
			}
		
  peremA: 0,
  peremB: 0
  
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
