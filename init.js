const mongoose = require('mongoose');
const Chat = require('./models/chats.js'); // Corrected path to the model

//connecting to mongodb
main().then(() => {
    console.log("Connected to MongoDB successfully")
}).catch((err) => {
    console.log(err)
});


async function main() {
    await mongoose.connect('mongodb://localhost:27017/whatsapp');
}

let allChats = [
    { from: "John Rajput", to: "Lalit", message: "Hello From John Rajput", created_at: new Date() },
    { from: "Ajay Singh", to: "John Singh", message: "Hello From Ajay Singh", created_at: new Date() }
    , { from: 'Alice', to: 'Bob', message: 'Hey Bob!', created_at: new Date() },
    { from: 'Charlie', to: 'Dana', message: 'How are you?', created_at: new Date() },
    { from: 'Eve', to: 'Frank', message: 'Let’s catch up soon.', created_at: new Date() },
    { from: 'Grace', to: 'Heidi', message: 'Meeting at 5?', created_at: new Date() },
    { from: 'Ivan', to: 'Judy', message: 'Good luck today!', created_at: new Date() },
    { from: 'Karl', to: 'Laura', message: 'Check your email.', created_at: new Date() },
    { from: 'Mallory', to: 'Niaj', message: 'See you tomorrow.', created_at: new Date() },
    { from: 'Olivia', to: 'Peggy', message: 'Happy Birthday!', created_at: new Date() },
    { from: 'Quentin', to: 'Rita', message: 'Thanks for the help.', created_at: new Date() },
    { from: 'Sybil', to: 'Trent', message: 'What’s the update?', created_at: new Date() },
]


Chat.insertMany(allChats).then((res) => {
    console.log("Chats Inserted Successfully", res);
}).catch(err => {
    console.log("Error in inserting chats", err);
})
