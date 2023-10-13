import React, { Component } from "react";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

export class ExpenseList extends Component {
  render() {
    return (
      <div>
        <ul className="list">
          {this.props.initialExpenses.map((expense) => {
            return <ExpenseItem expense={expense} key={expense.id} />;
          })}
        </ul>
        <button className="btn">
          목록 지우기
          <MdDelete className="btn-icon" />
        </button>
      </div>
    );
  }
}

export default ExpenseList;
