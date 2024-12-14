class Wallet {
  #name;
  #cash;
  #dailyAllowance;
  #dayTotalWithdrawals;

  constructor(name, cash, dailyAllowance = 40) {
    this.#name = name;
    this.#cash = cash;
    this.#dailyAllowance = dailyAllowance;
    this.#dayTotalWithdrawals = 0;
  }

  get name() {
    return this.#name;
  }

  deposit(amount) {
    this.#cash += amount;
  }

  withdraw(amount) {
    if (this.#cash - amount < 0) {
      console.log(`Insufficient funds!`);
      return 0;
    }

    if (this.#dayTotalWithdrawals + amount > this.#dailyAllowance) {
      console.log(`Daily withdrawal limit exceeded!`);
      return 0;
    }

    this.#cash -= amount;
    this.#dayTotalWithdrawals += amount;
    return amount;
  }

  transferInto(wallet, amount) {
    console.log(
      `Transferring ${amount} from ${this.name} to ${wallet.name}`
    );
    const withdrawnAmount = this.withdraw(amount);
    wallet.deposit(withdrawnAmount);
  }

  reportBalance() {
    console.log(
      `Name: ${this.name}, balance: ${this.#cash}, daily withdrawals: ${this.#dayTotalWithdrawals}`
    );
  }

  resetDailyAllowance() {
    this.#dayTotalWithdrawals = 0;
    console.log(`Daily allowance reset for ${this.name}`);
  }

  setDailyAllowance(newAllowance) {
    this.#dailyAllowance = newAllowance;
    console.log(`New daily allowance for ${this.name}: ${this.#dailyAllowance}`);
  }
}

function main() {
  const walletJack = new Wallet('Jack', 100);
  const walletJoe = new Wallet('Joe', 10);

  walletJack.withdraw(30); 
  walletJack.withdraw(20); 
  walletJack.reportBalance();

  walletJack.resetDailyAllowance();
  walletJack.withdraw(20);

  walletJack.setDailyAllowance(60);
  walletJack.withdraw(40); 

  walletJack.reportBalance();
}

main();
