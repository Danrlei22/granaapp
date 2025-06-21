import { FaMagnifyingGlass } from "react-icons/fa6";

function Entry() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-row p-4 bg-secondary gap-2 w-auto m-4 rounded-lg shadow-lg max-w-2xl">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded w-full"
        />
        <button className="bg-blue-600 text-white p-2 rounded w-auto flex items-center gap-2 active:bg-blue-800 ">
          <FaMagnifyingGlass /> Search
        </button>
      </div>

      <div className="flex flex-row flex-wrap justify-between items-start h-auto p-2 ">
        <div className="flex flex-col items-center justify-center w-auto m-2 p-4 rounded border-box shadow-2xl shadow-tertiary">
          <h1 className="h2-bold box-info mb-4">Entry</h1>
          <div>
            <table className="border border-tertiary w-full text-center">
              <thead className="bg-tertiary text-white">
                <tr>
                  <th className="td-table">ID</th>
                  <th className="td-table">Amount</th>
                  <th className="td-table">Category</th>
                  <th className="td-table">Description</th>
                  <th className="td-table">Date</th>
                </tr>
              </thead>
              <tbody className="bg-green-300 text-black">
                <tr>
                  <td className="td-table">1</td>
                  <td className="td-table">R$ 3.000,00</td>
                  <td className="td-table">Salary</td>
                  <td className="td-table">Monthly salary for September</td>
                  <td className="td-table">2023-09-30</td>
                </tr>
                <tr>
                  <td colSpan={5} className="bg-green-800 text-white">
                    Total month: R$ 3.000,00
                  </td>
                </tr>
                <tr>
                  <td className="td-table">2</td>
                  <td className="td-table">R$ 2.000,00</td>
                  <td className="td-table">Investment</td>
                  <td className="td-table">Return on investment in stocks</td>
                  <td className="td-table">2023-10-01</td>
                </tr>
                <tr>
                  <td className="td-table">3</td>
                  <td className="td-table">R$ 1.500,00</td>
                  <td className="td-table">Freelance</td>
                  <td className="td-table">Payment for freelance work</td>
                  <td className="td-table">2023-10-05</td>
                </tr>
                <tr>
                  <td colSpan={5} className="bg-green-800 text-white">
                    Total month: R$ 3.500,00
                  </td>
                </tr>
                {/*Toda vez q fechar o mes mostrar o total do mes */}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-row w-auto h-[60px] border-box shadow-2xl shadow-tertiary m-2 gap-2">
            <button className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800">Day</button>
            <button className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800">Week</button>
            <button className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800">Month</button>
            <button className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800">Quarter</button>
            <button className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800">Semester</button>
            <button className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800">Year</button>
        </div>
      </div>

      <div className="flex flex-row w-full h-auto p-2">
            <button></button>
      </div>
    </div>
  );
}

export default Entry;
