
const express = require('express'); // to require express framework
const app = express(); // to use express framework
const mongoose = require('mongoose'); // to use mongoose for mongodb connection
const port = 8080; // port for the server
const path = require('path'); // to use path module for setting views directory
const Chat = require('./models/chats.js'); // Corrected path to the model
const methodOverride = require('method-override');


app.set("views", path.join(__dirname, "views"));// to set the views directory
app.set("view engine", "ejs");// to set the view engine to ejs

app.use(express.static(path.join(__dirname, "public")));// to serve static files
app.use(express.urlencoded({ extended: true }));// to parse urlencoded data
app.use(methodOverride('_method'));// to use method-override for PUT and DELETE requests
app.use(express.json());// to parse json data

//connecting to mongodb
main().then(() => {
    console.log("Connected to MongoDB successfully")
}).catch((err) => {
    console.log(err)
});


async function main() {
    await mongoose.connect('mongodb://localhost:27017/whatsapp');
}


// let chat1 = new Chat({
//     from: "John",
//     to: "Vaibhav",
//     message: "Hello From John",
//     created_at: new Date()
// });

// chat1.save().then((res) => {
//     console.log("Chat1 Save SucessFully", res);
// }).catch(err=>{
//     console.log("Error in saving chat1", err);
// })

app.get('/', (req, res) => {
    res.send("main Page");
})

// index route to render the index.ejs file
app.get('/chats', async (req, res) => {
    let chats = await Chat.find({}).then((result) => {
        console.log("All Chats");
        res.render('index.ejs', { chats: result });
    }).catch((err) => {
        console.log("Error in fetching chats", err);
        res.status(500).send("Error in fetching chats");
    })
})

// route to render the chat.ejs file
app.get('/chats/new', (req, res) => {
    res.render('new.ejs');
})

// route to handle the form submission
// to save the chat in the database
app.post('/chats', async (req, res) => {
    let { from, to, message } = req.body;

    let newChat = new Chat({
        from: from,
        to: to,
        message: message,
        created_at: new Date()
    })

    //chat saved in the database
    newChat.save().then((result) => {
        res.redirect('/chats');
        console.log("Chat saved Sucessfully", result);
    }).catch(err => {
        console.log("Error in saving chat", err);
    })



})


// route to edit the chat
app.get("/chats/:id/edit", async (req, res) => {
    let id = req.params.id;

    try {
        let chat = await Chat.findById(id);
        if (!chat) {
            return res.status(404).send("Chat not found");
        }
        res.render('edit.ejs', { chat });
    } catch (err) {
        console.log("Error fetching chat for edit", err);
        res.status(500).send("Error fetching chat");
    }
});

//route to update the chat
app.put("/chats/:id", async (req, res) => {
    let id = req.params.id;
    let { from, to, message } = req.body;

    try {
        let chat = await Chat.findByIdAndUpdate(id, {
            from: from,
            to: to,
            message: message,
            created_at: new Date()
        }, { runValidators: true, new: true });

        if (!chat) {
            return res.status(404).send("Chat not found");
        }
        res.redirect('/chats');
    } catch (err) {
        console.log("Error updating chat", err);
        res.status(500).send("Error updating chat");
    }
});


app.delete("/chats/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let chat = await Chat.findByIdAndDelete(id);
        if (!chat) {
            return "Chat not found";
        } else {
            res.redirect('/chats');
        }
    } catch (err) {
        console.log("Error deleting Chat", err);
        res.status(500).send("Error deleting chat");
    }
})

//port listening
app.listen(8080, () => {
    console.log(`Server is running on port  ${port}`);
})