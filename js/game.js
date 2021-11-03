 
  // setup bear and bee vars as global
  var bear;
  var bees = new Array();
 
  //take start time and init timer
  lastStingTime = new Date();
  var updateTimer; 

$(document).ready(function(){
    console.log('page loaded!!!');
     // hide reset btn until game start
    $('#reset-btn').hide();
 
  // start game on btn press
  $('#start-btn').on('click', function(){
      start();
   });
 
      // reset game using params currently in inputs
   $('#reset-btn').on('click', function(){
     restart();                 
   });
      
  $("#dBear").on("blur", function(){

      var db = $("#dBear").val();

      db = Number(db); //try converting the content of the input to a number

     if (isNaN(db)) { //check that the input field contains a valid number
      window.alert("Invalid speeed of bear");
      return;
     }
     else{
       bear.dBear = db;
      }

   });
  


});


function start(){
    
    bear = new Bear();
    makeBees();
   
   // disable start button to prevent bee spamming
   $('#start-btn').attr('disabled', true);
   
   // show reset button
   $('#reset-btn').show();
   

   // bind move function to keyup 
   $(document).on("keyup", function(e){
         // pass event to move
          moveBear(e);
     });

    // inital call to start loop
      updateBees();
   
};


 function restart(){

    console.log('restarting');

   // remove all bees from board
   $('.bee').remove();
  
     //end loop
   clearTimeout(updateTimer);

   // start game
   start();

 }


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
     
    
    this.x += this.dBear * xDir;
    this.y += this.dBear * yDir;
    
     // fit to bounds then display
    this.fitBounds();
    this.display();
   };

   this.display = function() {
     this.bear.css("left", this.x);
     this.bear.css("top",  this.y);
     
     this.bear.css("display", "relative");
   };
  
}
 


  function updateBees() { // update loop for game

       //move the bees randomly -- and check for hits
       moveBees();

      // check if score is high enough to end game
       let score = $("#hits").html();
       if (score >= 1000){
        clearTimeout(updateTimer);
        window.alert("GAME OVER"); // display best duration in popup
         $("#hits").html('0');
       }


       //use a fixed update period
       let period = $("#periodTimer").val();
       //update the timer for the next move
       updateTimer = setTimeout('updateBees()', period);
     }
    
  

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







class Bee {
   constructor(beeNumber) {
     //the HTML element corresponding to the IMG of the bee
     this.bee = createBeeImg(beeNumber);
     //iits HTML ID
     this.id = this.bee.attr("id");
     //the left position (x)
     this.x = this.bee.css('left');
     //the top position (y)
     this.y = this.bee.css('top');
     
     // remove units from returned values
     this.x = parseInt(this.x);
     this.y = parseInt(this.y);
     
     this.move = function(dx, dy) {
       
       //move the bees by dx, dy
       this.x += dx;
       this.y += dy;
       
       // check in bounds and display
       this.fitBounds();
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
        
      // set x and y and display type
      this.bee.css({left: this.x, top: this.y, position: 'absolute'});
      
   };  
  }
}

function getRandomInt(max){
  
  return Math.floor((Math.random() * max) + 1);
  
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
  

  
 
  //set initial position 
   let x = getRandomInt(boardDivW);
   let y = getRandomInt(boardDivH);
    
   // set coords and display type
   img.css({left: x, top: y, position: 'absolute'});

  //return the img object
   return img;
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


function isHit(defender, offender) {
  
   if (overlap(defender, offender)) { //check if the two image overlap
     let score = $("#hits").html();
     score = Number(score) + 1; //increment the score
     $("#hits").html(score); //display the new score
   
      //calculate longest duration
     let newStingTime = new Date();
     let thisDuration = newStingTime - lastStingTime;
     lastStingTime = newStingTime;
     let longestDuration = Number($('#duration').html());
     if (longestDuration === 0) {
     longestDuration = thisDuration;
     } else {
     if (longestDuration < thisDuration) longestDuration = thisDuration;
     }
  
     $('#duration').html(longestDuration);
  
   }
}

function overlap(element1, element2) {
   //consider the two rectangles wrapping the two elements
   //rectangle of the first element
    
  // get selectors for elements
   e1 = '#' + element1.id;
   e2 = '#' + element2.id;
  
   left1 = $(e1).offset().left; 
   top1 = $(e1).offset().top; 
   right1 = $(e1).offset().left + $(e1).width(); 
   bottom1 = $(e1).offset().top + $(e1).height(); 
   
  //rectangle of the second element
   left2 = $(e2).offset().left; 
   top2 = $(e2).offset().top; 
   right2 = $(e2).offset().left + $(e2).width(); 
   bottom2 = $(e2).offset().top + $(e2).height(); 
  
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


