const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const port = 8000;


// Database Config

const sequelize = new Sequelize('todo', 'nikhil', 'Admin123', {
    host: 'localhost',
    dialect: 'postgres'
});

// Database connection 

sequelize.authenticate()
.then( ()=> {
    console.log("Database Connected");
}).catch( err => {
    console.error('unable to connect to Database');
});


// Creating DB schemas and Creating Tables


const User = sequelize.define('users',{

    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    
    },{
        timestamps: false
});

const Task = sequelize.define('task',{

    id: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    taskname: Sequelize.STRING,
    
    
    },{
        timestamps: false
});


// sequelize.sync({
//     force: true
// });


// Done with Database


app.listen(port, (req,res) => {
    console.log(`server started on port ${port}`);
});


app.get('/', function (req,res) {
    res.status(200).json({
        success: true,
        data: "Home Url"
    });
});





app.post('/api/post/user', async function (req, res) {

    try {

        let dataObj = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email
        }
    
        let createdData = await User.create(dataObj);

        res.status(200).json({
            success: true,
            data: createdData
        })
        
    } catch (err) {

        res.status(500).json({
            success: false,
            error: `internal server ERROR: ${err} `
        });   
    }
})


app.post('/api/post/task', async function (req, res) {

    try {

        let dataObj = {
            id: req.body.id,
            taskname: req.body.taskname
        }
    
        let createdData = await Task.create(dataObj);

        res.status(200).json({
            success: true,
            data: createdData
        })
        
    } catch (err) {

        res.status(500).json({
            success: false,
            error: `internal server ERROR: ${err} `
        });   
    }
})

//my functions.

app.get('/api/task/data', async function (req,res) {

    let query = {};

   try {

        if(req.query.id)
        {
            query.id = req.query.id;
        }

       values = await Task.findAll({
           where: query
        })

        res.status(200).json({
            success: true,
            data: values
        })

   } catch (err) {

        res.status(500).json({
            success: false,
            error: `internal server ERROR: ${err} `
        });
   }
})

app.post('/api/post/task1', async function (req, res) {

    try {

        DELETEFROM
        Task 
        WHERE
        id=req.body.id      

        

        res.status(200).json({
            success: true
        })
        
    } catch (err) {

        res.status(500).json({
            success: false,
            error: `internal server ERROR: ${err} `
        });   
    }
})


app.post('/api/post/user1', async function (req, res) {

    try {

        DELETEFROM
        User
        WHERE
        id=req.body.id      

        

        res.status(200).json({
            success: true
        })
        
    } catch (err) {

        res.status(500).json({
            success: false,
            error: `internal server ERROR: ${err} `
        });   
    }
})