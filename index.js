import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import fs from 'fs'
import { error } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5456;



app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});


app.get('/images',(req,res) => {
      const imageDir = path.join(__dirname,'public','images')
      fs.readdir(imageDir,(error,file)=>{
        if(error){
          console.log("Failed to load the image",error)
          return res.status(500).json({error:'Error reading the file'})
        }
        const imageFiles = file.filter(file=> /\.(png)$/i.test(file))
        const imageUrl = imageFiles.map(file => `/static/images/${file}`)
        console.log(imageUrl.length)
        res.status(200).json({images: imageUrl})
      })
})

app.get('/2dcuttings',(req,res)=>{
  const imageDir = path.join(__dirname,'public','2dcuttings')
  fs.readdir(imageDir, (error,file)=>{
    if(error){
      console.log('failed to load images',error)
      return res.status(500).json({error:'Error reading files'})
    }
    const imageFiles = file.filter(file => /\.(png)$/i.test(file))
    const imageUrl = imageFiles.map(file => `/static/2dcuttings/${file}`)
    res.status(200).json({images : imageUrl,key: '_2DCutting'})
  })
})

app.get('/maindoors',(req,res)=>{
  const imageDir = path.join(__dirname,'public','maindoors')
  fs.readdir(imageDir, (error,file)=>{
    if(error){
      console.log('failed to load images',error)
      return res.status(500).json({error:'error while reading files'})
    }
    const imagesFiles = file.filter(file => /\.(png)$/i.test(file))
    const imageUrl = imagesFiles.map(file =>`/static/maindoors/${file}`)
    res.status(200).json({images: imageUrl , key: 'MainDoor'   })
  })
})