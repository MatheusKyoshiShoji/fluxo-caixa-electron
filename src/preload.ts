// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
import { Transaction } from './types/transaction';

contextBridge.exposeInMainWorld('api', {
  getTransactions: () => ipcRenderer.invoke('get-transactions'),
  addTransaction: (transaction: Transaction) => ipcRenderer.invoke('add-transaction', transaction),
});