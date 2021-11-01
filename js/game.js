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
  
  // setup bear and bee vars as global
  var bear;
  var bees = new Array();
  var updateTimer; 

  // assign bear object on page load
  $(document).ready(function start(){
  
    bear = new Bear();
    makeBees();
  
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


$("#dBear").on("keyup", function(){
  
  console.log("keyup");
  console.log($("#dBear").val());
  
  bear.dBear = $("#dBear").val();
  
});




class Bee {
   constructor(beeNumber) {
     //the HTML element corresponding to the IMG of the bee
     this.bee = createBeeImg(beeNumber);
     //iits HTML ID
     this.id = this.bee.attr("id");
     //the left position (x)
     this.x = this.bee.offset().left;
     //the top position (y)
     this.y = this.bee.offset().top;
     
     this.move = function(dx, dy) {
       //move the bees by dx, dy
       this.x += dx;
       this.y += dy;
       this.display();
     };
     
    this.fitBounds = function() {

     let parent = this.bee.parent();

     let iw = this.bee.width();
     let ih = this.bee.height();

     let l = parent.offset().left;
     let t = parent.offset().top;

     let w = parent.width();
     let h = parent.height();

     if (this.x < 0) this.x = 0;
     if (this.x > w - iw) this.x = w - iw;
     if (this.y < 0) this.y = 0;
     if (this.y > h - ih) this.y = h - ih;

   };     
     
    this.display = function() {
     this.bee.css("left", this.x + "px");
     this.bee.css("top",  this.y + "px");
     
     this.bee.css("display", "absolute");
      
   };  
  }
}

function createBeeImg(wNum) {
  
   //get dimension and position of board div
   let boardDiv = $("#board");
   let boardDivW = boardDiv.width();
   let boardDivH = boardDiv.height();
   let boardDivX = boardDiv.offset().left;
   let boardDivY = boardDiv.offset().top;
  
  //create the IMG element
   let img = $("<img></img>").appendTo("#board");
   img.attr("src", "images/bee.gif");
   img.attr("width", "100");
   img.attr("alt", "A bee!");
   img.attr("id", "bee" + wNum);
   img.attr("class", "bee"); //set class of html tag img
  
  //add the IMG element to the DOM as a child of the board div
   img.css("display", "absolute");
  
  //set initial position 
   let x = getRandomInt(boardDivW);
   let y = getRandomInt(boardDivH);
   img.css("left", (boardDivX + x) + "px");
   img.css("top", (y) + "px");
   
  //return the img object
   return img;
}

function getRandomInt(max){
  
  return Math.floor((Math.random() * max) + 1);
  
}


function makeBees() {
   //get number of bees specified by the user
   let nbBees = $("#nbBees").val();
   nbBees = Number(nbBees); //try converting the content of the input to a number
  
   if (isNaN(nbBees)) { //check that the input field contains a valid number
    window.alert("Invalid number of bees");
    return;
   }
  
   //create bees 
   let i = 1;
   while (i <= nbBees) {
     var num = i;
     var bee = new Bee(num); //create object and its IMG element
     bee.display(); //display the bee
     bees.push(bee); //add the bee object to the bees array
     i++;
   }
}


function moveBees() {
   //get speed input field value
   let speed = $("#speedBees").val();
   
  //move each bee to a random location
   for (let i = 0; i < bees.length; i++) {
     let dx = getRandomInt(2 * speed) - speed;
     let dy = getRandomInt(2 * speed) - speed;
     bees[i].move(dx, dy);
     
     isHit(bees[i], bear); //we add this to count stings
   }
}

  function updateBees() { // update loop for game
      console.log("update");
     //move the bees randomly
     moveBees();
      
     let score = $("#hits").html();
     if (score >= 1000){
      clearTimeout(updateTimer);
      window.alert("GAME OVER");
     }
     
    
     //use a fixed update period
     let period = $("#periodTimer").val();
     //update the timer for the next move
     updateTimer = setTimeout(updateBees(), period);
}


function isHit(defender, offender) {
  
   if (overlap(defender, offender)) { //check if the two image overlap
     console.log("hit");
     let score = $("#hits").html();
     score = Number(score) + 1; //increment the score
     $("#hits").html(score); //display the new score
   }
}

function overlap(element1, element2) {
   //consider the two rectangles wrapping the two elements
   //rectangle of the first element
   left1 = $(element1).offset().left; 
   top1 = $(element1).offset().top; 
   right1 = $(element1).offset().left + $(element1).width(); 
   bottom1 = $(element1).offset().top + $(element1).height(); 
   
  //rectangle of the second element
   left2 = $(element2).offset().left; 
   top2 = $(element2).offset().top; 
   right2 = $(element2).offset().left + $(element2).width(); 
   bottom2 = $(element2).offset().top + $(element2).height(); 
  
  //calculate the intersection of the two rectangles
   x_intersect = Math.max(0, Math.min(right1, right2) - Math.max(left1, left2));
   y_intersect = Math.max(0, Math.min(bottom1, bottom2) - Math.max(top1, top2));
   intersectArea = x_intersect * y_intersect;
  
  //if intersection is nil no hit
   if (intersectArea == 0 || isNaN(intersectArea)) {
     return false;
   }
    return true;
}


