import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('shreeanna.db');

export const initDatabase = () => {
    db.execSync(`
    CREATE TABLE IF NOT EXISTS batches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      batch_id TEXT,
      commodity_code TEXT,
      grade TEXT,
      qty_kg REAL,
      moisture_pct REAL,
      foreign_matter_pct REAL,
      harvest_date TEXT,
      sample_image TEXT,
      field_image TEXT,
      geo_lat REAL,
      geo_long REAL,
      status TEXT DEFAULT 'draft',
      synced INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS offline_queue (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT,
      method TEXT,
      body TEXT,
      headers TEXT,
      created_at TEXT
    );
  `);
};

export const saveBatchLocal = (batch: any) => {
    const { commodity_code, grade, qty_kg, moisture_pct, foreign_matter_pct, harvest_date, sample_image, field_image, geo_lat, geo_long } = batch;
    db.runSync(
        `INSERT INTO batches (commodity_code, grade, qty_kg, moisture_pct, foreign_matter_pct, harvest_date, sample_image, field_image, geo_lat, geo_long, status, synced)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft', 0)`,
        [commodity_code, grade, qty_kg, moisture_pct, foreign_matter_pct, harvest_date, sample_image, field_image, geo_lat, geo_long]
    );
};

export const getLocalBatches = () => {
    return db.getAllSync('SELECT * FROM batches ORDER BY id DESC');
};

export interface QueueItem {
    id: number;
    url: string;
    method: string;
    body: string;
    headers: string;
    created_at: string;
}

export const addToQueue = (url: string, method: string, body: any, headers: any = {}) => {
    db.runSync(
        `INSERT INTO offline_queue (url, method, body, headers, created_at) VALUES (?, ?, ?, ?, ?)`,
        [url, method, JSON.stringify(body), JSON.stringify(headers), new Date().toISOString()]
    );
};

export const getQueue = (): QueueItem[] => {
    return db.getAllSync('SELECT * FROM offline_queue ORDER BY id ASC') as QueueItem[];
};

export const removeFromQueue = (id: number) => {
    db.runSync('DELETE FROM offline_queue WHERE id = ?', [id]);
};

export const updateBatchStatus = (localId: number, batchId: string, status: string) => {
    db.runSync('UPDATE batches SET batch_id = ?, status = ?, synced = 1 WHERE id = ?', [batchId, status, localId]);
};

export default db;
