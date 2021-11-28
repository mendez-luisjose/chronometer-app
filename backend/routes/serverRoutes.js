//Frameworks
const { Router } = require('express');
const router = Router();

//Schemas and Models from Moongose
const Lap = require("../schemesMongoose/createLap");
const Time = require("../schemesMongoose/createCronometerTime");

//When the client visits, the Mongo database return all the laps storage on the database
router.get("/laps", async (request, response) => {
    const laps = await Lap.find();
    response.json(laps);
})

//When the client visits, insert a new lap to the Mongo database
router.post('/laps', async (request, response) => {
    const { number, label, time } = request.body;
    const newLap = new Lap({number, label, time});
    await newLap.save();
    response.json({'message': 'Lap Saved'});
});

//When the client visits, delete all the laps from the Mongo database
router.delete('/laps', async (request, response) => {
    await Lap.deleteMany();
    response.json({message: 'All Laps Deleted'});
     
});

//When the client visits, the Mongo database return the cronometer time storage on the database
router.get("/time", async (request, response) => {
    const time = await Time.find();
    response.json(time);
})

//When the client visits, insert a new cronometer time to the Mongo database
router.put('/time', async (request, response) => {
    const { minutes, seconds, miliseconds } = request.body;
    await Time.updateOne({}, {$set: {"minutes": minutes, "seconds": seconds, "miliseconds": miliseconds} }, {upsert: true});
    response.json({'message': 'Time Saved'});
});


module.exports = router;