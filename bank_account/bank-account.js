//
// This is only a SKELETON file for the 'Bank Account' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class BankAccount {
  isOpen = false;

  constructor(accountBalance) {
    this.accountBalance = accountBalance;
  }

  open() {
    if (this.isOpen === true) {
      throw new ValueError();
    }
    this.isOpen = true;
    this.accountBalance = 0;
  }

  close() {
    if (this.isOpen === false) {
      throw new ValueError();
    }
    this.isOpen = false;
  }

  deposit(newDeposit) {
    if (this.isOpen === false) {
      throw new ValueError();
    }

    if (newDeposit < 0) {
      throw new ValueError();
    }
    this.accountBalance += newDeposit;
    return this.accountBalance;
  }

  withdraw(newDeposit) {
    if (this.isOpen === false) {
      throw new ValueError();
    }

    if (this.accountBalance < newDeposit) {
      throw new ValueError();
    }

    if (newDeposit < 0) {
      throw new ValueError();
    }
    this.accountBalance -= newDeposit;
    return this.accountBalance;
  }

  get balance() {
    if (this.isOpen === true) {
      return this.accountBalance;
    }
    throw new ValueError();
  }
}

export class ValueError extends Error {
  constructor() {
    super('Bank account error');
  }
}
