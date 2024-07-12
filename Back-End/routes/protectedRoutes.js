const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authMiddleware');
const transactionsController = require('../controllers/transactionsController');

// Protected routes
router.post('/transactions', authenticateJWT, transactionsController.createTransaction);
router.get('/transactions', authenticateJWT, transactionsController.getAllTransactions);
router.get('/transactions/:id', authenticateJWT, transactionsController.getTransactionById);
router.put('/transactions/:id', authenticateJWT, transactionsController.updateTransaction);
router.delete('/transactions/:id', authenticateJWT, transactionsController.deleteTransaction);

module.exports = router;
