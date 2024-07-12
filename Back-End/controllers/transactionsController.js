const Transaction = require('../models/transaction');

const createTransaction = async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('userId');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//   try {
//     const transaction = await Transaction.findById(req.params.id).populate('userId');
//     if (transaction) {
//       res.json(transaction);
//     } else {
//       res.status(404).json({ message: 'Transaction not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('userId');
    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTransactionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ userId: userId });
    console.log("parameterrr:",req.params.userId);
    console.log('Transactions retrieved:', transactions); 
    if (transactions) {
      
      res.json(transactions);
    } else {
      res.status(404).json({ message: 'User Transactions not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getTransactionsByUserId
};
