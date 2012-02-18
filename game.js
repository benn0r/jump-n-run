window.onload = (function() {
    var WIDTH = 800,
        HEIGHT = 640;
    // Initialize Crafty
    Crafty.init(WIDTH, HEIGHT);
    
    Crafty.sprite(32, "terrain.png", {
        grass: [3,0],
        blue: [13,12],
      });
    
    Crafty.c("Box", {
        init: function() {
        	this.addComponent("2D, Canvas, Color, Twoway, Mouse, Tween, crate, Gravity");
            
            this.bind("Click", function(e) {
//                alert(1);
            });
            
            this.w = 32;    // width
            this.h = 32;    // height
            this.color("#FF0000");
        }
    });
    
    Crafty.c("platform", {
    	init: function() {
    		this.addComponent("2D, Canvas");
            this.color("#00FF00");
            
            this.w = WIDTH;
            this.h = 3;
    	}
    });
    
    /*
     * Create an entity with Crafty.e(..) that
     *  - can be drawn (2D) on a HTML canvas (Canvas)
     *  - has a background color (Color)
     *  - can be moved with WASD or arrow keys (Fourway)
     */
//    var platform = Crafty.e("2D, Canvas, Color, platform").attr({x: 0, y: HEIGHT - 3});
    
    Crafty.e("2D, DOM, Canvas, Color").attr({x: 0, y: 0, w: WIDTH, h: HEIGHT}).color("#8fa4ff");
    
    for (var i = 0; i < 20; i++) {
    	Crafty.e("2D, DOM, grass").attr({x: i * 32, y: HEIGHT - 32});
    }
    
    var pl = Crafty.e("2D, Canvas, Color, Box")
                .attr({x: 160, y: HEIGHT - 100, w: 32, h: 32}) // for Component 2D
                .color("#FF0000") // for Component Color
                .twoway(5, 4) // for Component Fourway
    			.gravity("grass");
});