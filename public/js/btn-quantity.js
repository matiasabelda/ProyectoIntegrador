window.onload=function(){


    let minusBtn = document.getElementById("minus");
    let plusBtn = document.getElementById("plus");
    let numberPlace = document.getElementById("numberPlace");
    let number = 1; /// number value
    let min = 1; /// min number
    let max = 30; /// max number

        

        minusBtn.onclick = function(){

            
            if (number>min){
               number = number-1; /// Minus 1 of the number
               numberPlace.innerText = number ; /// Display the value in place of the number
               
            }
            if(number == min) {        
                numberPlace.style.color= "red";
                setTimeout(function(){numberPlace.style.color= "black"},500)
            }
            else {
              numberPlace.style.color="black";            
               }
                    
        }
    

        plusBtn.onclick = function(){
            if(number<max){
            number = number+1;
            numberPlace.innerText = number ; /// Display the value in place of the number
            }     
            if(number == max){
                numberPlace.style.color= "red";
                setTimeout(function(){numberPlace.style.color= "black"},500)
            }
            
            else {
                numberPlace.style.color= "black";
                
            }
        
            
        }
  
    
}