function Bear() {
  
   this.dBear = 100;
   this.bear = $("#bear");
  
   
  
   this.id = this.bear.attr("id");
  
   this.offset = this.bear.offset();
  
   this.x = this.offset.left;
   this.y = this.offset.top;

   this.move = function(xDir, yDir) {
    this.x += this.dBear * xDir;
    this.y += this.dBear * yDir;
    this.display();
   };

   this.display = function() {
     this.bear.css("left", this.x + "px");
     this.bear.css("top",  this.y + "px");
     
     this.bear.css("display", "absolute");
   };
  
}


// create new bear on page load
$(document).ready(function start(){
  
    var bear = new Bear();
  
  )};
