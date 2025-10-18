import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { ipcMain } from 'electron';
import { getTransactions, addTransaction, removeTransaction, updateTransaction } from './db';
import { Transaction } from './types/transaction';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

ipcMain.handle('get-transactions', () => getTransactions());
ipcMain.handle('add-transaction', (event, transaction: Transaction) => addTransaction(transaction));
ipcMain.handle('remove-transaction', (event, id: number) => removeTransaction(id));
ipcMain.handle('update-transaction', (event, id: number, updatedFields: Partial<Transaction>) => updateTransaction(id, updatedFields));

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

