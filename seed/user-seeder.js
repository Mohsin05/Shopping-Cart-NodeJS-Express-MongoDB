var Product=require('../models/user');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');

var userLogin=[
    new Product({
        email:'admin@admin.com',
        password:'admin',
    }),new Product({
        email:'MohsinYounas05@gmail.com',
        password:'admin'
    })
];

var done=0;
for(var i=0; i<userLogin.length;i++){
    userLogin[i].save(function (err,result) {
        done++;
        if(done === userLogin.length){
            exit();
        }})
}

function exit() {
    mongoose.disconnect();
}