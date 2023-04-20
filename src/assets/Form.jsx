import React from "react";
import "../App.css";

export default function Form({ handleInput }) {
  return (
    <>
      <form onSubmit={handleInput} className="input-form mt-2">
        <div className="grid grid-flow-row ">
          <div className="mt-1">
            <label htmlFor="inputBox" className="ml-3">
              Enter the amount
            </label>
            <input
              required
              className="ml-16"
              type="text"
              id="inputBox"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            ></input>
          </div>

          <div className="mt-1 flex">
            <label htmlFor="titleBox" className="ml-3">
              Transaction Purpose:
            </label>
            <input
              className="ml-10"
              required
              type="text"
              id="titleBox"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>

          <div className="mt-1 flex">
            <label className="ml-3" htmlFor="titleBox">
              Type of Transaction:
            </label>
            <select
              className="ml-12"
              onChange={(e) => {
                setType(e.target.value);
                console.log(e.target.value);
              }}
            >
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
          </div>

          <div className="mt-1 flex">
            <label className="ml-4" htmlFor="inputDate">
              Date of Transaction
            </label>
            <input
              type="date"
              className="input-date ml-12"
              id="inputDate"
              onChange={(e) => {
                console.log(e.target.value);
                let selectedDate = new Date(e.target.value);

                setDate(
                  `${selectedDate.getDate()}-${
                    selectedDate.getMonth() + 1
                  }-${selectedDate.getFullYear()}`
                );

                console.log(date);
              }}
            ></input>
          </div>
        </div>

        <button className="sumbit-amount ml-5 btn bg-cyan-500">Submit</button>
      </form>
    </>
  );
}
