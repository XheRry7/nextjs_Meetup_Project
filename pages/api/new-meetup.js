import { MongoClient } from "mongodb";

const meetup = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect("mongodb+srv://shehryar:sheryx1744@cluster0.gqpr36i.mongodb.net/?retryWrites=true&w=majority");

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    await meetupsCollection.insertOne(data);
    client.close();
    res.status(200).json({ message: " meetup inserted!" });
  }
};

export default meetup;
