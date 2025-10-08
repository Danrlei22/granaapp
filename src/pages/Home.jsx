import { useDispatch, useSelector } from "react-redux";
import graficoDinheiro from "../assets/graficoDinheiro.png";
import { useEffect, useState } from "react";
import { setPhrase } from "../redux/slices/motivationalSlice";
import Loading from "../components/Loading";
import { fetchEntries } from "../redux/slices/entriesSlice";
import { fetchExits } from "../redux/slices/exitsSlice";

function Home() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const phrase = useSelector((state) => state.motivational.phraseCurrent);
  const entries = useSelector((state) => state.entries.data);
  const exits = useSelector((state) => state.exits.data);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      dispatch(setPhrase());
      await dispatch(fetchEntries());
      await dispatch(fetchExits());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const currentMonthEntries = entries.filter((item) => {
    const date = new Date(item.date + "T12:00:00");

    return (
      date.getMonth() + 1 === currentMonth && date.getFullYear() === currentYear
    );
  });

  const currentMonthExits = exits.filter((item) => {
    const date = new Date(item.date + "T12:00:00");

    return (
      date.getMonth() + 1 === currentMonth && date.getFullYear() === currentYear
    );
  });

  const totalEntries = currentMonthEntries.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const totalExits = currentMonthExits.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const totalMonth = totalEntries - totalExits;

  const entriesTransfer = entries.map((item) => ({
    ...item,
    type: "entry",
  }));

  const exitsTransfer = exits.map((item) => ({
    ...item,
    type: "exit",
  }));

  const transfers = [...entriesTransfer, ...exitsTransfer];

  const lastTransfers = transfers
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 7);

  return (
    <div className="flex flex-row flex-wrap justify-center items-center w-full min-w-[340px] text-xs sm:text-base h-auto mb-8 gap-2">
      <div className="flex flex-row flex-wrap justify-center h-auto w-full sm:w-[95%] min-w-[340px] p-0.5 sm:p-2 sm:my-1 md:my-2 sm:pb-6 border-2 sm:border-4 border-primary shadow-xl shadow-primary">
        <div className="bg-primary text-black flex flex-col justify-between items-center mb-4 border-box w-[300px] h-auto shadow-2xl shadow-tertiary">
          <h2 className="h2-bold mb-6">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
            })}
          </h2>

          <div className="box-info mb-4 border-2 border-tertiary p-2 bg-slate-300">
            <p className="font-bold text-xl">Entry</p>
            <p className="text-green-600 font-bold text-xl">
              R${" "}
              {totalEntries.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          <div className="box-info mb-4 border-2 border-tertiary p-2 bg-slate-300">
            <p className="font-bold text-xl">Exit</p>
            <p className="text-red-600 font-bold text-xl">
              R${" "}
              {totalExits.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          <div className="box-info mb-4 border-2 border-tertiary p-2 bg-slate-300">
            <p className="font-bold text-xl">Current balance</p>
            <p className="text-blue-500 font-bold text-xl">
              R${" "}
              {totalMonth.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
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
            <table className="border-2 border-tertiary text-center min-w-[400px] text-black">
              <thead className="bg-tertiary">
                <tr className="text-white">
                  <th className="thead-table">Amount</th>
                  <th className="thead-table">Date</th>
                  <th className="thead-table">Description</th>
                </tr>
              </thead>
              <tbody>
                {lastTransfers.map((item) => (
                  <tr
                    key={item.id}
                    className={`${
                      item.type === "entry" ? "bg-green-300" : "bg-red-300"
                    }`}
                  >
                    <td className="td-table">
                      R${" "}
                      {item.amount.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="td-table">
                      {(() => {
                        const [year, month, day] = item.date.split("-");
                        return `${day}/${month}/${year}`;
                      })()}
                    </td>
                    <td className="td-table">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row gap-4">
            <a href="/entry" className="text-blue-500 font-bold underline">
              See entries
            </a>
            <a href="/exit" className="text-blue-500 font-bold underline">
              See outputs
            </a>
          </div>
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
          <div className="flex justify-center">
            <a href="/graphics" className="text-blue-500 font-bold underline">
              See graphics
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
