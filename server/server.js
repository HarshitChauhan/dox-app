require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const router = require("./router");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const Document = require("./Document");
const PORT = process.env.PORT || 9000;
const connectionString = process.env.DATABASE_URL;

function allowCrossDomain(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, POST, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}

const app = express();

// to run client app on server
app.use(express.static("client/build"));

console.log("Starting Application Server...");
const httpServer = createServer(app);
httpServer.listen(PORT, () => {
  console.log(
    `Dox Server has been started successfully on Port: ${process.env.PORT}!`
  );
});

// const server = app.listen(PORT, () => {
//   console.log(
//     `Dox Server has been started successfully on Port: ${process.env.PORT}!`
//   );
// });

// Socket setup
const io = new Server(httpServer);

app.use(allowCrossDomain);
app.use(router);
app.use(cors());

// console.log(`${process.env.DATABASE_URL}\n and ${process.env.FRONTEND_URL}\n and ${process.env.PORT}`);

// database connection
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database Connection Successfull!");
  });

const defaultValue = "";

io.on("connection", (socket) => {
  //get-document event if data is present in document
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    console.log({
      status: "Success ✨",
      timeStamp: new Date().toISOString(),
      message: "New Connection Established",
      data: document,
      docId: documentId,
    });

    if (typeof document.data.data !== "object") {
      console.log({
        status: "Success ✨",
        timeStamp: new Date().toISOString(),
        message: `New Document Created with docId ${documentId}`,
        data: document,
        docId: documentId,
      });
    } else {
      console.log({
        status: "Success ✨",
        timeStamp: new Date().toISOString(),
        message: `New Member joined the existing document with docId ${documentId}`,
        data: document,
        docId: documentId,
      });
    }

    // it joins a seperate room for every document
    socket.join(documentId);
    socket.emit("load-document", document.data);

    //send-changes event
    socket.on("send-changes", (delta) => {
      // broadcasting changes to everyone else that are recieved from client
      socket.broadcast.to(documentId).emit("recieve-changes", delta);
    });

    // saving our content
    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await Document.findById(id);
  //if present return it
  if (document) return document;
  // else create new return it
  return await Document.create({ _id: id, data: defaultValue });
}
