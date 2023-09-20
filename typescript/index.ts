import assert from "assert";

namespace NSLinkedList {
    export class Node {
        value: number;
        next: Node | null = null;

        constructor(value: number) {
            this.value = value;
        }
    }

    export class LinkedList {
        private initial: Node | null = null;
        private size: number = 0;

        private getNode(index: number) {
            const _index = index < 0 ? this.size + index : index;
            let node = this.initial;
            for (let i = 0; i < _index; i++) {
                if (node !== null) {
                    node = node.next;
                } else {
                    break;
                }
            }
            if (node !== null && !(_index < 0)) {
                return node;
            }
            throw new RangeError();
        }

        get(index: number) {
            const node = this.getNode(index);
            return node.value;
        }

        add(value: number): void {
            const newNode = new Node(value);
            if (this.size === 0) {
                this.initial = newNode;
            } else {
                let lastNode = this.initial as Node;
                while (lastNode.next !== null) {
                    lastNode = lastNode.next;
                }
                lastNode.next = newNode;
            }
            this.size++;
        }

        remove(value: number) {
            if (this.size === 0) {
                throw new Error();
            }
            if (this.initial !== null) {
                if (this.initial.value === value) {
                    let aux = this.initial.next;
                    this.initial.next = null;
                    this.initial = aux;
                    this.size--;
                    return true;
                } else {
                    let previousNode = this.initial;
                    let currentNode = previousNode.next;
                    while (currentNode !== null) {
                        if (currentNode.value === value) {
                            previousNode.next = currentNode.next;
                            currentNode.next = null;
                            this.size--;
                            return true;
                        }
                        previousNode = currentNode;
                        currentNode = currentNode.next;
                    }
                    return false;
                }
            }
        }

        get length(): number {
            return this.size;
        }
    }
}

namespace NSQueue {
    export class Queue {
        queue = new NSLinkedList.LinkedList();

        add(value: number) {
            this.queue.add(value);
        }

        pop() {
            const value = this.queue.get(0);
            if (this.queue.remove(value)) {
                return value;
            }
        }

        get length(): number {
            return this.queue.length;
        }
    }
}

const queue = new NSQueue.Queue();

assert.throws(() => queue.pop(), Error);

queue.add(10);
queue.add(20);
queue.add(30);

assert.equal(queue.length, 3);

assert.equal(queue.pop(), 10);
assert.equal(queue.length, 2);

assert.equal(queue.pop(), 20);
assert.equal(queue.length, 1);

assert.equal(queue.pop(), 30);
assert.equal(queue.length, 0);
