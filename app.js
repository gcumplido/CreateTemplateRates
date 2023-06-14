const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs');


app.use(express.static('styles'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/index.html'))
})

app.post('/submitRate', async (req,res)=>{
    const rate = req.body.rate1

    const textContent = `Hola tengo un valor de ${rate}`

    fs.writeFile(path.join(__dirname,'myfile.txt'), textContent, (err) => {
        if (err) {
            console.error('An error occurred while creating the file:', err);
            return;
        }
        res.download(path.join(__dirname,'myfile.txt'))
    });
    // res.redirect('/')
})

app.listen(3000 ,()=>{
    console.log('App listening on port 3000')
})
