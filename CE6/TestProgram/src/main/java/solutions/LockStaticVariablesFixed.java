package solutionsx;
public class LockStaticVariablesFixed {
    public static int saving = 5000;
    public static int cash = 0;

    public static Object savingLock = new Object();
    public static Object cashLock = new Object();

    public static void main(String args[]) {
        int numberofThreads = 10000;
        WD[] threads = new WD[numberofThreads];

        for (int i = 0; i < numberofThreads; i++) {
            threads[i] = new WD();
            threads[i].start();
        }
        try {
            for (int i = 0; i < numberofThreads; i++) {
                threads[i].join();
            }
        } catch (InterruptedException e) {
            System.out.println("Some thread is not finished");
        }

        System.out.println("The result is: " + LockStaticVariablesFixed.cash);
    }
}

class WD extends Thread {
    public void run() {
        synchronized (LockStaticVariablesFixed.savingLock) {
            if (LockStaticVariablesFixed.saving >= 1000) {
                synchronized (LockStaticVariablesFixed.cashLock) {
                    System.out.println("I am doing something.");
                    LockStaticVariablesFixed.saving = LockStaticVariablesFixed.saving - 1000;
                    LockStaticVariablesFixed.cash = LockStaticVariablesFixed.cash + 1000;
                }
            }
        }
    }
}

// In this solution, I introduced two separate locks: savingLock and cashLock. 
// Each lock is used to synchronize access to the respective variables (saving and cash). 
// This ensures that only one thread can modify these variables at a time, preventing race conditions and maintaining the desired property of saving + cash = 5000.

// The savingLock is acquired before checking and updating the saving variable, and the cashLock is acquired before modifying the cash variable. 
// By using separate locks, we ensure that one thread doesn't interfere with the other when performing these operations.

// Also, note that I replaced System.out.print with System.out.println in the main method for consistent output formatting.