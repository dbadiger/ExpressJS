import express from 'express'
import mongoose from 'mongoose'
import { connectDB } from './config/db.js'
import { Person } from './models/Person.js'

const app = express()
const PORT = 3000
app.use(express.json)
await connectDB()

app.get('/', (req, res) => {
    res.send("welcome to express class")
})

//Insert data into Database(save into Database)
app.post('/person', express.json(), async (req, res) => {
    try {
        const { email, name, age } = req.body;
        const newPerson = new Person({
            name, age, email
        })
        await newPerson.save()
        console.log(newPerson);
        res.send("Person Added to DB")
    } catch (error) {
        console.log(error);
        res.send(error.message)

    }

})

//Find the value in database
app.get('/person', async (req, res) => {
    const { email } = req.body;
    const { age } = req.body;
    const { id } = req.body
    //different ways
    // const personData = await Person.findOne({email})
    const personData = await Person.find({ email, age })
    // const personData1 = await Person.findById({id})
    console.log(personData);
    res.send("Person found")
})

//Update value in the database
app.put("/person", async () => {
    const { id } = req.body
    const personData = await Person.findById(id)
    personData.age = 45 //updating age to 45 years
    await personData.save()
    console.log(personData);
    res.send("Person Updated")
})
//Method 2
app.put("/person", async () => {
    const { id } = req.body
    const personData = await Person.findByIdAndUpdate(id, { age: 45 })
    await personData.save()
    console.log(personData);
    res.send("Person Updated")
})

//Deleting Data
app.delete('/person/:id', async (req, res) => {
    const { id } = req.params
    await Person.findByIdAndDelete(id)
    res.send("Person Deleted")
})

app.listen(PORT, () => {
    console.log(`Server is Started at http://localhost:${PORT}`)
})