import { FaFilePdf } from "react-icons/fa";
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Label,
  LabelList,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import getDateByMonth from "../utils/getDateByMonth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchExits } from "../redux/slices/exitsSlice";
import { fetchEntries } from "../redux/slices/entriesSlice";
import Loading from "../components/Loading";

function Graphics() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.entries.data);
  const exits = useSelector((state) => state.exits.data);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchEntries());
      await dispatch(fetchExits());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  const year = new Date().getFullYear();

  const chartData = getDateByMonth(entries, exits, year);

  return (
    <main className="flex flex-col items-center w-full min-w-[340px] text-xs sm:text-base mb-20 lg:ml-[280px]">
      <h1 className="text-4xl font-bold mb-4 text-center my-4 w-full lg:mr-[280px]">
        Graphics
      </h1>

      {/*Filtros */}
      <div className="lg:fixed lg:top-40 lg:right-2 z-40">
        <div className="border-box sm:p-1 lg:p-4 md:m-0 m-2 w-auto h-auto flex flex-col items-center justify-center">
          <h2 className="font-bold text-xl">Period filter</h2>

          <div className="flex flex-col w-auto h-auto border-2 border-tertiary gap-2 p-2 m-1">
            <button className="bg-green-600 text-white p-2 rounded w-auto h-[30px] flex items-center justify-center active:bg-green-800">
              Quarter
            </button>
            <button className="bg-green-600 text-white p-2 rounded w-auto h-[30px] flex items-center justify-center  active:bg-green-800">
              Semester
            </button>
            <button className="bg-green-600 text-white p-2 rounded w-auto h-[30px] flex items-center justify-center active:bg-green-800">
              Year
            </button>
          </div>
        </div>
      </div>

      {/* div container graphics*/}
      <div className="relative flex md:flex-row flex-col flex-wrap items-center justify-center w-full sm:p-2 p-0 gap-8 lg:pr-[320px] mb-8">
        <div className="border-4 border-tertiary md:p-2 rounded w-auto h-auto flex flex-col items-center justify-center shadow-2xl shadow-tertiary">
          <div className="w-[80%]">
            <h2 className="font-bold sm:text-2xl text-xl box-info text-center">
              Line Chart - Inflows and Outflows per month
            </h2>
          </div>

          <div className="flex max-w-[260px] md:max-w-[450px] h-auto sm:m-2 border-2 border-black overflow-x-auto">
            <div className="min-w-[500px]">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 20, left: 10, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month">
                    <Label value="Month" offset={-40} position="insideBottom" />
                  </XAxis>
                  <YAxis
                    domain={[0, "dataMax"]}
                    tickCount={9}
                    tickFormatter={(value) =>
                      `${value.toLocaleString("pt-BR")}`
                    }
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      `R$ ${value.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}`,
                      name,
                    ]}
                  />
                  <Legend
                    verticalAlign="top"
                    align="center"
                    wrapperStyle={{ padding: 0 }}
                  />
                  <Line
                    type="linear"
                    dataKey="entries"
                    stroke="green"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="exits" stroke="red" />
                  <ReferenceLine
                    y={5000}
                    label={{ value: "Meta", position: "top", fill: "blue" }}
                    stroke="blue"
                    strokeDasharray="3 3"
                  />
                  <Brush dataKey="month" height={20} stroke="blue" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <button className="bg-blue-500 p-0.5 my-4 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1">
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>

        <div className="border-4 border-tertiary md:p-2 rounded w-auto h-auto flex flex-col items-center justify-center shadow-2xl shadow-tertiary">
          <div className="w-[80%]">
            <h2 className="font-bold sm:text-2xl text-xl box-info text-center">
              Bar Chart - Inflows and Outflows per month
            </h2>
          </div>

          <div className="flex max-w-[260px] md:max-w-[450px] h-auto sm:m-2 border-2 border-black overflow-x-auto">
            <div className="min-w-[500px]">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month">
                    <Label value="Month" offset={-40} position="insideBottom" />
                  </XAxis>
                  <YAxis
                    domain={[0, "dataMax"]}
                    tickCount={9}
                    tickFormatter={(value) =>
                      `${value.toLocaleString("pt-BR")}`
                    }
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      `R$ ${value.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}`,
                      name,
                    ]}
                  />
                  <Legend
                    verticalAlign="top"
                    align="center"
                    wrapperStyle={{ padding: 0 }}
                  />
                  <Bar dataKey="entries" fill="green" />
                  <Bar dataKey="exits" fill="red" />
                  <ReferenceLine
                    y={5000}
                    label={{ value: "Meta", position: "top", fill: "blue" }}
                    stroke="blue"
                    strokeDasharray="3 3"
                  />
                  <Brush dataKey="month" height={20} stroke="blue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <button className="bg-blue-500 p-0.5 my-4 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1">
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>

        <div className="border-box p-2 w-[300px] h-[200px] flex flex-col items-center justify-center shadow-2xl shadow-tertiary">
          <h2>Bar Chart</h2>
          <p className="text-center">
            Mostrar entradas e saídas lado a lado por mês.
          </p>
          <div>
            <button className="bg-blue-500 p-0.5 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1">
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>

        <div className="border-box p-2 w-[300px] h-[200px] flex flex-col items-center justify-center shadow-2xl shadow-tertiary">
          <h2>Pie / Donut Chart</h2>
          <p>
            Distribuição por categoria (ex.: alimentação, transporte, lazer,
            etc.)
          </p>
          <div>
            <button className="bg-blue-500 p-0.5 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1">
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>

        <div className="border-box p-2 w-[300px] h-[200px] flex flex-col items-center justify-center shadow-2xl shadow-tertiary">
          <h2>Area Chart</h2>
          <p className="text-center">
            Entradas e saídas acumuladas ao longo do tempo. p/ano
          </p>
          <div>
            <button className="bg-blue-500 p-0.5 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1">
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>

        <div className="border-box p-2 w-[300px] h-[200px] flex flex-col items-center justify-center shadow-2xl shadow-tertiary">
          <h2>Radar Chart</h2>
          <p className="text-center">
            Comparar categorias de gasto em formato radial.
          </p>
          <div>
            <button className="bg-blue-500 p-0.5 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1">
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>

        <div className="border-box p-2 w-[300px] h-[200px] flex flex-col items-center justify-center shadow-2xl shadow-tertiary">
          <h2>Gauge / Radial Progress</h2>
          <p className="text-center">
            Mostrar progresso em relação a uma meta (ex.: economia de 10k no
            ano).
          </p>
          <div>
            <button className="bg-blue-500 p-0.5 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1">
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mb-8 w-full lg:mr-[280px]">
        <button className="bg-blue-500 p-0.5 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1">
          <FaFilePdf /> Export todos PDF
        </button>
      </div>
    </main>
  );
}

export default Graphics;
