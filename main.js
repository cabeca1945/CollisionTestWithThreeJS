var WIDTH = window.innerWidth+10;
var HEIGHT = window.innerHeight+20;

var camera = new THREE.PerspectiveCamera(60, WIDTH/HEIGHT, 0.1, 1000);
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
scene.fog = new THREE.Fog(0x000000, 1, 90, 100);

class Wall {
    constructor(x, y, z) {
        this.leftCorner = {
            xx: x,
            yy: y,
            zz: z,

            start: function() {
                var texture = new THREE.TextureLoader().load("./resources/textures/floor1.png");
                texture.repeat.set(8, 32);
                texture.wrapT = true;
                texture.wrapS = true;
                var mesh = new THREE.Mesh(new THREE.BoxGeometry(0.1, 40, 10), new THREE.MeshBasicMaterial({map: texture}));
                mesh.position.x = this.xx;
                mesh.position.y = this.yy;
                mesh.position.z = this.zz;
                scene.add(mesh);
            },

            update: function() {
                if(camera.position.x < x + 1 && camera.position.z > z - 5 && camera.position.z < z + 5 && camera.position.x > x - 1 && camera.position.y < y + 23 && camera.position.y > y - 23) {
                    camera.position.x = camera.position.x + spd;
                }
            }
        }

        this.rightCorner = {
            xx: x-10,
            yy: y,
            zz: z,

            start: function() {
                var texture = new THREE.TextureLoader().load("./resources/textures/floor1.png");
                texture.repeat.set(8, 32);
                texture.wrapT = true;
                texture.wrapS = true;
                var mesh = new THREE.Mesh(new THREE.BoxGeometry(0.1, 40, 10), new THREE.MeshBasicMaterial({map: texture}));
                mesh.position.x = this.xx;
                mesh.position.y = this.yy;
                mesh.position.z = this.zz;
                scene.add(mesh);
            },

            update: function() {
                if(camera.position.x < this.xx + 1 && camera.position.x > this.xx - 1 && camera.position.z < this.zz + 5 && camera.position.z > this.zz - 5 && camera.position.y < y + 23 && camera.position.y > y - 23) {
                    camera.position.x = camera.position.x - spd;
                }
            }
        }
        this.forwardCorner = {
            xx: x - 5,
            yy: y,
            zz: z - 5,

            start: function() {
                var texture = new THREE.TextureLoader().load("./resources/textures/floor1.png");
                texture.repeat.set(8, 32);
                texture.wrapT = true;
                texture.wrapS = true;
                var mesh = new THREE.Mesh(new THREE.BoxGeometry(10, 40, 0.1), new THREE.MeshBasicMaterial({map: texture}));
                mesh.position.x = this.xx;
                mesh.position.y = this.yy;
                mesh.position.z = this.zz;
                scene.add(mesh);
            },

            update: function() {
                if(camera.position.z > this.zz - 1 && camera.position.x > this.xx - 5 && camera.position.x < this.xx + 5 && camera.position.z < this.zz + 1 && camera.position.y < y + 23 && camera.position.y > y - 23) {
                    camera.position.z = camera.position.z - spd;
                }
            }
        }
        this.backwardCorner = {
            xx: x - 5,
            yy: y,
            zz: z + 5,

            start: function() {
                var texture = new THREE.TextureLoader().load("./resources/textures/floor1.png");
                texture.repeat.set(8, 32);
                texture.wrapT = true;
                texture.wrapS = true;
                var mesh = new THREE.Mesh(new THREE.BoxGeometry(10, 40, 0.1), new THREE.MeshBasicMaterial({map: texture}));
                mesh.position.x = this.xx;
                mesh.position.y = this.yy;
                mesh.position.z = this.zz;
                scene.add(mesh);
            },

            update: function() {
                if(camera.position.z > this.zz - 1 && camera.position.x > this.xx - 5 && camera.position.x < this.xx + 5 && camera.position.z < this.zz + 1 && camera.position.y < y + 23 && camera.position.y > y - 23) {
                    camera.position.z = camera.position.z + spd;
                }
            }
        }

        this.upCorner = {
            xx: x - 5,
            yy: y + 20,
            zz: z,

            start: function() {
                var texture = new THREE.TextureLoader().load("./resources/textures/floor1.png");
                texture.repeat.set(8, 8);
                texture.wrapT = true;
                texture.wrapS = true;
                var mesh = new THREE.Mesh(new THREE.BoxGeometry(10, 0.1, 10), new THREE.MeshBasicMaterial({map: texture}));
                mesh.position.x = this.xx;
                mesh.position.y = this.yy;
                mesh.position.z = this.zz;
                scene.add(mesh);
            },

            update: function() {
                if(camera.position.x > this.xx - 5 && camera.position.x < this.xx + 5 && camera.position.z > this.zz - 5 && camera.position.z < this.zz + 5 && camera.position.y < this.yy + 5) {
                    rb = 0;
                    camera.position.y = camera.position.y + 0.01;
                }
            }
        }

        this.update = () => {
            this.leftCorner.update();
            this.rightCorner.update();
            this.forwardCorner.update();
            this.backwardCorner.update();
            this.upCorner.update();
            requestAnimationFrame(this.update);
        }
        this.start = () => {
            this.leftCorner.start();
            this.rightCorner.start();
            this.forwardCorner.start();
            this.backwardCorner.start();
            this.upCorner.start();
        }
    }
}

function initWorld() {
    var textureFloor = new THREE.TextureLoader().load("./resources/textures/PixelRandomDefault.png");
    textureFloor.repeat.set(16, 16);
    textureFloor.wrapT = true;
    textureFloor.wrapS = true;
    var mesh = new THREE.Mesh(new THREE.BoxGeometry(500, 0.01, 500), new THREE.MeshBasicMaterial({map: textureFloor}));
    var mesh2 = new THREE.Mesh(new THREE.BoxGeometry(500, 0.01, 500), new THREE.MeshBasicMaterial({map: textureFloor}));
    mesh.position.y = -5;
    mesh2.position.y = 50;
    scene.add(mesh);
    scene.add(mesh2);
}

function INIT_DISPLAY() {
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 0;
    renderer.setSize(WIDTH, HEIGHT);
    initWorld();
    for(var i = 0; i < 25; i++) {
        var wall = new Wall(-100 + Math.random() * 200, -22 + Math.random() * 32, -100 + Math.random() * 200);
        wall.start();
        wall.update();
    }
    document.body.appendChild(renderer.domElement);
}

var isJumping = false;
var rb = 0;
var gv = 1;
var spd = 0.5;

function UPDATE() {
    renderer.render(scene, camera);
    requestAnimationFrame(UPDATE);

    if(camera.position.y > 45) {
        camera.position.y = 45;
        isJumping = false;
    }

    if(isJumping) {
        camera.position.y += 1;
        setTimeout(() => {
            isJumping = false;
        }, 500);
    }else {
        rb += gv / 100;
        camera.position.y -= rb;
        if(camera.position.y < 0) {
            camera.position.y = 0;
            rb = 0;
        }
    }

    if(camera.position.x > 240) {
        camera.position.x = 240;
    }

    if(camera.position.x < -240) {
        camera.position.x = -240;
    }

    if(camera.position.z > 240) {
        camera.position.z = 240;
    }

    if(camera.position.z < -240) {
        camera.position.z = -240;
    }

    if(isLeft) {
        camera.translateX(-spd);
    }

    if(isRight) {
        camera.translateX(spd);
    }

    if(isForward) {
        camera.translateZ(-spd);
    }

    if(isBackward) {
        camera.translateZ(spd);
    }
}

addEventListener("mousemove", function(e) {
    camera.rotation.y = -e.x / 100;
});

var isLeft = false, isRight = false;
var isForward = false, isBackward = false;

addEventListener("keydown", function(e) {
    if(e.key == "w") {
        isForward = true;
    }
    if(e.key == "a") {
        isLeft = true;
    }
    if(e.key == "s") {
        isBackward = true;
    }
    if(e.key == "d") {
        isRight = true;
    }
    if(e.keyCode == 32) {
        isJumping = true;
    }

    if(e.key == "e") {
        camera.rotation.x = 0.55;
    }

    if(e.key == "q") {
        camera.rotation.x = 0;
    }
});

addEventListener("keyup", function(e) {
    if(e.key == "w") {
        isForward = false;
    }
    if(e.key == "a") {
        isLeft = false;
    }
    if(e.key == "s") {
        isBackward = false;
    }
    if(e.key == "d") {
        isRight = false;
    }
    if(e.keyCode == 32) {
        isJumping = false;
    }
});

INIT_DISPLAY();
UPDATE();