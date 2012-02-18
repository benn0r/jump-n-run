window.onload = (function() {
    var WIDTH = 704,
        HEIGHT = 640;
    // Initialize Crafty
    Crafty.init(WIDTH, HEIGHT);
    
    Crafty.sprite(32, "terrain.png", {
        Grass: [3,0],
        Dirt: [2,0],
        Stone: [1,0],
        Coal: [2,2],
        Lava: [13,14],
        Crafting: [11,3],
    });
    Crafty.sprite(32, "sun.png", {
    	Sun: [0,0]
    });
    
    var map = [
               ["Stone", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "Grass", "Dirt", "Stone", "Stone"],
               ["Stone", null, null, null, null, null, null, null, null, "Crafting", null, null, null, null, null, null, null, null, "Grass", "Dirt", "Stone", "Stone"],
               ["Stone", "Grass", null, null, "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", null, null, "Grass", "Grass", "Grass", "Dirt", "Stone", "Stone", "Stone"],
               ["Stone", "Dirt", null, null, "Dirt"],
               ["Stone", "Stone", "Lava", "Lava", "Stone"],
               ["Stone", "Stone", "Stone", "Stone", "Stone"]
              ];
    
    Crafty.sprite(32, "ybo1_rt2.gif", {
    	StandRight: [0,0]
    });
    Crafty.sprite(32, "ybo1_rt1.gif", {
    	MoveRight: [0,0]
    });
    Crafty.sprite(32, "ybo1_lf1.gif", {
    	MoveLeft: [0,0]
    });
    Crafty.sprite(32, "ybo1_lf2.gif", {
    	StandLeft: [0,0]
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
    
    Crafty.c("Platform", {
    	init: function() {
    		this.addComponent("2D, Canvas");
    	}
    });
    
    Crafty.c("Player", {
    	init: function() {
    		this.addComponent("2D, Canvas, Twoway, Gravity, StandRight, Collision");
    		this.sprite = "StandRight";
    		
    		this.i = 0;
    		
    		this.moveRight = "MoveRight";
    		this.moveLeft = "MoveLeft";
    		this.move = "none";
    		
    		this.bind("NewDirection", function(movement) {
    			
    			if (movement.x > 0) {
    				this.removeComponent(this.sprite);
    				this.addComponent(this.sprite = this.moveRight);
    				this.move = "right";
    			}
    			
    			if (movement.x < 0) {
    				this.removeComponent(this.sprite);
    				this.addComponent(this.sprite = this.moveLeft);
    				this.move = "left";
    			}
    			
    			if (movement.x == 0 && movement.y == 0) {
    				this.removeComponent(this.sprite);
    				this.addComponent(this.sprite = "StandRight");
    				this.move = "none";
    			}
    			
//    			console.log(movement.x + " " + movement.y);
    		});
    		
    		this.collision();
    		this.x_before = this.x;
    		this.y_before = this.y;
    		
    		this.bind("EnterFrame", function(e) {
    			this.i = this.i + 1;
    			var collision = this.hit("Platform");
    			
    			if (this.move == "right") {
	    			this.removeComponent(this.moveRight);
					this.addComponent(this.moveRight);
    			}
    			
    			if (this.move == "left") {
	    			this.removeComponent(this.moveLeft);
					this.addComponent(this.moveLeft);
    			}
    			
    			if (this.i > 5) {
    				this.i = 0;
    				if (this.moveRight == "MoveRight") {
    					this.moveRight = "StandRight";
    					this.moveLeft = "StandLeft";
    				} else {
    					this.moveRight = "MoveRight";
    					this.moveLeft = "MoveLeft";
    				}
    			}
				
				if(collision) {
					var item = collision[0];
										
//					this.x += Math.ceil(item.obj.x * -item.overlap);
//					this.y += Math.ceil(item.obj.y * -item.overlap);
					this.x = this.x_before;
					this.y = this.y_before;
				}
				
				this.x_before = this.x;
    			this.y_before = this.y;
    		});
    		
//    		this.hit("Platform", function(comp) {
//    			var movement = this._movement;
//    			
//    			if (movement.x < 0) {
//    				this.x += this._speed;
//    			}
//    			if (movement.x > 0) {
//    				this.x = this.x - this._speed - 5;
//    			}
//    		});
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
    Crafty.e("2D, DOM, Canvas, Sun").attr({x: 400, y: -10, w: 32, h: 32});
    
    for (var i = 0; i < map.length; i++) {
    	for (var j = 0; j < map[i].length; j++) {
    		if (map[i][j] != null) {
    			Crafty.e("2D, DOM" + (map[i][j] != "Lava" ? ", Platform" : "") + ", " + map[i][j]).attr({x: j * 32, y: i * 32});
    		}
    	}
    }
    
    var pl = Crafty.e("2D, Canvas, Color, Player")
                .attr({x: 32, y: 0, w: 32, h: 32}) // for Component 2D
                .twoway(5, 9) // for Component Fourway
    			.gravity("Platform")
    			.color("transparent")
    			.gravityConst(1);
});