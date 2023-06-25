public class TransferFixed {
    private static final Object tieLock = new Object();

    private void transfer(Account fromAccount, Account toAccount, int amount) throws Exception {
        if (fromAccount.getBalance() < amount) {
            throw new Exception();
        } else {
            fromAccount.debit(amount);
            toAccount.credit(amount);
        }
    }


    public void transferMoney(Account fromAccount, Account toAccount, int amount) throws Exception {
        int fromHash = System.identityHashCode(fromAccount);
        int toHash = System.identityHashCode(toAccount);

        if (fromHash < toHash) {
            synchronized (fromAccount) {
                synchronized (toAccount) {
                    transfer(fromAccount, toAccount, amount);
                }
            }
        } else if (fromHash > toHash) {
            synchronized (toAccount) {
                synchronized (fromAccount) {
                    transfer(fromAccount, toAccount, amount);
                }
            }
        } else {
            synchronized (tieLock) {
                synchronized (fromAccount) {
                    synchronized (toAccount) {
                        transfer(fromAccount, toAccount, amount);
                    }
                }
            }
        }
    }
}


