const express = require('express');
//This helps us read the files
const fs = require('fs');
//path helps with configuring absolute path
const path = require('path');

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));
// app.use(express.urlencoded({ extended: true }));


//this allows us to read data from account.json file store in a constant called account data. path.join sync take two arguments absolute path and encoding.
const accountData = fs.readFileSync(path.join(__dirname, 'json', 
'accounts.json'), 'utf-8');

app.get('/', (req,res) => {
    res.render('index', {
        title:'Account Summary', 
        accounts: accounts
    })
})

app.get('/savings', (req, res) => {
    res.render('account', {
        account:accounts.savings
    });
});

app.get('/checking', (req, res) => {
    res.render('account', {
        account:accounts.checking
    });
});

app.get('/credit', (req, res) => {
    res.render('account', {
        account:accounts.credit
    });
});

//read the data from users.json file and store in a constant called users data. read file sync two arguments absolute path and encoding
const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'utf-8');

//to work with the data we must convert it to a javascript object
const accounts = JSON.parse(accountData);

//to work with data we have to convert it to a javascript object
const users = JSON.parse(userData);

app.get('/profile', (req, res) => res.render('profile', {user: users[0] }));

app.listen(3000,function(req,res){
    console.log('PS Project Running on port 3000')
})

