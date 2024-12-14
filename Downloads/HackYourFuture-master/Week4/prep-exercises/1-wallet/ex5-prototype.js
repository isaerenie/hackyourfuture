function Wallet(name, cash = 0) {
  this._name = name;
  this._cash = cash;
  this._dailyAllowance = 40; 
  this._dayTotalWithdrawals = 0; 
}

Wallet.prototype.deposit = function (amount) {
  this._cash += amount;
};

Wallet.prototype.withdraw = function (amount) {
  if (this._dayTotalWithdrawals + amount > this._dailyAllowance) {
    console.log(
      `Daily withdrawal limit exceeded! You can withdraw up to ${
        this._dailyAllowance - this._dayTotalWithdrawals
      } more today.`
    );
    return 0;
  }

  if (this._cash - amount < 0) {
    console.log(`Insufficient funds!`);
    return 0;
  }

  this._cash -= amount;
  this._dayTotalWithdrawals += amount; // track daily withdrawals
  return amount;
};

Wallet.prototype.transferInto = function (wallet, amount) {
  console.log(
    `Transferring ${eurosFormatter.format(amount)} from ${
      this._name
    } to ${wallet.getName()}`
  );
  const withdrawnAmount = this.withdraw(amount);
  wallet.deposit(withdrawnAmount);
};

Wallet.prototype.reportBalance = function () {
  console.log(
    `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
  );
};

Wallet.prototype.getName = function () {
  return this._name;
};

// New method: Reset daily withdrawals
Wallet.prototype.resetDailyAllowance = function () {
  this._dayTotalWithdrawals = 0;
};

// New method: Update daily allowance
Wallet.prototype.setDailyAllowance = function (newAllowance) {
  this._dailyAllowance = newAllowance;
};

function main() {
  const walletJack = new Wallet('Jack', 100);
  const walletJoe = new Wallet('Joe', 10);
  const walletJane = new Wallet('Jane', 20);

  walletJack.withdraw(30);
  walletJack.withdraw(15); 
  walletJack.resetDailyAllowance(); 
  walletJack.withdraw(20); 

  walletJack.transferInto(walletJoe, 20);
  walletJane.transferInto(walletJoe, 25);

  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();
}

main();
