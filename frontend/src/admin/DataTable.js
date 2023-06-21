import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./Table.css";

const Table = ({ rows, deleteRow, editRow, tableHead , tableHeadData}) => {
  const{col1,col2,col3} =tableHeadData
  return (
    <div className="table-wrapper">
      {console.log("tableHead======>", tableHead)}
      {console.log("tableHeadData======>", tableHeadData)}
      {console.log("rows======>", rows)}
      <table className="table">
        <thead>
          <tr>
            <th>{tableHead?.col1}</th>
            <th className="expand">{tableHead?.col2}</th>
            <th>{tableHead?.col3}</th>
            <th>{tableHead?.col4}</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(rows) && rows.length > 0 ? (
            rows.map((row, idx) => (
              <tr key={idx}>
                <td>{row[col1]}</td>
                <td className="expand">{row[col2]}</td>
                <td>{row[col3]}</td>
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
