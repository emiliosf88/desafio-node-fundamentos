import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

// Service = Regra de negócios

interface Request{
  title: string,
  value: number,
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute( {title, value, type}:Request ): Transaction {

    if (!["income", "outcome"].includes(type)){
      throw new Error("Invalid transaction");
    }

    const { total }= this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value){
      throw new Error ( "Not enough balance");
    }
    // tem balance? getbalance tem que retornar o valor e checar se o não vai ficar negativo

    const transaction = this.transactionsRepository.create({
      title, 
      value, 
      type,
    });
    
    return transaction;
  }
}

export default CreateTransactionService;
