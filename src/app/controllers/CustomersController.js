  let customers = [
    {id:01, name:"numero 1", site: "http://numero1.com"},
    {id:02, name:"numero 2", site: "http://numero2.com"},
    {id:03, name:"numero 3", site: "http://numero3.com"}
  ];

class CustomersController{

//list***************************************************
  index(req, res){
    return res.json(customers)
  };
  
//index**************************************************
  show(req, res) {
  const id = parseInt(req.params.id) 
  const customer = customers.find( item => item.id === id )
  const status = customer ? 200 : 404;

  console.debug("Get :: /customers/:id ", customer)
  return res.status(status).json(customer)
  };

  //create*************************************************
  create(req, res){
  const {name, site} = req.body;
  const id = customers[customers.length -1].id + 1;

  const newCustomer = {id, name, site};

  customers.push(newCustomer)
  return res.status(201).json(newCustomer)
  };

  //update************************************************
  update(req, res){
    const id = parseInt(req.params.id);
    const { name, site } = req.body;

    const index = customers.findIndex(item => item.id === id)
    const status = index >= 0 ? 200 : 404;

    if(index >= 0){
      customers[index] = {id: parseInt(id), name, site}
    }
  return res.status(status).json(customers[index])
  };

  //delete**************************************************
  destroy(req, res){
    const id = parseInt(req.params.id);
    const index = customers.findIndex(item => item.id === id);
    const status = index >= 0 ? 200 : 404;

    if (index >= 0 ){
      customers.splice(index, 1);
    }
    return res.status(status).json()
    };
  };

module.exports = new CustomersController()
