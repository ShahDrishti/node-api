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


//Single Data
app.get('/employee1/:empId', async (req, res) => {
    const id = req.params.empId;
    try {
      const result = await db.query('select * from employee1 where empId = $1', [id]);
      res.send(result.rows[0]);
    } catch (err) {
      //console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

//All Data
  app.get('/employee1', async (req, res) => {
    const id = req.params.empId;       
    try {
        const result = await db.query('select * from employee1');
        res.send(result.rows);
    } catch (err) {
        //console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/employee1',async(req , res )=>
{
    //const output = req.body
    try {
        await db.query("insert into employee1(empName, empAge, empSalary, empId) values ($2 , $3 ,$4, $1)",
        [req.body.empId, req.body.empName, req.body.empAge,req.body.empSalary]);
        res.json("Record inserted successfully.");
    } catch (err) {
        res.status(500).send('Internal Sever Error')
    }
})

app.put('/employee1/:empId', async(req, res)=>{
  const id = req.params.empId
  console.log(req.body);
  //const output = req.body
  try {
    await db.query("update employee1 set empName = $2 , empAge = $3,empSalary=$4 where empId = $1",
    [id, req.body.empName, req.body.empAge,req.body.empSalary]);
    res.json("Record updated successfully.");
  } catch (err) {
    res.status(500).send('Internal Sever Error')
  }
})

app.delete('/employee1/:empId', async(req,res)=>{
  const id = req.params.empId
  try {
    await db.query("delete from employee1 where empId = $1",
    [id]);
    res.json("Record deleted successfully.");
  } catch (err) {
    res.status(500).send('Internal Sever Error');
  }
})

app.listen(port,()=>{
    console.log(`Server is listening to the port : ${port}`)
})