import { useDispatch, useSelector } from "react-redux";
import graficoDinheiro from "../assets/graficoDinheiro.png";
import { useEffect, useState } from "react";
import { setPhrase } from "../redux/slices/motivationalSlice";
import Loading from "../components/Loading";

function Home() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const phrase = useSelector((state) => state.motivational.phraseCurrent);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      dispatch(setPhrase());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-row flex-wrap justify-center items-center w-full min-w-[340px] text-xs sm:text-base h-auto mb-8 gap-2">
      <div className="bg-primary text-black flex flex-col justify-between items-center mb-4 border-box w-[300px] h-auto shadow-2xl shadow-tertiary">
        <h2 className="h2-bold mb-6">Month current</h2>

        <div className="box-info mb-4 border-2 border-tertiary p-2 bg-slate-300">
          <p className="font-bold text-xl">Entry</p>
          <p className="text-green-600 font-bold text-xl">R$ 4.000,00</p>
        </div>

        <div className="box-info mb-4 border-2 border-tertiary p-2 bg-slate-300">
          <p className="font-bold text-xl">Exit</p>
          <p className="text-red-600 font-bold text-xl">R$ -1.000,00</p>
        </div>

        <div className="box-info mb-4 border-2 border-tertiary p-2 bg-slate-300">
          <p className="font-bold text-xl">Current balance</p>
          <p className="text-blue-500 font-bold text-xl">R$ 5.000,00</p>
        </div>
      </div>

      <div className="flex justify-center items-center border-box w-auto max-w-[350px] h-auto shadow-2xl shadow-tertiary">
        <div className="box-info">
          <h2 className="font-bold text-tertiary text-4xl text-center">
            Phrase of the day
          </h2>
          <p className="p-4 text-center italic text-xl font-bold">{phrase}</p>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center mb-4 border-box shadow-2xl shadow-tertiary">
        <h2 className="h2-bold box-info mb-6">Latest transfers</h2>

        <div className="overflow-x-auto w-auto max-w-[320px] sm:max-w-[640px] text-center">
          <table className="border-2 border-tertiary text-center min-w-[400px]">
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
        </div>
        <a href="/summary" className="text-blue-500 font-bold underline">
          See all
        </a>
      </div>

      <div className="border-box shadow-2xl shadow-tertiary">
        <div>
          <h2 className="h2-bold box-info mb-6">Chart of the month</h2>
          <div className="border-solid border-2 border-tertiary ">
            <img
              src={graficoDinheiro}
              className="grafic"
              alt="Gráfico Mensal"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
