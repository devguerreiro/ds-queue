from typing import TypeVar

TNode = TypeVar("TNode", bound="Node")


class Node:
    value: int
    next: TNode | None = None

    def __init__(self, value: int):
        self.value = value


class Queue:
    _first: Node | None = None
    _last: Node | None = None
    _size: int = 0

    def push(self, value: int):
        new_node = Node(value)
        if self._size == 0:
            self._first = new_node
            self._last = new_node
        else:
            self._last.next = new_node
            self._last = new_node
        self._size += 1

    def pop(self):
        if self._size > 0:
            first = self._first
            self._first = first.next
            first.next = None
            self._size -= 1
            return first.value
        raise IndexError()

    def peek(self):
        return self._first.value

    def __len__(self):
        return self._size


if __name__ == "__main__":
    queue = Queue()

    try:
        queue.pop()
        raise AssertionError()
    except IndexError as e:
        assert isinstance(e, IndexError)

    queue.push(10)
    queue.push(20)
    queue.push(30)

    assert queue.peek() == 10

    assert len(queue) == 3

    assert queue.pop() == 10
    assert len(queue) == 2

    assert queue.pop() == 20
    assert len(queue) == 1

    assert queue.pop() == 30
    assert len(queue) == 0
