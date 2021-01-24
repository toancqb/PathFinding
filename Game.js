
class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.def = new Define();
        this.utils = new Utils(this.canvas, this.context, this.def);
        this.tab = this.init_tab(this.tab, 0);
    }

    init() {
        this.utils.drawBoard(this.tab);
        
        this.source = [this.def.numSQ_H - 10, 5];
        this.end = [this.def.numSQ_H - 10,20];

        this.tab[this.source[0]][this.source[1]] = 4;
        this.tab[this.end[0]][this.end[1]] = 3;

        //this.neighbors = [[-1,0], [0, 1], [1, 0], [0, -1]];
        this.neighbors = [[-1,0], [0, 1], [1, 0], [0, -1], [1, 1], [1, -1], [-1, 1], [-1,-1]];
        
        for (var x = 2; x < this.def.numSQ_H; x++) {
            this.tab[x][9] = 5;
        }

        for (var x = 0; x < this.def.numSQ_H/2; x++) {
            this.tab[x][13] = 5;
        }

        /*console.log(this.def.numSQ_H, this.def.numSQ_W);
        console.log(this.utils.get_index(1, 9));
        console.log(this.utils.get_node(59))*/

        // this.init_breadth_search();
        // this.init_depth_search();
        this.init_dijkstra();
    }

    update() {
        // 
        // this.update_breadth_search();
        // this.update_depth_search();
        this.update_dijkstra();
        this.utils.drawBoard(this.tab);
    }

    init_breadth_search() {
        this.visited = this.init_tab(this.visited, false);
        this.Queue = [];
        this.Queue.push([this.source[0], this.source[1]]);
    }

    update_breadth_search() {
        if (this.Queue.length == 0) {
            stop = true;
            return;
        }
        var node = this.Queue.shift();
        var x = node[0], y = node[1], cx, cy;
        if (this.tab[x][y] == 3) {
            stop = true;
            return;
        }
        
        if (!this.visited[x][y]) {
            if (this.tab[x][y] != 4 && this.tab[x][y] != 3)
                this.tab[x][y] = 1;
            this.visited[x][y] = true;
            
            for (var i = 0; i < this.neighbors.length; i++) {
                cx = x + this.neighbors[i][0];
                cy = y + this.neighbors[i][1];
                if (this.utils.check(this.tab, cx, cy) && !this.visited[cx][cy]) {
                    if (this.tab[cx][cy] != 3)
                        this.tab[cx][cy] = 2;
                    this.Queue.push([cx,cy]);
                }
            }
        }
    }

    init_depth_search() {
        this.visited = this.init_tab(this.visited, false);
        this.Stack = [];
        this.Stack.push([this.source[0], this.source[1]]);
    }

    update_depth_search() {
        if (this.Stack.length == 0) {
            stop = true;
            return;
        }
        var node = this.Stack.pop();
        var x = node[0], y = node[1], cx, cy;

        if (this.tab[x][y] == 3) {
            stop = true;
            return;
        }
        
        if (!this.visited[x][y]) {
            
            if (this.tab[x][y] != 4 && this.tab[x][y] != 3)
                this.tab[x][y] = 1;
             
            this.visited[x][y] = true;

            for (var i = 0; i < this.neighbors.length; i++) {
                cx = x + this.neighbors[i][0];
                cy = y + this.neighbors[i][1];
                if (this.utils.check(this.tab, cx, cy) && !this.visited[cx][cy]) {
                    if (this.tab[cx][cy] != 3)
                        this.tab[cx][cy] = 2;
                    this.Stack.push([cx,cy]);
                }
            }
        }
    }

    init_dijkstra() {
        this.nodes = this.init_tab(this.node, false);
        this.distances = this.init_tab(this.distances, this.def.INF);
        this.distances[this.source[0]][this.source[1]] = 0;
        this.prev = {};
        this.prev[this.utils.get_index(this.source[0], this.source[1])] = 0;
        this.shortest_path = [];
        this.stop_searching = false;
        this.current_node = this.utils.get_index(this.end[0], this.end[1]);
        this.len = 0;
    }

    is_finished() {
        for (var x = 0; x < this.nodes.length; x++) {
            for (var y = 0; y < this.nodes[x].length; y++) {
                if (!this.nodes[x][y])
                    return false;
            }
        }
        this.stop_searching = true;
        return true;
    }

    get_closest_node() {
        var node = [];
        var distance_min = this.def.INF - 1;
        for (var i = 0; i < this.nodes.length; i++) {
            for (var j = 0; j < this.nodes[i].length; j++) {
                if (!this.nodes[i][j] && this.distances[i][j] <= distance_min) {
                    node = [i, j];
                    distance_min = this.distances[i][j];
                    console.log(node, this.distances[i][j]);
                }
            }
        }
        if (node.length != 0)
            this.nodes[node[0]][node[1]] = true;
        return node;
    }

    update_dijkstra() {
        if (this.stop_searching) {
            if (this.current_node == this.utils.get_index(this.source[0], this.source[1])) {
                stop = true;
                console.log(this.len);
                return;
            }
            this.len++;
            this.current_node = this.prev[this.current_node];
            var node = this.utils.get_node(this.current_node);
            if (this.tab[node[0]][node[1]] != 4)
                this.tab[node[0]][node[1]] = 6;
            return;
        }

        if (this.is_finished()) {
            this.stop_searching = true;
        }

        var node = this.get_closest_node();

        if (node.length == 0)
            return;

        var x = node[0], y = node[1], cx, cy;

        if (x == this.end[0] && y == this.end[1]) {
            this.stop_searching = true;
            return;
        }
        if (this.tab[x][y] != 4)
            this.tab[x][y] = 1;

        for (var i = 0; i < this.neighbors.length; i++) {
            cx = x + this.neighbors[i][0];
            cy = y + this.neighbors[i][1];
            console.log(cx, cy);
            if (this.utils.check(this.tab, cx, cy) && this.tab[cx][cy] != 1 && this.utils.check(this.tab, cx, cy)) {
                if (this.tab[cx][cy] != 3 && this.tab[cx][cy] != 4)
                    this.tab[cx][cy] = 2;
                if (this.distances[cx][cy] > this.distances[x][y] + 1) {
                    this.distances[cx][cy] = this.distances[x][y] + 1;
                    this.prev[this.utils.get_index(cx, cy)] = this.utils.get_index(x, y);
                    console.log(this.distances[cx][cy]);
                }                
            }
        }
    }



    init_tab(tab, value) {
        tab = [];

        for (var x = 0; x < this.def.numSQ_H; x++) {
            tab[x] = [];
            for(var y = 0; y < this.def.numSQ_W; y++) {
                tab[x][y] = value;
            }
        }
        
        return tab;
    }    
}