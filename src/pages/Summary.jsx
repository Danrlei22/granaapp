function Summary() {
  return (
    <div className="flex flex-col items-center w-full min-w-[340px] text-xs sm:text-base h-auto">
      <h1 className="text-center font-bold text-4xl my-4">Summary</h1>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center sm:p-2 p-1">

        
        <div className="flex flex-col items-center justify-center w-auto sm:m-2 m-1 sm:p-4 p-1 rounded shadow-2xl shadow-tertiary border-4 border-tertiary">
          <h2 className="font-bold text-2xl box-info sm:mb-4 mb-2">
            Balance for the month
          </h2>
          <div className="overflow-x-auto w-auto max-w-[320px] sm:max-w-[640px]">
            <table className="border-2 border-tertiary text-center min-w-[400px]">
              <thead className="bg-tertiary text-white">
                <tr>
                  <th className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    Month
                  </th>
                  <th className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    Entry
                  </th>
                  <th className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    Exit
                  </th>
                  <th className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    Maio
                  </td>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    R$ 1000,00
                  </td>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    R$ 500,00
                  </td>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    R$ 500,00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col flex-wrap justify-center items-center sm:p-2 p-1">
          {/* filtro */}
          <div className="flex flex-col items-start justify-center w-auto border-box shadow-2xl shadow-tertiary">
            <h2 className="font-bold pl-2">Period filter:</h2>
            <div className="flex flex-row w-auto h-[60px] border-2 border-tertiary gap-2 p-2 m-1">
              <button className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800">
                Quarter
              </button>
              <button className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800">
                Semester
              </button>
              <button className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800">
                Year
              </button>
            </div>
          </div>
          {/* tooltip nos botoes de data */}

          {/* Destaques do periodo */}
          <div className="flex flex-col justify-between items-center sm:p-4 p-1 mb-4 border-box w-auto h-full shadow-2xl shadow-tertiary">
            <h2 className="h2-bold text-center mb-6">Highlights of the year</h2>

            <div className="box-info mb-4">
              <p className="font-bold text-xl">Bigger balance:</p>
              <p className="font-bold text-xl text-green-600">R$ +5.000,00</p>
              <p>in: febrary</p>
            </div>

            <div className="box-info mb-4">
              <p className="font-bold text-xl">Lowest balance:</p>
              <p className="font-bold text-xl text-red-600">R$ -2.000,00</p>
              <p>in: march</p>
            </div>

            <div className="box-info mb-4">
              <p className="font-bold text-xl">Monthly average</p>
              <div className="flex sm:flex-row flex-col justify-between items-center">
                <p className="font-bold text-base">Entry: </p>
                <p className="text-green-600 font-bold text-xl">
                  R$ + 5.500,00
                </p>
              </div>

              <div className="flex sm:flex-row flex-col justify-between items-center">
                <p className="font-bold text-base">Exit: </p>
                <p className="text-red-600 font-bold text-xl">R$ - 3.500,00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
