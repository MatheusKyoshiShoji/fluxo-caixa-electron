import { Transaction } from '../types/transaction';

export {};

declare global {
    interface Window {
        api: {
            getTransactions: () => Promise<Transaction[]>;
            addTransaction: (transaction: Transaction) => Promise<void>;
        }
    }
}