import { useDispatch, useSelector } from "react-redux";
import graficoDinheiro from "../assets/graficoDinheiro.png";
import { useEffect } from "react";
import { setPhrase } from "../redux/slices/motivationalSlice";

function Home() {

  const dispatch = useDispatch();
  const phrase = useSelector((state) => state.motivational.phraseCurrent);

  useEffect(() => {
    dispatch(setPhrase());
  }, [dispatch]);

  return (
    <div className="flex flex-row flex-wrap justify-evenly items-center h-auto p-2">
      <div className="flex flex-col justify-between items-center mb-4 border-box w-[300px] h-[250px] shadow-2xl">
        <h2 className="h2-bold">Month</h2>

        <div className="box-info">
          <p className="font-bold text-xl">Current balance:</p>
          <p className="font-bold text-xl">R$ +5.000,00</p>
        </div>

        <div className="box-info">
          <p className="font-bold text-xl">Entry:</p>
          <p className="text-green-600 font-bold text-xl">R$ + 4.000,00</p>
        </div>

        <div className="box-info">
          <p className="font-bold text-xl">Exit:</p>
          <p className="text-red-600 font-bold text-xl">R$ - 1.000,00</p>
        </div>
      </div>

      <div className="flex justify-center items-center border-box w-[400px] h-[250px] shadow-2xl">
        <div className="box-info">
          <h2 className="font-bold text-tertiary text-4xl text-center">Phrase of the day</h2>
          <p className="p-4 text-center italic text-xl font-bold">
            {phrase}
          </p>
        </div>
      </div>

      <div className="border-box shadow-2xl">
        <div>
          <h2 className="h2-bold box-info">Chart of the month</h2>
          <div className="border-solid border-2 border-tertiary ">
            <img
              src={graficoDinheiro}
              className="grafic"
              alt="Gráfico Mensal"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center mb-4 border-box shadow-2xl">
        <div>
          <h2 className="h2-bold box-info">Latest transfers</h2>

          <div className="flex flex-col justify-between items-center">
            <table className="table-auto text-center text-black border-collapse border border-tertiary w-[320px] md:w-[500px] temp">
              <thead className="bg-tertiary">
                <tr className="text-white">
                  <th className="thead-table">Amount</th>
                  <th className="thead-table">Date</th>
                  <th className="thead-table">Description</th>
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

            <a href="/transactions" className="text-blue-500 font-bold underline">
              See all
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
