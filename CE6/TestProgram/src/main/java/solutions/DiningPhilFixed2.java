package solutions;

import java.util.Random;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

public class DiningPhilFixed2 {
    private static int N = 5;

    public static void main(String[] args) throws Exception {
        PhilosopherFixed2[] phils = new PhilosopherFixed2[N];
        MyFork2[] forks = new MyFork2[N];

        for (int i = 0; i < N; i++) {
            forks[i] = new MyFork2(i);
        }

        for (int i = 0; i < N; i++) {
            phils[i] = new PhilosopherFixed2(i, forks[i], forks[(i + N - 1) % N]);
            phils[i].start();
        }
    }
}

class PhilosopherFixed2 extends Thread {
    private final int index;
    private final MyFork2 left;
    private final MyFork2 right;

    public PhilosopherFixed2(int index, MyFork2 left, MyFork2 right) {
        this.index = index;
        this.left = left;
        this.right = right;
    }

    public void run() {
        Random randomGenerator = new Random();
        try {
            while (true) {
                Thread.sleep(randomGenerator.nextInt(100)); //not sleeping but thinking
                System.out.println("Phil " + index + " finishes thinking.");
                if (!left.pickup()) {
                    break;
                }

                System.out.println("Phil " + index + " picks up left fork.");

                if (!right.pickup()) {
                    left.putdown();
                    break;
                }

                System.out.println("Phil " + index + " picks up right fork.");
                Thread.sleep(randomGenerator.nextInt(100)); //eating
                System.out.println("Phil " + index + " finishes eating.");
                left.putdown();
                System.out.println("Phil " + index + " puts down left fork.");
                right.putdown();
                System.out.println("Phil " + index + " puts down right fork.");
            }
        } catch (InterruptedException e) {
            System.out.println("Don't disturb me while I am sleeping, well, thinking.");
        }
    }
}

class MyFork2 {
    private final int index;
    private boolean isAvailable = true;
    private final ReentrantLock reentrantLock = new ReentrantLock();
    Random r = new Random();

    public MyFork2(int index) {
        this.index = index;
    }

    public boolean pickup() throws InterruptedException {
        return reentrantLock.tryLock(r.nextInt(1000), TimeUnit.MILLISECONDS);
    }

    public void putdown() throws InterruptedException {
        reentrantLock.unlock();
    }
}


// In the fixed version of DiningPhilFixed2.java, the following changes were made to address the deadlock issue:

// Introduction of ReentrantLock: The MyFork2 class now uses a ReentrantLock to provide explicit locking for the forks. 
// Each fork has its own lock. By using a ReentrantLock, we ensure that only one philosopher can hold a fork at a time.

// pickup() method with timeout: The pickup() method in the MyFork2 class now uses tryLock() with a timeout. 
// This means that a philosopher will try to acquire a lock on the fork but will not wait indefinitely if the lock is unavailable. 
// Instead, it will try for a specified amount of time (randomly chosen between 0 and 1000 milliseconds) and return immediately if it fails to acquire the lock. 
// This prevents the deadlock situation where all philosophers are waiting indefinitely for a fork.

// Break condition in the run() method: Inside the PhilosopherFixed2 class, a break condition is added when a philosopher fails to acquire the left fork. 
// If a philosopher cannot acquire the left fork, it releases any fork it has acquired and breaks out of the infinite loop. 
// This ensures that no philosopher holds a fork indefinitely, avoiding the possibility of deadlock.

// By introducing explicit locking with ReentrantLock and using timeouts for acquiring locks, we eliminate the possibility of deadlock in the dining philosophers problem. 
// The changes allow the philosophers to release forks if they cannot acquire both forks and prevent all philosophers from being blocked indefinitely, thus resolving the deadlock issue.