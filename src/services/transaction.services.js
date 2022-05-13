import { getCollection } from "./mongo.collection.js";

const col = await getCollection('transactions');

// ---------------  CREATE SECTION

// we save teh information of the user creating the transaction that can be different from the employee in the transaction
export const createTransaction = async (loggedUserId, employeeId, eComRate, serviceName, dateTransaction, 
  clientUnit, clientPayment, vendorName, vendorCost) => {

  // calculations
  const grossProfit = clientPayment - vendorCost
  const commission = grossProfit * eComRate
  const netProfit = grossProfit - commission

  const insertedResults = await col.insertOne({
    timeCreated:        ISODate(),
    loggedUserId, 
    employeeId,
    serviceName, dateTransaction, clientUnit, clientPayment, vendorName, vendorCost,
    grossProfit, commission, netProfit, 
    deleted: false, 
    changed: false, 
    oldTransactionId: null
  });

  return insertedResults.insertedId;

}


// ---------------  READ SECTION


export const getAllTransaction = async () => {
  const ret = col.find({})
  return ret.toArray()
}

export const getTransactionById = async (_id) => {
  const ret = col.find({_id})
  return ret.toArray()
}

export const getTransactionByDate = async (dateTransaction) => {
  const ret = col.find({ dateTransaction, deleted: false })
  return ret.toArray()
}


// ---------------  UPDATE SECTION


// to update a transaction we will retrieve the current _id to reserve and current data to show it to the user.
// with the current transaction _id, we will flag to deletion and reference it in the new one. 
// this way we can see what was changed, almost like a version tracking

export const updTransaction = async (loggedUserId, transactionId, employeeId, eComRate, serviceName, dateTransaction, 
  clientUnit, clientPayment, vendorName, vendorCost) => {

  // calculations
  const grossProfit = clientPayment - vendorCost
  const commission = grossProfit * eComRate
  const netProfit = grossProfit - commission

  const insertedResults = await col.insertOne({
    timeCreated:        ISODate(),
    loggedUserId, 
    employeeId,
    serviceName, dateTransaction, clientUnit, clientPayment, vendorName, vendorCost,
    grossProfit, commission, netProfit, 
    deleted: false, 
    changed: true, 
    oldTransactionId: transactionId
  });

  return insertedResults.insertedId;

}


// ---------------  DELETE SECTION


// to delete a transaction, we create a new one flagged and referencing the previous
// this avoids having the flags deleted and changed true at same time
export const deleteTransactionDoc = async (loggedUserId, _id) => {
  const delTransactionData = await getTransactionById (_id)
  const insertedResults = await col.insertOne({
    timeCreated:        ISODate(),
    loggedUserId, 
    employeeId:       delTransactionData[0].employeeId     ,
    serviceName:      delTransactionData[0].serviceName    , 
    dateTransaction:  delTransactionData[0].dateTransaction, 
    clientUnit:       delTransactionData[0].clientUnit     , 
    clientPayment:    delTransactionData[0].clientPayment  , 
    vendorName:       delTransactionData[0].vendorName     , 
    vendorCost:       delTransactionData[0].vendorCost     ,
    grossProfit:      delTransactionData[0].grossProfit    , 
    commission:       delTransactionData[0].commission     , 
    netProfit:        delTransactionData[0].netProfit      , 
    deleted: true, 
    changed: false, 
    oldTransactionId: _id
  });
}
