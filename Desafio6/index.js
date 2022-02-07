const express = require('express');
const path = require('path')
const app = express();
const { dataProducts } = require('./dataProducts')
const PORT = process.env.PORT || 8080;
//middlerwares
app.use(express.json()); //agrgar esto para que lea del body parsea a json
app.use(express.urlencoded({extended:true}));

function randArray(array){
    let rand = Math.floor(Math.random()*array.length);
    let randomValue = array[rand];
    return randomValue;
}

app.get('/products',(req,res)=>{
    res.json({dataProducts});
});

app.get('/productsRandom',(req,res)=>{    
    let myArray = dataProducts;
    let randomValue = randArray(myArray);   
    res.json(randomValue);
    console.log(randomValue);
});


// app.get('/api/palabras/:pos',(req,res)=>{
//     const {pos} = req.params;  // parametros de ruta cuando definimos la ruta con los : esperamos un parametro de ruta
//     const palabras = frase.split(' ');
//     const buscada = palabras[+pos - 1];
//     res.json({buscada});
// });

// app.post('/api/palabras/',(req,res)=>{
//     const {palabra}= req.body; 
//     const palabras = frase.split(' ');
//     palabras.push(palabra);
//     frase = palabras.join(' ')
//     res.json({
//         agregada: palabra,
//         pos: palabras.length
//     });
// });

// app.put('/api/palabras/:pos',(req,res)=>{
//     const {palabra}= req.body; //siempre para recibir un objeto json archivos lo que querramos
//     const palabras = frase.split(' '); //para manipular un string y convertirlo en un arreglo
//     const {pos} = req.params;
//     const palabraAModificar = palabras[+pos -1 ]; //+pos le digo que es numero
//     palabras[+pos -1 ] = palabra;
//     frase = palabras.join(" ");
//     res.json({
//         actualizada: palabra,
//         anterior: palabraAModificar
//     });
// });

// app.delete('/api/palabras/:pos',(req,res)=>{
//     const palabras = frase.split(' '); 
//     const {pos} = req.params;
//     palabras.splice((+pos -1),1);
//     frase = palabras.join(" ");
//     res.json({mensaje: "OK"})
// });





const conectedServer = app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});

conectedServer.on(`error`,(error)=>{
    console.log(error.message);
})