function hideSelf() {
  
  elemButton = document.body.querySelector("button.hide-self-button");
  elemButton.onclick = function(){this.setAttribute("hidden", true);}
  
}
