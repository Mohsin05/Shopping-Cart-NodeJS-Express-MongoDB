var Product=require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');

var products=[
    new Product({
    imagePath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
    title:'Gothic',
    description:'Awesome Game!!!!!',
    price:18,
}),new Product({
    imagePath:'https://images-na.ssl-images-amazon.com/images/I/81LFMrgSq0L._SY450_.jpg',
    title:'Camera',
    description:'Best Camera Ever built. Hundreds of memory with one single gadget. Is it not awesome' +
    'It has a lot memory and you can even use external memory card.',
    price:78,
}),new Product({
    imagePath:'https://images-na.ssl-images-amazon.com/images/I/81Y1ho-tLTL._SX425_.jpg',
    title:'Furbo Dog',
    description:'Puppy Activity Ball Treat output: Please see across the free Furbo app for Android and iOS a' +
    ' treat to your dog. Fill up to 30 favourite treats for your dog and play from anywhere',
    price:259,
}),new Product({
    imagePath:'https://images-na.ssl-images-amazon.com/images/I/619Pk0p8BbL._SY355_.jpg',
    title:'Audio Headphones',
    description:'Comfortable. Klim Fusion headphones are equipped with memory foam, of the adapts to the shape of your ear they. ' +
    'Some people preferring standard in-ear add-ons, that is why we offer 3 additional pairs in all sizes',
    price:18,
}),new Product({
    imagePath:'https://images-na.ssl-images-amazon.com/images/I/51mYvKZlGbL._SX425_.jpg',
    title:'Home Cinema Projector',
    description:'Mit hervorragendem 3.000 Lumen Helligkeit & 10.000: 1 Kontrastverhältnis kann der neue CB-400 klare und helle Bilder auf einer großen Leinwand leichter darstellen als LCD-Beamer mit den gleichen Parametern - das Bild Qualität ist sogar noch besser als ein Full-HD LCD Beamer. ' +
    '(Native Auflösung: 720p, Max. Eingangsauflösung: 1080p)',
    price:180,
}),new Product({
    imagePath:'https://images-na.ssl-images-amazon.com/images/I/81lyFwKcZ5L._SX522_.jpg',
    title:'Weather Station for Smartphones',
    description:'Made for iPhone and Android Weather Station: access to its sensors from anywhere, at any time.',
    price:118,
})
];

var done=0;
for(var i=0; i<products.length;i++){
    products[i].save(function (err,result) {
        done++;
        if(done === products.length){
            exit();
        }})
}

function exit() {
    mongoose.disconnect();
}