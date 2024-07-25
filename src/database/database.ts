import SQLite from 'react-native-sqlite-storage';
import { Job } from '../types';

const db = SQLite.openDatabase({ name: 'JobBookmarks.db', location: 'default' });

export const initDatabase = (): void => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS bookmarks (id INTEGER PRIMARY KEY AUTOINCREMENT, jobId TEXT, title TEXT, location TEXT, salary TEXT, phone TEXT)',
      []
    );
  });
};

export const addBookmark = (job: Job): Promise<SQLite.ResultSet> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO bookmarks (jobId, title, location, salary, phone) VALUES (?, ?, ?, ?, ?)',
        [job.id, job.title, job.location, job.salary, job.phone],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const removeBookmark = (jobId: string): Promise<SQLite.ResultSet> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM bookmarks WHERE jobId = ?',
        [jobId],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const getBookmarks = (): Promise<Job[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM bookmarks',
        [],
        (_, { rows }) => resolve(rows.raw() as Job[]),
        (_, error) => reject(error)
      );
    });
  });
};