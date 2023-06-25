package solutions;

import java.util.Random;

class MyFork {
    private final int index;
    private boolean isAvailable = true;

    public MyFork(int index) {
        this.index = index;
    }

    public synchronized void pickup() throws InterruptedException {
        while (!isAvailable) {
            wait();
        }

        isAvailable = false;
        notifyAll();
    }

    public synchronized void putdown() throws InterruptedException {
        while (isAvailable) {
            wait();
        }

        isAvailable = true;
        notifyAll();
    }

    public String toString() {
        if (isAvailable) {
            return "Fork " + index + " is available.";
        } else {
            return "Fork " + index + " is NOT available.";
        }
    }
}

public class DiningPhilFixed1 {
    private static int N = 5;

    public static void main(String[] args) throws Exception {
        PhilosopherFixed[] phils = new PhilosopherFixed[N];
        MyFork[] forks = new MyFork[N];

        for (int i = 0; i < N; i++) {
            forks[i] = new MyFork(i);
        }

        for (int i = 0; i < N; i++) {
            phils[i] = new PhilosopherFixed(i, forks[i], forks[(i + N - 1) % N]);
            phils[i].start();
        }
    }
}

class PhilosopherFixed extends Thread {
    private final int index;
    private final MyFork left;
    private final MyFork right;

    public PhilosopherFixed(int index, MyFork left, MyFork right) {
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
                //with the following, there is a global ordering on the locking
                if (index == 0) {
                    right.pickup();
                    System.out.println("Phil " + index + " picks up right fork.");
                    left.pickup();
                    System.out.println("Phil " + index + " picks up left fork.");
                } else {
                    left.pickup();
                    System.out.println("Phil " + index + " picks up left fork.");
                    right.pickup();
                    System.out.println("Phil " + index + " picks up right fork.");
                }
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

// The fix in the DiningPhilFixed1 code helps prevent deadlock by introducing a global ordering on the locking of forks. 
// The change is made in the PhilosopherFixed.run() method where the philosophers pick up the forks in a specific order.

// In the original code, the philosophers could potentially pick up the forks in different orders, leading to a potential circular waiting scenario where each philosopher is waiting for the right fork held by their neighbor. 
// This can result in a deadlock situation.

// In the fixed code, a global ordering on the locking is introduced by checking the index of the philosopher. 
// The philosopher with index 0 (the first philosopher) picks up the right fork first and then the left fork. 
// The other philosophers pick up the left fork first and then the right fork. 
// This ensures a consistent and predictable order of acquiring the forks, eliminating the possibility of circular waiting and deadlock.

// By establishing a global ordering, the fixed code guarantees that only one philosopher can have access to both forks simultaneously, preventing deadlock and ensuring progress in the dining philosophers problem.