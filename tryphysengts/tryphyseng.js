var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function abysaglobalneneabili() {
    var canvas, canvasCtx;
    var fps = 24;
    var gravity = 1;
    var kocky = [];
    var selectedObject = 0;
    var pressedKeys = { 87: 0, 83: 0, 65: 0, 68: 0, 13: 0, 107: 0, 109: 0, 81: 0 };
    window.onload = function () {
        canvas = document.getElementById('gameCanvas');
        canvasCtx = canvas.getContext('2d');
        document.addEventListener("keydown", function (evt) { return pressedKeys[evt.keyCode]++; });
        document.addEventListener("keyup", function (evt) { return pressedKeys[evt.keyCode] = 0; });
        kocky[0] = kockaClass(60, 40, 20, 20, 'mob');
        kocky[1] = kockaClass(70, 70, 50, 50, '');
        kocky[2] = kockaClass(150, 150, 20, 20, '');
        kocky[3] = kockaClass(0, 200, 400, 20, '');
        mainInterval = setInterval(updateAll, 1000 / fps);
        setInterval(moveObject, 1000 / fps);
    };
    var kockaClass = function (x, y, width, height, type) {
        var values = { x: x, y: y, width: width, height: height, type: type, color: "red", collision: 0, moveXspeed: 0, moveYspeed: 0, direction: "up", jumpFromWhere: 0, jumpAgain: 1 };
        return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, values), draw(values)), move(values)), setMove(values)), checkCollision(values)), rigidCollision(values)), moveObjectUpDown(values)), jump(values)), setValue(values)), { returnValues: function (rvalues) {
                if (rvalues === void 0) { rvalues = values; }
                return rvalues;
            } });
    };
    function updateAll() {
        canvasCtx.fillStyle = 'green';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
        kocky.forEach(function (obj) { return obj.setValue('collision', false); });
        kocky.forEach(function (obj) { if (obj.type == 'mob')
            obj.setMove(0, gravity, 3.5, 3.5); });
        kocky.forEach(function (obj) { return obj.move(0.2, 0.2); });
        kocky[2].moveObjectUpDown(40, 1, 120);
        for (var x in kocky)
            for (var y in kocky)
                if (x != y && kocky[x].checkCollision(kocky[y].returnValues())) {
                    if (kocky[x].returnValues().type == 'mob')
                        kocky[x].rigidCollision(kocky[y].returnValues());
                }
        kocky.forEach(function (obj) { return obj.draw(); });
    }
    function moveObject() {
        if (pressedKeys[87] > 0)
            kocky[selectedObject].setMove(0, -0.5, 6, 3.5);
        if (pressedKeys[83] > 0)
            kocky[selectedObject].setMove(0, 0.5, 6, 3.5);
        if (pressedKeys[65] > 0)
            kocky[selectedObject].setMove(-0.5, 0, 3.5, 3.5);
        if (pressedKeys[68] > 0)
            kocky[selectedObject].setMove(0.5, 0, 3.5, 3.5);
        kocky[selectedObject].jump(pressedKeys[81], 40, 6);
        if (pressedKeys[107] > 0)
            selectedObject++;
        if (pressedKeys[109] > 0)
            selectedObject--;
        selectedObject = Math.max(0, Math.min(selectedObject, kocky.length - 1));
        if (pressedKeys[13] > 0)
            if (mainInterval != 0) {
                clearInterval(mainInterval);
                mainInterval = 0;
                console.log('off');
            }
            else {
                console.log('on');
                mainInterval = setInterval(updateAll, 1000 / fps);
            }
    }
    function setValue(kocka) {
        return {
            setValue: function (value, setCol) {
                kocka[value] = setCol;
            }
        };
    }
    function moveObjectUpDown(kocka) {
        return {
            moveObjectUpDown: function (height, speed, fromWhereY) {
                if (kocka.y < fromWhereY && kocka.direction == 'up')
                    kocka.direction = 'down';
                if (kocka.y > fromWhereY + height && kocka.direction == 'down')
                    kocka.direction = 'up';
                if (kocka.direction == 'up')
                    kocka.moveYspeed = -speed;
                if (kocka.direction == 'down')
                    kocka.moveYspeed = speed;
            }
        };
    }
    function jump(kocka) {
        return {
            jump: function (jumpContinue, height, speed) {
                //if(jumpContinue>0){		
                if (kocka.collision)
                    kocka.jumpAgain = true;
                if (jumpContinue > 0 && kocka.jumpAgain && kocka.jumpFromWhere == 0) {
                    kocka.jumpFromWhere = kocka.y + kocka.height;
                    kocka.jumpAgain = false;
                }
                if (!kocka.jumpAgain && jumpContinue > 0 && kocka.y + kocka.height > kocka.jumpFromWhere - height && kocka.jumpFromWhere != 0)
                    kocka.moveYspeed = -speed;
                else
                    kocka.jumpFromWhere = 0;
                //}
            }
        };
    }
    function checkCollision(kocka) {
        return {
            checkCollision: function (_a) {
                var x2 = _a.x, y2 = _a.y, width2 = _a.width, height2 = _a.height;
                if ((kocka.x < x2 + width2) && (kocka.x + kocka.width > x2) &&
                    (kocka.y < y2 + height2) && (kocka.y + kocka.height > y2))
                    kocka.collision = true;
                return kocka.collision;
            }
        };
    }
    function rigidCollision(kocka) {
        return {
            rigidCollision: function (_a) {
                var x = _a.x, y = _a.y, width = _a.width, height = _a.height, moveXspeed = _a.moveXspeed, moveYspeed = _a.moveYspeed;
                if (kocka.x + kocka.width > x && kocka.x + kocka.width < x + kocka.moveXspeed + moveXspeed + 1) {
                    kocka.x = x - kocka.width;
                    kocka.moveXspeed = 0;
                }
                if (kocka.x < x + width && kocka.x > x + width + kocka.moveXspeed - moveXspeed - 1) {
                    kocka.x = x + width;
                    kocka.moveXspeed = 0;
                }
                if (moveYspeed == 0) {
                    if (kocka.y + kocka.height > y && kocka.y + kocka.height < y + kocka.moveYspeed - moveYspeed + 1) {
                        kocka.y = y - kocka.height;
                        kocka.moveYspeed = 0;
                    }
                    if (kocka.y < y + height && kocka.y > y + height + kocka.moveYspeed + moveYspeed - 1) {
                        kocka.y = y + height;
                        kocka.moveYspeed = 0;
                    }
                }
                if (moveYspeed < 0) {
                    if (kocka.y + kocka.height > y && kocka.y + kocka.height < y + kocka.moveYspeed - moveYspeed + 1) {
                        kocka.y = y - kocka.height;
                        kocka.moveYspeed = 0;
                    }
                    if (kocka.y < y + height && kocka.y > y + height + kocka.moveYspeed + moveYspeed - 1) {
                        kocka.y = y + height;
                        kocka.moveYspeed = 0;
                    }
                }
                if (moveYspeed > 0) {
                    if (kocka.y + kocka.height > y && kocka.y + kocka.height < y + kocka.moveYspeed + moveYspeed + 1) {
                        kocka.y = y - kocka.height;
                        kocka.moveYspeed = 0;
                    }
                    if (kocka.y < y + height && kocka.y > y + height + kocka.moveYspeed - moveYspeed - 1) {
                        kocka.y = y + height;
                        kocka.moveYspeed = 0;
                    }
                }
            }
        };
    }
    function draw(kocka) {
        return {
            draw: function () {
                if (kocka.collision)
                    kocka.color = 'blue';
                else
                    kocka.color = 'red';
                canvasCtx.fillStyle = kocka.color;
                canvasCtx.fillRect(Math.round(kocka.x), Math.round(kocka.y), kocka.width, kocka.height);
            }
        };
    }
    function setMove(kocka) {
        return {
            setMove: function (moveXspeed, moveYspeed, maxXspeed, maxYspeed) {
                kocka.moveYspeed += moveYspeed;
                kocka.moveYspeed = Math.min(maxYspeed, Math.max(-maxYspeed, kocka.moveYspeed));
                kocka.moveXspeed += moveXspeed;
                kocka.moveXspeed = Math.min(maxXspeed, Math.max(-maxXspeed, kocka.moveXspeed));
            }
        };
    }
    function move(kocka) {
        return {
            move: function (moveResistanceX, moveResistanceY) {
                kocka.y += kocka.moveYspeed;
                kocka.x += kocka.moveXspeed;
                //kocka.y = Math.round(kocka.y)
                //kocka.x = Math.round(kocka.x)
                if (kocka.moveYspeed < 0) {
                    kocka.moveYspeed += moveResistanceY;
                    kocka.moveYspeed = Math.min(0, kocka.moveYspeed);
                }
                if (kocka.moveYspeed > 0) {
                    kocka.moveYspeed -= moveResistanceY;
                    kocka.moveYspeed = Math.max(0, kocka.moveYspeed);
                }
                if (kocka.moveXspeed < 0) {
                    kocka.moveXspeed += moveResistanceY;
                    kocka.moveXspeed = Math.min(0, kocka.moveXspeed);
                }
                if (kocka.moveXspeed > 0) {
                    kocka.moveXspeed -= moveResistanceX;
                    kocka.moveXspeed = Math.max(0, kocka.moveXspeed);
                }
            }
        };
    }
}
abysaglobalneneabili();
//# sourceMappingURL=tryphyseng.js.map