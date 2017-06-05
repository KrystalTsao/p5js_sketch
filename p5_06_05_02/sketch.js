function setup() {
  var circles = [],
      circle = {},
      overlapping = false,
      NumCircles = 200,
      protection = 10000,
      counter = 0,
      canvasWidth = window.innerWidth,
      canvasHeight = window.innerHeight;

  createCanvas(canvasWidth, canvasHeight);

  // populate circles array
  // brute force method continues until # of circles target is reached
  // or until the protection value is reached
  while (circles.length < NumCircles &&
         counter < protection) {
    // create new circle for this iteration
    circle = {
      x: random(width),
      y: random(height),
      r: random(3, 36)
    };
    overlapping = false;
    
    // check that it is not overlapping with any existing circle
    // another brute force approach, checking all existing circles for overlap
    for (var i = 0; i < circles.length; i++) {
      var existing = circles[i];
      var d = dist(circle.x, circle.y, existing.x, existing.y)
      if (d < circle.r + existing.r) {
        // They are overlapping
        overlapping = true;
        // do not add to array
        break;
      }
    }
    
    // add valid circles to array
    if (!overlapping) {
      circles.push(circle);      
    }
    
    counter++;
  }
  
  // circles array is complete
  // draw canvas once
  background("#233")
  fill("#FFD700");
  noStroke();
  for (var i = 0; i < circles.length; i++) {
    ellipse(circles[i].x, circles[i].y, 
            circles[i].r*2, circles[i].r*2);
  }
}

function draw() {
  background(255,255,255);  
  
  //circles bounce against each others and against boxes
  circles.bounce(circles);
  //boxes are "immovable"
  circles.bounce(boxes);
  
  //all sprites bounce at the screen edges
  for(var i=0; i<allSprites.length; i++) {
  var s = allSprites[i];
  if(s.position.x<0) {
    s.position.x = 1;
    s.velocity.x = abs(s.velocity.x);
  }
  
  if(s.position.x>width) {
    s.position.x = width-1;
    s.velocity.x = -abs(s.velocity.x);
    }
  
  if(s.position.y<0) {
    s.position.y = 1;
    s.velocity.y = abs(s.velocity.y);
  }
  
  if(s.position.y>height) {
    s.position.y = height-1;
    s.velocity.y = -abs(s.velocity.y);
    } 
  }
    
  drawSprites();
  
}
