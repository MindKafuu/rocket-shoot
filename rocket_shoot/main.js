let i = 0; j = 6, W = 70, H = 70;
let px = 50, py = 6;
let left = false, right = false, isSpace = false;
let buttonX = 600, buttonY = 420, buttonW = 120, buttonH = 70;
let checkPoint = false, isPress = false;
let enemyX, enemyY, enemyR, bullet1x, bullet1Y, bullet2x, bullet2Y, bulletR;
let count = 0, speed = 5, direction = 1;
let speedx = 0;
let bullet1 = [];
let bullet2 = [];
let enemy = [];
let grids = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];
enemyX = 3 * W + W / 2;
enemyY = 0 * H + H / 2;
enemyR = 60;
let circle3 = {
    x: enemyX,
    y: enemyY,
    r: enemyR
}

let score = 0;
let hp = 3;

function setup() {
    createCanvas(800, 600);
    enemy.push(circle3);
}

function draw() {
    background(255, 192, 203)
    noStroke();
    if(isPress) {
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
                let grid = grids[i][j];
                let x = i * H;
                let y = j * W;
                if (grid == 1) {
                    fill(30, 144, 255);
                } else {
                    fill(30, 144, 255);
                }
                rect(x, y, W, H);
            }
        }
        // bullet1x = i * H + 15;
        // bullet1Y = j * W - 10;
        // bullet2x = i * H + W - 15;
        // bullet2Y = j * W - 10;
        // bulletR = 20;

        bullet1x = px + 17;
        bullet1Y = py * W - 10;
        bullet2x = px - 17;
        bullet2Y = py * W - 10;
        bulletR = 20;

        //define scope
        if (i <= 0) i = 0;
        else if (i >= 6) i = 6;
        if (j <= 0) j = 0;
        else if (j >= 6) j = 6;
        if (px <= 30) px = 30;
        else if (px >= (7 * W) - 30) px = (7 * W) - 30;

        //draw charactor
        fill(220, 20, 60);
        //ellipse(i * W + W /2, j * H + H / 2, 60);
        ellipse(px, py * H + H / 2, 60);
        px += speedx;
        //draw wall 
        fill(139, 69, 19);
        rect(0, 5 * W, 7 * H, 10);

        //draw enemy
        if (enemy.length > 0) {
            fill(169, 169, 169);
            ellipse(enemy[0].x, enemy[0].y, enemy[0].r);
        }

        //draw button
        fill(50, 205, 50);
        rect(buttonX, buttonY, buttonW, buttonH);

        //draw bullet
        if (checkPoint) {
            bullet1.forEach((e, index) => {
                fill(255, 215, 0);
                ellipse(e.x, e.y, e.r)
                if (enemy.length > 0 && collisionBullet(e.x, e.y)) {
                    bullet1.splice(index, 1);
                    count += 1;
                }
                e.y -= speed;
                if (e.y < 0) {
                    bullet1.splice(index, 1);
                }
            })
            bullet2.forEach((e, index) => {
                fill(255, 215, 0);
                ellipse(e.x, e.y, e.r)
                if (enemy.length > 0 && collisionBullet(e.x, e.y)) {
                    bullet2.splice(index, 1);
                    count += 1;
                }
                e.y -= speed;
                if (e.y < 0) {
                    bullet2.splice(index, 1);
                }
            })
            if (isPress) {
                fill(0, 255, 0);
                rect(buttonX, buttonY, buttonW, buttonH);
            } else {
                fill(50, 205, 50);
                rect(buttonX, buttonY, buttonW, buttonH);
            }
        }


        if (enemy.length > 0) {
            if (enemy[0].x >= 7 * W - enemy[0].r / 2) {
                direction = -1;
            } else if (enemy[0].x <= enemy[0].r / 2) {
                direction = 1;
            }
            enemy[0].x += 5 * direction;
            enemy[0].y += 1;

            if (enemy[0].y >= 5 * H - enemy[0].r / 2) {
                gameOver();
                hp--;
            }
        }

        //kill enemy
        if (count == 6) {
            score++;
            gameOver();
        }

        stroke(255)
        textSize(32);
        text("Score :: " + score, buttonX, 50);
        text("Hp :: " + hp, buttonX, 100);
        fill(255)
        text("start", buttonX + 25, buttonY + 45);
        fill(139, 0, 139)
        text("w a s d => move charactor", buttonX - 400, 530);
        fill(139, 0, 139)
        text("space bar => shoot", buttonX - 400, 570);
        if (hp == 0) {
            fill(255, 0, 0);
            text("You lose!", buttonX, 150);
            frameRate(0)
            //let isConfirm = confirm("You lose , Play again ? ");
            // if(isConfirm){
            //     hp = 3;
            //     score = 0;
            //     frameRate(60)
            // }
        }
    }
}

function keyPressed() {
    switch (keyCode) {
        case 65:
            // left = true;
            speedx = -5;
            break;
        case 68:
            // right = true;
            speedx = 5;
            break;
        case 32:
            isSpace = true;
            break;
    }
}

function keyReleased() {
    switch (keyCode) {
        case 65:
            /* if (left) {
                i -= 1;
                left = false;
            }*/
            speedx = 0;
            break;
        case 68:
            /* if (right) {
                 i += 1;
                 right = false;
             }*/
            speedx = 0;
            break;
        case 32:
            if (isSpace) {
                createBullets()
                isSpace = false;
            }
            break;
    }
}

function mousePressed() {
    isPress = true;

    //click button
    if (mouseX > buttonX &&
        mouseX < buttonX + buttonW &&
        mouseY > buttonY &&
        mouseY < buttonY + buttonH) {
        checkPoint = true;
    } else {
        checkPoint = false;
    }
}

function mouseReleased() {
    if (isPress && checkPoint) {
        //createBullets();  
        if (hp > 0) {
            enemy.pop();
            gameOver();
        }
        frameRate(60);
        hp = 3;
        score = 0;

    }
    isPress = false;
}

function collisionBullet(x, y) {
    let dx = enemy[0].x - x;
    let dy = enemy[0].y - y;
    let d = Math.sqrt(dx * dx + dy * dy)
    if (d < enemy[0].r / 2 + bulletR / 2) {
        return true;
    }
    return false;
}

function gameOver() {
    enemy.pop();
    let circle3 = {
        x: W / 2,
        y: 50,
        r: enemyR
    }
    enemy.push(circle3);
    count = 0;
}

function createBullets() {
    let circle1 = {
        x: bullet1x,
        y: bullet1Y,
        r: bulletR
    };
    bullet1.push(circle1);
    let circle2 = {
        x: bullet2x,
        y: bullet2Y,
        r: bulletR
    };
    bullet2.push(circle2);
}