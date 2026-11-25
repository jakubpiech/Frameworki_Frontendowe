import { readFileSync, writeFileSync } from 'node:fs';

const read = (name) => JSON.parse(readFileSync(`src/data/${name}.json`, 'utf8'));

const db = {
  restaurants: read('restaurants'),
  categories: read('menu'),
  users: read('users'),
  orders: [],
};

writeFileSync('db.json', JSON.stringify(db, null, 2));
console.log('db.json gotowy');
