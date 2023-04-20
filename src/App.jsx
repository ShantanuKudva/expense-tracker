import { useState, useEffect } from "react";
import "./App.css";
import ExpensesPieChart from "./assets/ExpensesPieChart";
import Form from "./assets/Form";

export default function App() {
  let [creditTotal, setCreditTotal] = useState([]);
  let [debitTotal, setDebitTotal] = useState([]);
  const [total, setTotal] = useState(0);
  const [details, setDetails] = useState([]);
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("Credit");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");

  let credits, debits;

  const handleInput = (e) => {
    e.preventDefault();

    const amountNumber = parseFloat(amount);

    setDetails((currentDetails) => {
      return [
        ...currentDetails,
        {
          id: crypto.randomUUID(),
          amount: parseFloat(amount),
          type: type,
          date: date,
          title: title,
        },
      ];
    });
  };

  function deleteItem(id) {
    setDetails((currentDetails) => {
      return currentDetails.filter((detail) => detail.id !== id);
    });
  }

  //update the total amount

  useEffect(() => {
    credits = details.filter((detail) => detail.type === "Credit");
    debits = details.filter((detail) => detail.type === "Debit");

    setCreditTotal(credits.reduce((total, detail) => total + detail.amount, 0));
    setDebitTotal(debits.reduce((total, detail) => total + detail.amount, 0));
  }, [details]);

  useEffect(() => {
    let totalAmount = creditTotal + debitTotal;
    setTotal(totalAmount);
    // console.log(totalAmount);
  }, [creditTotal, debitTotal]);

  return (
    <>
      <nav className="border border-black ">
        <h1 className="text-center text-xl font-bold font m-6">
          Expense Tracker
        </h1>
      </nav>

      {/* User Info */}

      <div className="main-page">
        <div className="border border-gray-300 rounded-lg shadow-xl mx-2">
          <h2 className="info-div">Your total transaction for today is</h2>
          <h1
            className={`text-center text-3xl m-10 ${
              total >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {total}/-
          </h1>
          <div className="credit-debit-div">
            <h3 className="text-center">
              Total Credit Expenses:
              <span className="text-green-500 text-2xl ">{creditTotal}/-</span>
            </h3>
            <h3 className="text-center">
              Total Debit Expenses:
              <span className="text-red-500 text-2xl">{debitTotal}/-</span>
            </h3>
          </div>
        </div>

        <div className="input-form">
          {/* form */}
          <form onSubmit={handleInput} className=" mt-2">
            <div className="grid grid-flow-row gap-3">
              <div className="mt-1 div-1">
                <label htmlFor="inputBox" className="mx-4">
                  Enter the amount
                </label>
                <input
                  required
                  className="mx-10"
                  type="text"
                  id="inputBox"
                  value={amount}
                  onInput={(e) => {
                    if (e.target.value < 0) {
                      setType("Debit");
                    } else {
                      setType("Credit");
                    }

                    setAmount(e.target.value);
                  }}
                ></input>
              </div>

              <div className="mt-1 div-1">
                <label htmlFor="titleBox" className="mx-4">
                  Transaction Purpose:
                </label>
                <input
                  className="mx-10"
                  required
                  type="text"
                  id="titleBox"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>

              <div className="mt-1 div-1">
                <label className="mx-4 " htmlFor="inputDate">
                  Date of Transaction
                </label>
                <input
                  type="date"
                  className="input-date mx-12"
                  id="inputDate"
                  onChange={(e) => {
                    console.log(e.target.value);
                    let selectedDate = new Date(e.target.value);

                    setDate(
                      `${selectedDate.getDate()}-${
                        selectedDate.getMonth() + 1
                      }-${selectedDate.getFullYear()}`
                    );

                    // console.log(date);
                  }}
                ></input>
              </div>
            </div>

            <button className="sumbit-amount ml-5 mt-5 btn bg-cyan-500">
              Submit
            </button>
          </form>
        </div>

        <div className="border border-gray-300 rounded-lg shadow-xl h-72 flex justify-center p-5 mr-4">
          <ExpensesPieChart
            creditAmount={creditTotal}
            debitAmount={debitTotal}
          />
        </div>
      </div>

      {/* //display the expense */}

      <ul className="expense-section">
        <h2 className="text-center m-3 text-3xl">
          {details.length === 0 ? "No Transactions" : "Your Transactions"}
        </h2>
        <div className="transaction-list">
          {details.map((detail) => {
            return (
              <div
                className={`p-5 ${
                  detail.type === "Credit" ? "credit-class" : "debit-class"
                }`}
              >
                <li key={detail.id} className="transaction-info m-2">
                  <h2 className="text-center text-3xl p-2 ">
                    {detail.amount}/-
                  </h2>
                  <h3 className="text-xl">Title : {detail.title}</h3>
                  <p>Transaction type : {detail.type}</p>
                  <p>Date of Transaction: {detail.date}</p>
                  <button
                    onClick={() => deleteItem(detail.id)}
                    className={`delete-item border text-red-600 font-bold`}
                  >
                    Delete
                  </button>
                </li>
              </div>
            );
          })}
        </div>
      </ul>

      <footer>
        <p className="m-5 text-slate-500">Made with ❤ by Shantanu</p>
      </footer>
    </>
  );
}
