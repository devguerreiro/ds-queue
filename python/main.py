from linked_list import LinkedList


class Queue:
    linked_list: LinkedList = LinkedList()

    def __len__(self):
        return len(self.linked_list)

    def add(self, value: int):
        self.linked_list.add(value)

    def pop(self):
        value = self.linked_list[0]
        if self.linked_list.remove(value):
            return value


if __name__ == "__main__":
    queue = Queue()

    try:
        queue.pop()
        raise AssertionError()
    except IndexError as e:
        assert isinstance(e, IndexError)

    queue.add(10)
    queue.add(20)
    queue.add(30)

    assert len(queue) == 3

    assert queue.pop() == 10
    assert len(queue) == 2

    assert queue.pop() == 20
    assert len(queue) == 1

    assert queue.pop() == 30
    assert len(queue) == 0
