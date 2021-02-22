class Queue {
    elements;
    constructor() {
        this.elements = [];
    }

    enqueue(e) {
        this.elements.push(e);
    };

    dequeue() {
        return this.elements.shift();
    };

    isEmpty() {
        return this.elements.length == 0;
    };

    peek() {
        return !this.isEmpty() ? this.elements[0] : null;
    };

    length() {
        return this.elements.length;
    }
}

class Stack {
    elements;
    constructor() {
        this.elements = [];
    }

    push(element) {
        this.elements.push(element);
    }

    pop() {
        if (this.isEmpty() === false) {
            return this.elements.pop();
        }
    }

    isEmpty() {
        return this.length() == 0;
    }

    peek() {
        return this.elements[this.elements.length - 1];
    }

    length() {
        return this.elements.length;
    }
}

class Graph {
    rootNodes = [];
    adjList = new Map();
    numberOfNodesList = new Map();
    numberOfNodes = 0;

    initializeGraph(nodes) {
        this.rootNodes = [];
        this.adjList = new Map();

        for (let node of nodes) {
            let [parent, child] = node[0].split(' ');

            this.addVertex(parent);
            this.addVertex(child);
            this.addEdge(parent, child);

            if (!this.rootNodes.includes(parent) && !this.isChild(parent)) {
                this.rootNodes.push(parent);
            }
            for (let child of this.adjList.get(parent)) {
                if (this.rootNodes.includes(child)) {
                    let index = this.rootNodes.indexOf(child);
                    if (index > -1) {
                        this.rootNodes.splice(index, 1);
                    }
                }
            }
        }

        console.log(this.rootNodes); // [ '1', '7' ]
    }

    isChild(vertex) {
        for (let key of this.adjList.keys()) {
            for (let value of this.adjList.get(key)) {
                if (value === vertex) {
                    return true;
                }
            }
        }
        return false;
    }

    addVertex(v) {
        if (!this.adjList.get(v)) {
            this.adjList.set(v, []);
        }
    }

    addEdge(v, w) {
        this.adjList.get(v).push(w);
    }

    bfsIterative() {
        for (let rootNode of this.rootNodes) {
            this.numberOfNodes = 0
            let visited = {};
            let q = new Queue();
            visited[rootNode] = true;
            q.enqueue(rootNode);

            while (!q.isEmpty()) {
                let currentVertex = q.dequeue();
                console.log(currentVertex);
                this.numberOfNodes++;
                let vertices = this.adjList.get(currentVertex);
                for (let i in vertices) {
                    let neighbour = vertices[i];
                    if (!visited[neighbour]) {
                        visited[neighbour] = true;
                        q.enqueue(neighbour);
                    }
                }
            }
            this.numberOfNodesList.set(rootNode, this.numberOfNodes);
        }
    }

    dfsIterative() {
        for (let rootNode of this.rootNodes) {
            this.numberOfNodes = 0
            let visited = {};
            let stack = new Stack();
            visited[rootNode] = true;
            stack.push(rootNode);
            let currentVertex;

            while (!stack.isEmpty()) {
                currentVertex = stack.pop();
                console.log(currentVertex);
                this.numberOfNodes++;
                this.adjList.get(currentVertex).forEach(neighbor => {
                    if (!visited[neighbor]) {
                        visited[neighbor] = true;
                        stack.push(neighbor);
                    }
                });
            }
            this.numberOfNodesList.set(rootNode, this.numberOfNodes);
        }
    }

    dfsRecursive() {
        for (let rootNode of this.rootNodes) {
            this.numberOfNodes = 0;
            let visited = {};
            this.dfsUtil(rootNode, visited);
            this.numberOfNodesList.set(rootNode, this.numberOfNodes);
        }
    }

    dfsUtil(vert, visited) {
        visited[vert] = true;
        console.log(vert);
        this.numberOfNodes++;
        let get_neighbours = this.adjList.get(vert);
        for (let i in get_neighbours) {
            let get_elem = get_neighbours[i];
            if (!visited[get_elem])
                this.dfsUtil(get_elem, visited);
        }
    }
}

let g = new Graph();
g.initializeGraph([['1 3'], ['1 4'], ['3 5'], ['4 6'], ['7 9']])
//g.initializeGraph([['7 2'], ['3 7'], ['6 5'], ['7 4']])

console.log("BFS Iterative");
g.bfsIterative(); // 1 3 4 5 6 7 9
console.log(g.numberOfNodesList) // Map(2) { '1' => 5, '7' => 2 }

console.log("DFS Iterative");
g.dfsIterative(); // 1 4 6 3 5 7 9
console.log(g.numberOfNodesList) // Map(2) { '1' => 5, '7' => 2 }

console.log("DFS Recursive");
g.dfsRecursive('3'); // 1 3 5 4 6 7 9
console.log(g.numberOfNodesList) // Map(2) { '1' => 5, '7' => 2 }