const express = require("express");
//const morgan = require('morgan');
const db= require("./db");
const cors = require('cors')
//Bringing in the Routes
//const postRoutes = require("./routes/post");

const app = express();
const port =  3000;
app.use(express.json());
app.use(cors())

//DEPARTMENT

//Single Data
app.get('department/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const result = await db.query('select * from department where id = $1', [id]);
      res.send(result.rows[0]);
    } catch (err) {
      //console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

//All Data
  app.get('/department', async (req, res) => {
    const id = req.params.id;       
    try {
        const result = await db.query('select * from department');
        res.send(result.rows);
    } catch (err) {
        //console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/department',async(req , res )=>
{
    const output = req.body
    try {
        await db.query("insert into department(name, place, id) values ($2 , $3 , $1)",
        [req.body.id, req.body.name, req.body.place]);
        res.json("Record inserted successfully.");
    } catch (err) {
        res.status(500).send('Internal Sever Error')
    }
})

app.put('/department/:id', async(req, res)=>{
  const id = req.params.id
  const output = req.body
  try {
    await db.query("update department set name = $2 , place = $3 where id = $1",
    [id, req.body.name, req.body.place]);
    res.json("Record updated successfully.");
  } catch (err) {
    res.status(500).send('Internal Sever Error')
  }
})

app.delete('/department/:id', async(req,res)=>{
  const id = req.params.id
  try {
    await db.query("delete from department where id = $1",
    [id]);
    res.json("Record deleted successfully.");
  } catch (err) {
    res.status(500).send('Internal Sever Error');
  }
})


//USER

//Single Data
app.get('/user/:email', async (req, res) => {
  const email = req.params.email;
  try {
    const result = await db.query('select * from user_manage where email = $1', [email]);
    res.send(result.rows[0]);
  } catch (err) {
    //console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

//All Data
app.get('/user', async (req, res) => {
  const email = req.params.email;       
  try {
      const result = await db.query('select * from user_manage');
      res.send(result.rows);
  } catch (err) {
      //console.error(err);
      res.status(500).send('Internal Server Error');
  }
});


app.post('/user',async(req , res )=>
{
  const output = req.body
  try {
      await db.query("insert into user_manage(email,password,type,fname,lname,active) values($1, $2 , $3, $4, $5, $6)",
      [req.body.email, req.body.password, req.body.type, req.body.fname, req.body.lname, req.body.active]);

      res.json("Record inserted successfully.");
  } catch (err) {
      res.status(500).send('Internal Sever Error')
  }
})

app.put('/user/:email', async(req, res)=>{
const email = req.params.email
const output = req.body
try {
  await db.query("update user_manage set password = $2 , type = $3, fname=$4, lname=$5, active=$6 where email = $1",
  [email, req.body.password, req.body.type, req.body.fname, req.body.lname, req.body.active]);
  res.json("Record updated successfully.");
} catch (err) {
  res.status(500).send('Internal Sever Error')
}
})

app.delete('/user/:email', async(req,res)=>{
const email = req.params.email
try {
  await db.query("delete from user_manage where email = $1",[email]);
  res.json("Record deleted successfully.");
} catch (err) {
  res.status(500).send('Internal Sever Error');
}
})



app.listen(port,()=>{
    console.log(`Server is listening to the port : ${port}`)
})