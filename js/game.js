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
  
  // setup bear var as global
  var bear;

  // assign bear object on page load
  $(document).ready(function start(){
  
    bear = new Bear();
  
  });

  
  // bind move function to keyup 
  $(document).on("keyup", moveBear(e));

function moveBear(e) {
  
   //codes of the four keys
   const KEYUP = 38;
   const KEYDOWN = 40;
   const KEYLEFT = 37;
   const KEYRIGHT = 39;
  
   if (e.keyCode == KEYRIGHT) {
     bear.move(1, 0)
   } // right key
  
   if (e.keyCode == KEYLEFT) {
     bear.move(-1, 0)
   } // left key
  
   if (e.keyCode == KEYUP) {
    bear.move(0, -1)
   } // up key
  
   if (e.keyCode == KEYDOWN) {
    bear.move(0, 1)
   } // down key
}
