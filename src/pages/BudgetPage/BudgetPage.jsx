import { useEffect, useState } from "react";
import "./BudgetPage.css";

const categories = [
  { name: "Food & Drinks", type: "expense", color: "pink", icon: "🍔" },
  { name: "Transport", type: "expense", color: "purple", icon: "🚌" },
  { name: "Shopping", type: "expense", color: "orange", icon: "🛍️" },
  { name: "Entertainment", type: "expense", color: "blue", icon: "🎮" },
  { name: "Other", type: "expense", color: "grey", icon: "💳" },
  { name: "Income", type: "income", color: "green", icon: "💷" },
];

function formatMoney(value) {
  return Number(value).toLocaleString("en-GB");
}

export default function BudgetPage() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("lifeHelperBudget");

    if (savedTransactions) {
      return JSON.parse(savedTransactions);
    }

    return [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newTransaction, setNewTransaction] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food & Drinks",
  });

  useEffect(() => {
    localStorage.setItem("lifeHelperBudget", JSON.stringify(transactions));
  }, [transactions]);

  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);

  const expenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);

  const balance = income - expenses;

  const expenseCategories = categories.filter(
    (category) => category.type === "expense",
  );

  function addTransaction() {
    if (
      newTransaction.title.trim() === "" ||
      newTransaction.amount.trim() === ""
    ) {
      return;
    }

    const transactionToAdd = {
      id: Date.now(),
      title: newTransaction.title,
      amount: Number(newTransaction.amount),
      type: newTransaction.type,
      category:
        newTransaction.type === "income"
          ? "Income"
          : newTransaction.category,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    setTransactions([transactionToAdd, ...transactions]);

    setNewTransaction({
      title: "",
      amount: "",
      type: "expense",
      category: "Food & Drinks",
    });

    setIsModalOpen(false);
  }

  function deleteTransaction(id) {
    setTransactions(transactions.filter((item) => item.id !== id));
  }

  return (
    <main className="budgetPage">
      <header className="budgetHeader">
        <div className="budgetLogo">
          <span>✓</span>
          <p className="budgetLogoText">LifeHelper</p>
        </div>
      </header>

      <section className="budgetTop">
        <div className="budgetTopText">
          <h1 className="budgetTitle">Budget Tracker</h1>
          <p className="budgetSubtitle">Track your income and expenses</p>
        </div>

        <button
          className="addTransactionButton"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="addTransactionIcon">+</span>
          <span>Add</span>
        </button>
      </section>

      <section className="balanceCard">
        <div className="balanceHeader">
          <p>Current Balance</p>
          <span>This Month</span>
        </div>

        <h2 className={balance >= 0 ? "balanceAmount" : "balanceAmount red"}>
          £{formatMoney(balance)}
        </h2>

        <div className="balanceStats">
          <div className="balanceStat">
            <span className="incomeIcon">↗</span>
            <div>
              <p>Income</p>
              <strong className="incomeText">£{formatMoney(income)}</strong>
            </div>
          </div>

          <div className="balanceStat">
            <span className="expenseIcon">↘</span>
            <div>
              <p>Expenses</p>
              <strong className="expenseText">£{formatMoney(expenses)}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="expensesSection">
        <div className="sectionHeader">
          <h3 className="sectionTitle">Expenses</h3>
          <span>{transactions.length} records</span>
        </div>

        <div className="expenseList">
          {expenseCategories.map((category) => {
            const total = transactions
              .filter((item) => item.category === category.name)
              .reduce((sum, item) => sum + item.amount, 0);

            const percent =
              expenses > 0 ? Math.round((total / expenses) * 100) : 0;

            return (
              <div className="expenseItem" key={category.name}>
                <div className={`expenseIconBox ${category.color}`}>
                  {category.icon}
                </div>

                <div className="expenseInfo">
                  <div className="expenseTopLine">
                    <h4>{category.name}</h4>
                    <strong>£{formatMoney(total)}</strong>
                  </div>

                  <div className="expenseProgress">
                    <div
                      className={`expenseProgressFill ${category.color}Fill`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>

                <span className="expensePercent">{percent}%</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="transactionsSection">
        <div className="sectionHeader">
          <h3 className="sectionTitle">Recent Transactions</h3>
        </div>

        <div className="transactionsList">
          {transactions.length === 0 ? (
            <div className="emptyTransactions">
              <h3>No transactions yet</h3>
              <p>Add your first income or expense.</p>
            </div>
          ) : (
            transactions.slice(0, 6).map((transaction) => (
              <div className="transactionItem" key={transaction.id}>
                <div>
                  <h4>{transaction.title}</h4>
                  <p>
                    {transaction.category} • {transaction.date}
                  </p>
                </div>

                <div className="transactionRight">
                  <strong
                    className={
                      transaction.type === "income"
                        ? "incomeText"
                        : "expenseText"
                    }
                  >
                    {transaction.type === "income" ? "+" : "-"} £
                    {formatMoney(transaction.amount)}
                  </strong>

                  <button onClick={() => deleteTransaction(transaction.id)}>
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {isModalOpen && (
        <div className="budgetModalOverlay">
          <div className="budgetModal">
            <div className="budgetModalHeader">
              <div>
                <h2>Add Transaction</h2>
                <p>Add income or expense to your budget.</p>
              </div>

              <button onClick={() => setIsModalOpen(false)}>×</button>
            </div>

            <div className="budgetForm">
              <div className="transactionTypeButtons">
                <button
                  className={
                    newTransaction.type === "expense"
                      ? "typeButton activeExpenseType"
                      : "typeButton"
                  }
                  onClick={() =>
                    setNewTransaction({
                      ...newTransaction,
                      type: "expense",
                      category: "Food & Drinks",
                    })
                  }
                >
                  Expense
                </button>

                <button
                  className={
                    newTransaction.type === "income"
                      ? "typeButton activeIncomeType"
                      : "typeButton"
                  }
                  onClick={() =>
                    setNewTransaction({
                      ...newTransaction,
                      type: "income",
                      category: "Income",
                    })
                  }
                >
                  Income
                </button>
              </div>

              <div className="budgetField">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Example: Groceries"
                  value={newTransaction.title}
                  onChange={(event) =>
                    setNewTransaction({
                      ...newTransaction,
                      title: event.target.value,
                    })
                  }
                />
              </div>

              <div className="budgetField">
                <label>Amount</label>
                <input
                  type="number"
                  placeholder="£0"
                  value={newTransaction.amount}
                  onChange={(event) =>
                    setNewTransaction({
                      ...newTransaction,
                      amount: event.target.value,
                    })
                  }
                />
              </div>

              {newTransaction.type === "expense" && (
                <div className="budgetField">
                  <label>Category</label>

                  <div className="categoryGrid">
                    {expenseCategories.map((category) => (
                      <button
                        key={category.name}
                        className={
                          newTransaction.category === category.name
                            ? "categoryButton activeCategoryButton"
                            : "categoryButton"
                        }
                        onClick={() =>
                          setNewTransaction({
                            ...newTransaction,
                            category: category.name,
                          })
                        }
                      >
                        <span>{category.icon}</span>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="budgetModalActions">
                <button
                  className="cancelBudgetButton"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>

                <button className="saveBudgetButton" onClick={addTransaction}>
                  Add Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}