import React from "react";

const Holdings = () => {
  return (
    <>
      <h3 className="title">Holdings</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>RELIANCE</td>
              <td>10</td>
              <td>2,500.00</td>
              <td>2,700.00</td>
              <td>27,000.00</td>
              <td className="profit">+2,000.00</td>
              <td className="profit">+8.00%</td>
              <td className="profit">+2.50%</td>
            </tr>

            <tr>
              <td>TCS</td>
              <td>5</td>
              <td>3,200.00</td>
              <td>3,100.00</td>
              <td>15,500.00</td>
              <td className="loss">-500.00</td>
              <td className="loss">-3.12%</td>
              <td className="loss">-1.20%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>29,875.55</h5>
          <p>Total investment</p>
        </div>

        <div className="col">
          <h5>31,428.95</h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5 className="profit">
            1,553.40 (+5.20%)
          </h5>
          <p>P&amp;L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;