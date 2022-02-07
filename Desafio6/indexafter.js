const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;
let frase = "Frase inicial"

//middlerwares

app.use(express.json()); //agrgar esto para que lea del body parsea a json



app.get('/api/frase',(req,res)=>{
    res.json({frase:frase});
});

app.get('/api/palabras/:pos',(req,res)=>{
    const {pos} = req.params;  // parametros de ruta cuando definimos la ruta con los : esperamos un parametro de ruta
    const palabras = frase.split(' ');
    const buscada = palabras[+pos - 1];
    res.json({buscada});
});

app.post('/api/palabras/',(req,res)=>{
    const {palabra}= req.body; 
    const palabras = frase.split(' ');
    palabras.push(palabra);
    frase = palabras.join(' ')
    res.json({
        agregada: palabra,
        pos: palabras.length
    });
});

app.put('/api/palabras/:pos',(req,res)=>{
    const {palabra}= req.body; //siempre para recibir un objeto json archivos lo que querramos
    const palabras = frase.split(' '); //para manipular un string y convertirlo en un arreglo
    const {pos} = req.params;
    const palabraAModificar = palabras[+pos -1 ]; //+pos le digo que es numero
    palabras[+pos -1 ] = palabra;
    frase = palabras.join(" ");
    res.json({
        actualizada: palabra,
        anterior: palabraAModificar
    });
});

app.delete('/api/palabras/:pos',(req,res)=>{
    const palabras = frase.split(' '); 
    const {pos} = req.params;
    palabras.splice((+pos -1),1);
    frase = palabras.join(" ");
    res.json({mensaje: "OK"})
});





const conectedServer = app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});

conectedServer.on(`error`,(error)=>{
    console.log(error.message);
})