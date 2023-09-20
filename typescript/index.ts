import assert from "assert";

class Node {
    value: number;
    next: Node | null = null;

    constructor(value: number) {
        this.value = value;
    }
}

class Queue {
    private first: Node | null = null;
    private last: Node | null = null;
    private size: number = 0;

    push(value: number) {
        const newNode = new Node(value);
        if (this.size === 0) {
            this.first = newNode;
            this.last = newNode;
        } else {
            (this.last as Node).next = newNode;
            this.last = newNode;
        }
        this.size++;
    }

    pop() {
        if (this.size > 0) {
            const first = this.first as Node;
            this.first = (this.first as Node).next;
            first.next = null;
            this.size--;
            return first.value;
        }
        throw new RangeError();
    }

    peek() {
        return this.first?.value;
    }

    get length(): number {
        return this.size;
    }
}

const queue = new Queue();

assert.throws(() => queue.pop(), RangeError);

queue.push(10);
queue.push(20);
queue.push(30);

assert.equal(queue.peek(), 10);

assert.equal(queue.length, 3);

assert.equal(queue.pop(), 10);
assert.equal(queue.length, 2);

assert.equal(queue.pop(), 20);
assert.equal(queue.length, 1);

assert.equal(queue.pop(), 30);
assert.equal(queue.length, 0);
