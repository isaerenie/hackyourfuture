function deposit(amount) {
  this._cash += amount;
}

function withdraw(amount) {
  if (this._cash - amount < 0) {
    console.log('Insufficient funds!');
    return 0;
  }

  if (this._dayTotalWithdrawals + amount > this._dailyAllowance) {
    console.log(
      `Withdrawal denied! Exceeds daily allowance of ${this._dailyAllowance}.`
    );
    return 0;
  }

  this._cash -= amount;
  this._dayTotalWithdrawals += amount;
  return amount;
}

function transferInto(wallet, amount) {
  console.log(
    `Transferring ${amount} from ${this._name} to ${wallet.getName()}`
  );
  const withdrawnAmount = this.withdraw(amount);
  wallet.deposit(withdrawnAmount);
}

function reportBalance() {
  console.log(`Name: ${this._name}, balance: ${this._cash}`);
}

function getName() {
  return this._name;
}

function resetDailyAllowance() {
  this._dayTotalWithdrawals = 0;
}

function setDailyAllowance(newAllowance) {
  this._dailyAllowance = newAllowance;
}

function createWallet(name, cash = 0) {
  return {
    _name: name,
    _cash: cash,
    _dailyAllowance: 40,
    _dayTotalWithdrawals: 0,
    deposit,
    withdraw,
    transferInto,
    reportBalance,
    getName,
    resetDailyAllowance,
    setDailyAllowance,
  };
}

function main() {
  const walletJack = createWallet('Jack', 100);
  const walletJoe = createWallet('Joe', 10);
  const walletJane = createWallet('Jane', 20);

  walletJack.setDailyAllowance(50); 
  walletJack.withdraw(30);
  walletJack.withdraw(25); 
  walletJack.resetDailyAllowance(); 
  walletJack.withdraw(25); /

  walletJack.transferInto(walletJoe, 40); 
  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();
}

main();
