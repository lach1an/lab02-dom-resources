function Bear() {
  
   this.dBear = 100;
   this.bear = $("#bear");
  
   
  
   this.id = this.bear.attr("id");
  
   this.offset = this.bear.offset();
  
   this.x = this.offset.left;
   this.y = this.offset.top;
  
    this.fitBounds = function() {

     let parent = this.bear.parent();

     let iw = this.bear.width();
     let ih = this.bear.height();

     let l = parent.offset().left;
     let t = parent.offset().top;

     let w = parent.width();
     let h = parent.height();

     if (this.x < 0) this.x = 0;
     if (this.x > w - iw) this.x = w - iw;
     if (this.y < 0) this.y = 0;
     if (this.y > h - ih) this.y = h - ih;

   };


   this.move = function(xDir, yDir) {
     
    this.fitBounds();
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
  $(document).on("keyup", function(e){
      // pass event to move
       moveBear(e);
  });

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


