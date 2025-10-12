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

export function removeTransaction(id: number) {
  db.prepare('DELETE FROM transactions WHERE id = ?').run(id);
}

export function updateTransaction(id: number, updatedFields: Partial<Transaction>) {
  const fields = Object.keys(updatedFields).map(key => `${key} = @${key}`).join(', ');
  const stmt = db.prepare(`UPDATE transactions SET ${fields} WHERE id = @id`);
  stmt.run({ ...updatedFields, id });
}