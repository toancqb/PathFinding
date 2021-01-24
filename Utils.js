class Utils {
    constructor(canvas, context, def) {
        this.canvas = canvas;
        this.context = context;
        this.def = def;
    }

    drawLine(x1, y1, x2, y2) {
        this.context.beginPath();
        this.context.strokeStyle = "#bebebe";
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

    drawRect(x, y, size, color) {
        this.context.beginPath();
        this.context.rect(x, y, size, size);
        this.context.fillStyle = color;
        this.context.fill();
    }

    drawRect_control(tab_value, x, y) {
        var cx = x * this.def.SQ;
        var cy = y * this.def.SQ;
        switch(tab_value) {
            case 0: // 
                break;
            case 1: // Visited nodes
                this.drawRect(cy, cx, this.def.SQ, this.def.BLUE);
                break;
            case 2: // Queue nodes
                this.drawRect(cy, cx, this.def.SQ, this.def.GREEN);
                break;
            case 3: // End node
                this.drawRect(cy, cx, this.def.SQ, this.def.RED);
                break;
            case 4: // Init node
                this.drawRect(cy, cx, this.def.SQ, this.def.DBLUE);
                break;
            case 5: // Wall
                this.drawRect(cy, cx, this.def.SQ, this.def.BLACK);
                break;
            case 6: // Wall
                this.drawRect(cy, cx, this.def.SQ, this.def.ORANGE);
                break;
            default:
                break;
        }
    }

    drawBoard(tab) {
        for (var x = 0; x < this.def.numSQ_H; x++) {
            for(var y = 0; y < this.def.numSQ_W; y++) {
                this.drawRect_control(tab[x][y], x, y);
            }
        }
        for (var i = 0; i <= this.def.HEIGHT; i += this.def.SQ) {
            this.drawLine(0,i,this.def.WIDTH, i);            
        }
        for (i = 0; i <= this.def.WIDTH; i += this.def.SQ) {
            this.drawLine(i,0,i,this.def.HEIGHT);
        }
        
    }
    
    check(tab, x, y) {
        if (x >= 0 && x < this.def.numSQ_H && y >= 0 && y < this.def.numSQ_W && tab[x][y] != 5) {
            return true;
        }
        return false;
    }

    get_min(a, b) {
        return (a <= b) ? a : b;
    }

    get_node(n) {
        return [Math.floor(n / this.def.numSQ_W) , n % this.def.numSQ_W];
    }

    get_index(x, y) {
        return x * this.def.numSQ_W + y;
    }
}