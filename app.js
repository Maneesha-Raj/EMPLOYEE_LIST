
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let employees = [];


app.get('/employees', (req, res) => {
  res.json(employees);
});


app.get('/add-employee', (req, res) => {
  res.sendFile(__dirname + '/public/add-employee.html');
});



app.get('/view-employees', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view-employees.html'));
});




app.post('/add-employee', (req, res) => {
  const newEmployee = req.body;
  newEmployee.id = employees.length + 1;
  employees.push(newEmployee);
  // res.status(201).json(newEmployee);
  res.redirect('/view-employees');
});

app.get('/update-employee', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'update-employee.html'));
});

app.put('/update-employee/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);
  const updatedEmployee = req.body;
  const employeeIndex = employees.findIndex(employee => employee.id === employeeId);

  if (employeeIndex !== -1) {
    employees[employeeIndex] = { ...employees[employeeIndex], ...updatedEmployee };
    res.json(employees[employeeIndex]);
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }

  res.redirect('/view-employees');
});


app.get('/delete-employee', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'delete-employee.html'));
  
});

app.delete('/delete-employee/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employeeIndex = employees.findIndex(employee => employee.id === employeeId);

  if (employeeIndex !== -1) {
    const deletedEmployee = employees.splice(employeeIndex, 1)[0];
    res.json(deletedEmployee);
    
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
  res.redirect('/view-employees');
});


app.get('/employees/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employee = employees.find(employee => employee.id === employeeId);

  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});


app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
