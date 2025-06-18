import graficoDinheiro from "../assets/graficoDinheiro.png";

function Home() {
  return (
    <div className="flex flex-row flex-wrap justify-evenly items-center h-auto p-2">
      <div className="flex flex-col justify-between items-center mb-4 border-box w-[300px] h-[250px]">
        <h2 className="h2-bold">Month</h2>

        <div className="box-info">
          <p className="font-bold">Current balance:</p>
          <p>R$ + 5.000,00</p>
        </div>

        <div className="box-info">
          <p className="font-bold">Entry:</p>
          <p className="text-green-600">R$ + 4.000,00</p>
        </div>

        <div className="box-info">
          <p className="font-bold">Exit:</p>
          <p className="text-red-600">R$ - 1.000,00</p>
        </div>
      </div>

      <div className="flex justify-center items-center border-box w-[300px] h-[250px]">
        <div className="box-info">
          <h2 className="h2-bold">Phrase of the day</h2>
          <p className="p-4 text-center italic">
            Saving today is investing in your tomorrow.
          </p>
          {/* Fazer um array de frases motivacionais e exibir uma aleatória */}
        </div>
      </div>

      <div className="border-box">
        <div>
          <h2 className="h2-bold box-info">Chart of the month</h2>
          <div className="border-solid border-2 border-primary ">
            <img
              src={graficoDinheiro}
              className="grafic"
              alt="Gráfico Mensal"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center mb-4 border-box">
        <div>
          <h2 className="h2-bold box-info">Latest transfers</h2>

          <div className="flex flex-col justify-between items-center">
            <table className="table-auto text-center text-black border-collapse border border-primary w-[340px] md:w-[500px] temp">
              <thead className="bg-primary">
                <tr>
                  <th className="thead-table">Value</th>
                  <th className="thead-table">Date</th>
                  <th className="thead-table">Descripition</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-300">
                  <td className="td-table">+ 1000,00</td>
                  <td className="td-table">10/10/2023</td>
                  <td className="td-table">Transferência</td>
                </tr>
                <tr className="bg-red-300">
                  <td className="td-table">- 1000,00</td>
                  <td className="td-table">10/10/2023</td>
                  <td className="td-table">Aluguel</td>
                </tr>
                <tr className="bg-red-300">
                  <td className="td-table">- 500,00</td>
                  <td className="td-table">10/10/2023</td>
                  <td className="td-table">Luz</td>
                </tr>
                <tr className="bg-green-300">
                  <td className="td-table">+ 10000,00</td>
                  <td className="td-table">10/10/2023</td>
                  <td className="td-table">Transferência</td>
                </tr>
                <tr className="bg-red-300">
                  <td className="td-table">- 200,00</td>
                  <td className="td-table">10/10/2023</td>
                  <td className="td-table">Mercado</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
