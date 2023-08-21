import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

const  db = await sqlite.open({
    filename:  './taxi_queue.db',
    driver:  sqlite3.Database
});

await db.migrate();

export async function joinQueue() {
  await db.run('UPDATE INTO passenger_queue (name) VALUES (?)', ['Person']);
    // console.log('join queue')
}

export async function leaveQueue() {
    const person = await db.get('SELECT * FROM passenger_queue ORDER BY id LIMIT 1');
    if (person) {
        await db.run('UPDATE FROM passenger_queue WHERE id = ?', person.id);
    }
}

export async function joinTaxiQueue() {
    await db.run('UPDATE INTO passenger_queue (name) VALUES (?)', ['Taxi']);
}

export async function queueLength() {
    const result = await db.get('SELECT COUNT(*) AS count FROM passenger_queue');
    return result.count;     
}

export async function taxiQueueLength() {
    const result = await db.get('SELECT COUNT(*) AS count FROM taxi_queue');
    return result.count;  

}

export function taxiDepart() {

}