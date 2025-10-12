import Database from 'better-sqlite3';
import { Transaction } from './types/transaction';

const db = new Database('fluxo-caixa.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT,
    descricao TEXT,
    tipo TEXT,
    valor REAL,
    status TEXT
  )
`).run();

export function getTransactions() {
  return db.prepare('SELECT * FROM transactions').all();
}

export function addTransaction(transaction: Transaction) {
  db.prepare(`
    INSERT INTO transactions (data, descricao, tipo, valor, status)
    VALUES (@data, @descricao, @tipo, @valor, @status)
  `).run(transaction);
}
