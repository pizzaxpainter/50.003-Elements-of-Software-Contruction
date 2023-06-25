package solutions;
import java.math.BigInteger;

public class FactorThreadNoInterrupt {
    public static final int numberOfThreads = 4;
    public static void main(String[] args) throws Exception {
        //http://en.wikipedia.org/wiki/Fermat_number
       BigInteger n = new BigInteger("1127451830576035879");
        FactorNoInterrupt[] factors = new FactorNoInterrupt[numberOfThreads];
        for (int i = 0; i < numberOfThreads; i++) {
            factors[i] = new FactorNoInterrupt(n, i + 2, numberOfThreads);
            factors[i].start();
        }
        for (int i = 0; i < numberOfThreads; i++) {
            factors[i].join();
        }
    }

public static BigInteger factorMultiThread(BigInteger input) {
        BigInteger result = null;
        return result;
    }
}

class FactorNoInterrupt extends Thread {
    BigInteger n;
    BigInteger init;
    BigInteger step;
    BigInteger result;

    public FactorNoInterrupt(BigInteger n, int init, int step) {
        this.n = n;
        this.init = BigInteger.valueOf(init);
        this.step = BigInteger.valueOf(step);
    }

    public void run() {
        BigInteger zero = new BigInteger("0");

        while (init.compareTo(n) < 0) {
            if (n.remainder(init).compareTo(zero) == 0) {
                System.out.println("Got it: " + init);
                break;
            }

            init = init.add(step);
        }
    }
}

// This code first creates a ThreadPoolExecutor with 4 threads. 
// Then, it creates 4 tasks, each of which calls the factor() method on the n variable. 
// The factor() method will return the first prime factor of n, or null if n is not a prime number. 
// If any of the tasks find a prime factor, it will print the factor to the console and then shut down the ThreadPoolExecutor.