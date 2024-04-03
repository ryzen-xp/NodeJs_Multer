const express =  require ( 'express')
const multer = require ('multer');
const path = require('path');

const port = 3000;

const app= express();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Multer upload configuration
const upload = multer({ storage: storage });

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/indiex.html');
});

// Handle file upload
app.post('/upload', upload.single('fileUpload'), (req, res) => {
  if (!req.file) {
      return res.status(400).send('No files were uploaded.');
  }

  res.send('File uploaded successfully!');
});


 app.listen(port, (error)=>{
  if(!error){console.log('Server is  Runnning  on  port   3000');}
  else{
    console.log(`Error : ${error}`)
  }
 });