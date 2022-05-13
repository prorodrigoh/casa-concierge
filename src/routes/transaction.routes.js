import { Router } from "express"
import { 
    createTransaction,
    getAllTransaction,
    getTransactionByDate,
    getTransactionById,
    updTransaction,
    deleteTransactionDoc
} from "../services/transaction.services.js";

export const transactionRoutes = Router();

transactionRoutes.post('/', createTransaction);
transactionRoutes.get('/', getAllTransaction);
transactionRoutes.get('/:date', getTransactionByDate);
transactionRoutes.get('/:TransactionDocId', getTransactionById);
transactionRoutes.patch('/:TransactionDocId', updTransaction);
transactionRoutes.delete('/:TransactionDocId', deleteTransactionDoc);