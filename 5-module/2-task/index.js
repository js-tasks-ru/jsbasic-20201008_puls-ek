function toggleText() {
  
  elemButton = document.body.querySelector("button.toggle-text-button");

  elemButton.onclick = function(){
    
    if(text.hasAttribute("hidden")){
        text.removeAttribute("hidden") 
      } else text.setAttribute("hidden", true);
  }
}