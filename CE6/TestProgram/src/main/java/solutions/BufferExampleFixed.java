package solutions;
import java.util.Random;

public class BufferExampleFixed {
    public static void main(String[] args) throws Exception {
        Buffer buffer = new Buffer(10);
        MyProducer prod = new MyProducer(buffer);
        prod.start();
        MyConsumer cons = new MyConsumer(buffer);
        cons.start();
    }
}

class MyProducer extends Thread {
    private Buffer buffer;

    public MyProducer(Buffer buffer) {
        this.buffer = buffer;
    }

    public void run() {
        Random random = new Random();
        try {
            Thread.sleep(random.nextInt(1000));
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        buffer.addItem(new Object());
    }
}

class MyConsumer extends Thread {
    private Buffer buffer;

    public MyConsumer(Buffer buffer) {
        this.buffer = buffer;
    }

    public void run() {
        Random random = new Random();
        try {
            Thread.sleep(random.nextInt(1000));
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        buffer.removeItem();
    }
}

class Buffer {
    private int SIZE;
    private Object[] objects;
    private int count = 0;

    public Buffer(int size) {
        SIZE = size;
        objects = new Object[SIZE];
    }

    public synchronized void addItem(Object object) {
        while (count >= SIZE) {
            try {
                // Buffer is full, wait for a consumer to remove an item
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        objects[count] = object;
        count++;
        notify(); // Notify the waiting consumer that an item is added
    }

    public synchronized Object removeItem() {
        while (count <= 0) {
            try {
                // Buffer is empty, wait for a producer to add an item
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        count--;
        Object removedItem = objects[count];
        objects[count] = null;
        notify(); // Notify the waiting producer that an item is removed
        return removedItem;
    }
}

// Before the fix, the potential order of execution could lead to race conditions and incorrect behavior. With the fixed code, the potential order of execution is as follows:

// The main thread starts the producer and consumer threads concurrently.
// The producer thread pauses for a random amount of time.
// The consumer thread pauses for a random amount of time.
// The producer thread wakes up, generates a new item, and tries to add it to the buffer.
// If the buffer is full, the producer thread waits until the consumer removes an item.
// The consumer thread wakes up, tries to remove an item from the buffer.
// If the buffer is empty, the consumer thread waits until the producer adds an item.
// The consumer removes an item from the buffer.
// The producer adds an item to the buffer.
// Steps 4-9 may repeat multiple times until the threads complete their execution.
// By introducing synchronization using synchronized methods and wait() and notify() calls, the producer and consumer threads can safely access the buffer, and the buffer's size is maintained correctly.