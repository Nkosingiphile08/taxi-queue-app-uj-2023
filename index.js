import express from "express";

// use the SQL methods in the API routes below
import {joinQueue} from './taxi.sql.js';

const app = express();

app.use(express.static('public'))

// add middleware to make post routes work
app.use(express.json());

const PORT = process.env.PORT || 4015;

// passenger joins the queue
app.post('/api/passenger/join', (req, res) => {
    res.json({
        message : 'join queue'
    })
})

// passenger leaves the queue
app.post('/api/passenger/leave', (req, res) => {
    res.json({
        message : 'leave queue'
    })
});

//taxi leaves the queue
app.post('/api/taxi/join', (req, res) => {
    res.json({
        message : 'leave queue'
    })
});

// 12 people need to be in the queue for the taxi to depart
app.post('/api/taxi/depart', (req, res) => {
    res.json({
        message : 'taxi depart from queue'
    })
});

// return the number of people in the queue
app.get('/api/passenger/queue', (req, res) => {
    //  return test the API call
    res.json({
        queueCount : 7
    })
});

// return the number of taxis in the queue
app.get('/api/taxi/queue', (req, res) => {
    res.json({
        queueCount : 0
    })
});

app.listen(PORT, () => console.log(`Taxi App started on port: ${PORT}`))