import React from 'react';
import { Link } from 'react-router-dom';

const TableBody = ({ data, columns }) => {
  return (
    <div className="TableBody">
      {data.map(data => (
        <Link to={`/employees/${data.id}`} key={data.id} className="TableRow">
          {columns.map(column => (
            <div className="TableCol" key={column.title + data.id}>
              <p>{data[column.title]}</p>
            </div>
          ))}
        </Link>
      ))}
    </div>
  );
};

export default TableBody;
