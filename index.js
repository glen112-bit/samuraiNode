const express = require("express");

const server = express();

  /* query params */
server.get("/hello", (req, res) =>{
  // const name = req.query.name;
  //
  // return res.json({
  // title: "hello world csm!!!!",
  // message: `hola que tal ${name}`
  // })
  const {name, age} = req.query;

  return res.json({
        title: "hello world csm!!!!",
        message: `hola que tal ${name} de ${age} años`

    });
  });

//////// users list /////////////

server.use(express.json());

let customers = [
  {id:01, name:"numero 1", site: "http://numero1.com"},
  {id:02, name:"numero 2", site: "http://numero2.com"},
  {id:03, name:"numero 3", site: "http://numero3.com"}
];

// customers//////////////////////////////////////////////////////////////
server.get("/customers", (req, res) => {
  return res.json(customers)
});

//customer////////////////////////////////////////////////////////////////
server.get("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id) 
  const customer = customers.find( item => item.id === id )
  const status = customer ? 200 : 404;
  return res.status(status).json(customer)
});

//insert/////////////////////////////////////////////////////////////////
server.post("/customers", (req, res) => {
  const {name, site} = req.body;
  const id = customers[customers.length -1].id + 1;

  const newCustomer = {id, name, site};

  customers.push(newCustomer)
  return res.status(201).json(newCustomer)
}),

//update /////////////////////////////////////////////////////////////////
  server.put("/customers/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, site } = req.body;

    const index = customers.findIndex(item => item.id === id)
    const status = index >= 0 ? 200 : 404;

    if(index >= 0){
      customers[index] = {id: parseInt(id), name, site}
    }
  return res.status(status).json(customers[index])
});

///// delete///////////////////////////////////////////////////////////////
  server.delete("/customers/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = customers.findIndex(item => item.id === id);
    const status = index >= 0 ? 200 : 404;

    if (index >= 0 ){
      customers.splice(index, 1);
    }
    return res.status(status).json()
});
 
  /* route params ********************************************************/
  server.get("/hello/:name/:age", (req, res)=>{
 const {name, age} = req.params
 return res.json({
        title: "hello world csm!!!!",
        message: `hola que tal ${name}, tranquilo? de ${age} años`
   });
});

server.listen(3000);
