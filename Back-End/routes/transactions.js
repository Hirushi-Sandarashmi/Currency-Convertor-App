const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');

// Define the routes and map them to controller functions
router.post('/', transactionsController.createTransaction);
router.get('/', transactionsController.getAllTransactions);
router.get('/:id', transactionsController.getTransactionById);
router.get('/find/:userId', transactionsController.getTransactionsByUserId);
router.put('/:id', transactionsController.updateTransaction);
router.delete('/:id', transactionsController.deleteTransaction);


module.exports = router;
