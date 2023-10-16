import React from "react";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

const ExpenseList = (props) => {
  return (
    <div>
      <ul className="list">
        {props.expenses.map((expense) => {
          return (
            <ExpenseItem
              expense={expense}
              key={expense.id}
              handleDelete={props.handleDelete}
              handleEdit={props.handleEdit}
            />
          );
        })}
      </ul>
      {props.expenses.length > 0 ? (
        <button className="btn" onClick={props.clearItems}>
          목록 지우기
          <MdDelete className="btn-icon" />
        </button>
      ) : null}
    </div>
  );
};

export default ExpenseList;
