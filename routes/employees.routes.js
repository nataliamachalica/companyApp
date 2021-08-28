const express = require('express');
const router = express.Router();
const EmployeesController = require('../controllers/employees.controller');

router.get('/employees', EmployeesController.getAll);
router.get('/employees/random', EmployeesController.getRandom);
router.get('/employees/:id', EmployeesController.getById);
router.get('/employees', EmployeesController.postAll);
router.get('/employees/:id', EmployeesController.putById);
router.get('/employees/:id', EmployeesController.deleteById);

module.exports = router;
