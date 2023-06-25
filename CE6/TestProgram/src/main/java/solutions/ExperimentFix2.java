package solutions;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ExperimentFix2 {
    private static int MY_INT = 0;
    private static final Lock lock = new ReentrantLock();

    public static void main(String[] args) throws InterruptedException {
        new ChangeListener().start();
        System.out.println("Waiting two seconds so the JIT will probably optimize ChangeListener");
        Thread.sleep(2000);

        new ChangeMaker().start();
    }

    static class ChangeListener extends Thread {
        public void run() {
            int local_value;
            while (true) {
                lock.lock();
                try {
                    local_value = MY_INT;
                    if (local_value < 5) {
                        if (local_value != MY_INT) {
                            System.out.println("Got Change for MY_INT: " + MY_INT);
                            local_value = MY_INT;
                        }
                    } else {
                        break;
                    }
                } finally {
                    lock.unlock();
                }
            }
        }
    }

    static class ChangeMaker extends Thread {
        public void run() {
            int local_value;
            while (true) {
                lock.lock();
                try {
                    local_value = MY_INT;
                    if (local_value < 5) {
                        System.out.println("Incrementing MY_INT to " + (local_value + 1));
                        MY_INT = ++local_value;
                    } else {
                        break;
                    }
                } finally {
                    lock.unlock();
                }

                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

// In this fix, we introduce explicit locking using a ReentrantLock to ensure mutual exclusion between the threads accessing MY_INT. 
// By acquiring the lock before accessing or modifying MY_INT, we prevent race conditions and ensure that only one thread can operate on MY_INT at a time.
