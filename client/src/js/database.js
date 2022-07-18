import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("senting the data");
  const dataDb = await openDB('data', 1);
  const text = dataDb.transaction('data', 'readwrite');
  const store = text.objectStore('data');
  const request = store.put({ d: 1 , value: content });
  const result = await request;
  console.log("data has been sent", result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("getting data");
  const dataDb = await openDB('data', 1);
  const text = dataDb.transaction('data', 'readonly');
  const store = text.objectStore('data');
  const request = store.getAll();
  const result = await request;
  console.log(result);
  result
  ? console.log("data has been found")
  : console.log("data has not been found");
  return result?.value
}

initdb();
