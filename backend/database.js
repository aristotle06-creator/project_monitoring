import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_DATA } from './initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

class Database {
  constructor() {
    this.ensureDbExists();
  }

  ensureDbExists() {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      if (!fs.existsSync(DB_FILE)) {
        this.write(INITIAL_DATA);
        console.log('📦 Database initialized and seeded at data/db.json');
      }
    } catch (err) {
      console.error('Error initializing database:', err);
    }
  }

  read() {
    try {
      this.ensureDbExists();
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (err) {
      console.error('Error reading database file:', err);
      return INITIAL_DATA;
    }
  }

  write(data) {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error('Error writing to database:', err);
      return false;
    }
  }

  get(collection) {
    const data = this.read();
    return data[collection] || [];
  }

  getById(collection, id) {
    const list = this.get(collection);
    return list.find((item) => item.id === id) || null;
  }

  insert(collection, item) {
    const data = this.read();
    if (!data[collection]) data[collection] = [];
    data[collection].unshift(item);
    
    // Auto log
    if (!data.systemLogs) data.systemLogs = [];
    data.systemLogs.unshift({
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message: `Inserted new record in [${collection}]: ${item.id || item.title || 'entry'}`
    });
    data.systemLogs = data.systemLogs.slice(0, 50);

    this.write(data);
    return item;
  }

  update(collection, id, updates) {
    const data = this.read();
    if (!data[collection]) return null;
    let updatedItem = null;
    data[collection] = data[collection].map((item) => {
      if (item.id === id) {
        updatedItem = { ...item, ...updates };
        return updatedItem;
      }
      return item;
    });

    if (updatedItem) {
      if (!data.systemLogs) data.systemLogs = [];
      data.systemLogs.unshift({
        timestamp: new Date().toISOString(),
        level: 'INFO',
        message: `Updated record in [${collection}] ID: ${id}`
      });
      data.systemLogs = data.systemLogs.slice(0, 50);
      this.write(data);
    }
    return updatedItem;
  }

  delete(collection, id) {
    const data = this.read();
    if (!data[collection]) return false;
    const initialLen = data[collection].length;
    data[collection] = data[collection].filter((item) => item.id !== id);
    const deleted = data[collection].length < initialLen;
    if (deleted) {
      if (!data.systemLogs) data.systemLogs = [];
      data.systemLogs.unshift({
        timestamp: new Date().toISOString(),
        level: 'WARN',
        message: `Deleted record in [${collection}] ID: ${id}`
      });
      data.systemLogs = data.systemLogs.slice(0, 50);
      this.write(data);
    }
    return deleted;
  }

  reset() {
    this.write(INITIAL_DATA);
    console.log('🔄 Database reset to clean initial state');
    return INITIAL_DATA;
  }
}

export const db = new Database();
