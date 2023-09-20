import assert from "assert";

import LinkedList from "./LinkedList";

namespace NSQueue {
    export class Queue {
        queue = new LinkedList();

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
