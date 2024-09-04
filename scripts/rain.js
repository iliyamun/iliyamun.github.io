var ctx;
var cW;
var cH;

var raindrops;

var rainStrength = 1;

function initCanvas() {

    ctx = document.getElementById("particleCanvas").getContext("2d");

    ctx.canvas.width = 1920 * 0.75; //690
    ctx.canvas.height = 1080 * 0.75; //540

    cW = ctx.canvas.width;
    cH = ctx.canvas.height;

}

function Raindrops() {

    this.x;
    this.y;
    this.s;
    this.width;
    this.height;

    this.drops = [];
    this.splashes = [];

}
Raindrops.prototype.addDrop = function() {
    
    this.x = (Math.random() * (cW + 100)) - 100;
    this.y = 0;
    this.s = (Math.random() * 7) + 2;

    this.drops.push({
        x: this.x,
        y: this.y,
        velY: 2,
        width: this.s / 3,
        height: this.s * 1.2,
        speed: this.s,
        life: 60
    });

};
Raindrops.prototype.render = function() {

    for (var i = 0; i < rainStrength; i++) {
        this.addDrop();
    };
    
    ctx.save();

    ctx.clearRect(0, 0, cW, cH);

    ctx.fillStyle = 'rgb(255, 255, 255)';
    for (var i = 0; i < this.drops.length; i++) {
        var drop = this.drops[i];

        ctx.fillRect(drop.x, drop.y, drop.width, drop.height);
        drop.y += drop.speed * 2;
        drop.x += 2;

        if (drop.y + drop.height > cH) {
            this.splashes.push(drop);

            this.drops.splice(i, 1);
        }
    };

    for (var i = 0; i < this.splashes.length; i++) {
        var splash = this.splashes[i];

        ctx.fillRect(splash.x, splash.y, splash.width/3, splash.height/3);

        splash.y -= splash.velY * splash.speed / 6;
        splash.life--;
        splash.velY -= 0.1;
        splash.x += 0.15 * splash.speed;

        if (splash.life <= 0 ) {
            this.splashes.splice(i, 1);
        }
        
    };

    ctx.restore();

};


function init() {

    raindrops = new Raindrops();

    loop();
}

function render() {

    raindrops.render();

}

function loop() {

    requestAnimationFrame(loop);
    render();


}

window.addEventListener('load', function() {
    initCanvas();
    init();
});