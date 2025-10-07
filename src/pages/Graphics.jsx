import { FaFilePdf } from "react-icons/fa";
import {
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadarChart,
  AreaChart,
  PieChart,
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Pie,
  Cell,
  Area,
  Radar,
} from "recharts";
import getDateByMonth from "../utils/getDateByMonth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { fetchExits } from "../redux/slices/exitsSlice";
import { fetchEntries } from "../redux/slices/entriesSlice";
import Loading from "../components/Loading";
import exportChartToPDF from "../utils/exportChartToPDF";

function Graphics() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.entries.data);
  const exits = useSelector((state) => state.exits.data);
  const lineChartRef = useRef();
  const barChartRef = useRef();
  const pieEntriesCategoryRef = useRef();
  const pieExitsCategoryRef = useRef();
  const areaEntriesRef = useRef();
  const areaExitsRef = useRef();
  const areaEntriesAndExitsRef = useRef();
  const radarEntriesCategoryRef = useRef();
  const radarExitsCategoryRef = useRef();

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

  const getCategoryEntriesByData = (entries, year) => {
    const yearInt = parseInt(year);

    const filteredEntries = entries.filter(
      (e) => new Date(e.date + "T12:00:00").getFullYear() === yearInt
    );

    const grouped = {};

    filteredEntries.forEach((entry) => {
      if (!grouped[entry.category]) {
        grouped[entry.category] = 0;
      }
      grouped[entry.category] += entry.amount;
    });

    const chartData = Object.entries(grouped).map(([category, amount]) => ({
      name: category,
      value: amount,
    }));

    return chartData;
  };

  const colorsEntries = [
    "#2E8B57", // verde (salário)
    "#4682B4", // azul aço
    "#20B2AA", // teal
    "#1E90FF", // azul vivo
    "#00CED1", // turquesa
    "#6A5ACD", // roxo suave
  ];

  const getCatergoryExitsByData = (exits, year) => {
    const yearInt = parseInt(year);

    const filteredExits = exits.filter(
      (e) => new Date(e.date + "T12:00:00").getFullYear() === yearInt
    );

    const grouped = {};

    filteredExits.forEach((exits) => {
      if (!grouped[exits.category]) {
        grouped[exits.category] = 0;
      }
      grouped[exits.category] += exits.amount;
    });

    const chartData = Object.entries(grouped).map(([category, amount]) => ({
      name: category,
      value: amount,
    }));

    return chartData;
  };

  const colorsExits = [
    "#FA9510", // laranja forte
    "#FF6347", // tomate
    "#D9C03F", // dourado (dinheiro saindo)
    "#FF69B4", // rosa choque
    "#DD783C", // vermelho carmesim
    "#FF8C00", // laranja escuro
  ];

  const getYearlyEntriesData = (entries) => {
    const grouped = {};

    entries.forEach((entry) => {
      const year = new Date(entry.date).getFullYear();
      if (!grouped[year]) {
        grouped[year] = 0;
      }
      grouped[year] += entry.amount;
    });

    const year = Object.keys(grouped).map(Number);
    const minYear = Math.min(...year);
    const maxYear = Math.max(...year);

    const result = [];

    for (let year = minYear; year <= maxYear; year++) {
      result.push({
        name: year,
        value: grouped[year] || 0,
      });
    }

    return result;
  };

  const getYearlyExitsData = (exits) => {
    const grouped = {};

    exits.forEach((exit) => {
      const year = new Date(exit.date).getFullYear();
      if (!grouped[year]) {
        grouped[year] = 0;
      }
      grouped[year] += exit.amount;
    });

    const year = Object.keys(grouped).map(Number);
    const minYear = Math.min(...year);
    const maxYear = Math.max(...year);

    const result = [];

    for (let year = minYear; year <= maxYear; year++) {
      result.push({
        name: year,
        value: grouped[year] || 0,
      });
    }

    return result;
  };

  const getYeatlyEntriesAndExits = (entries, exits) => {
    const groupedEntries = {};
    const groupedExits = {};

    entries.forEach((entry) => {
      const year = new Date(entry.date).getFullYear();
      if (!groupedEntries[year]) {
        groupedEntries[year] = 0;
      }
      groupedEntries[year] += entry.amount;
    });

    exits.forEach((exit) => {
      const year = new Date(exit.date).getFullYear();
      if (!groupedExits[year]) {
        groupedExits[year] = 0;
      }
      groupedExits[year] += exit.amount;
    });

    const allYears = new Set(
      [...Object.keys(groupedEntries), ...Object.keys(groupedExits)].map(
        (year) => Number(year)
      )
    );

    return Array.from(allYears)
      .map((year) => ({
        name: Number(year),
        entries: groupedEntries[year] || 0,
        exits: groupedExits[year] || 0,
      }))
      .sort((a, b) => a.name - b.name);
  };

  return (
    <main className="flex flex-col items-center w-full min-w-[340px] text-xs sm:text-base mb-20">
      <h1 className="text-4xl font-bold mb-4 text-center my-4 w-full">
        Graphics
      </h1>

      {/* div container graphics*/}
      <div className="relative flex md:flex-row flex-col flex-wrap items-center justify-center w-full sm:p-2 p-0 gap-8 mb-8">
        <div className="border-4 border-tertiary md:p-2 rounded w-auto h-auto flex flex-col items-center justify-center shadow-2xl shadow-tertiary">
          <div className="w-[80%]">
            <h2 className="font-bold sm:text-2xl text-xl box-info text-center m-2">
              Line chart - Monthly Inflows and Outflows – Current Year
            </h2>
          </div>

          <div className="flex max-w-[350px] md:max-w-[450px] h-auto sm:m-2 border-2 border-black overflow-x-auto bg-slate-100">
            <div ref={lineChartRef} className="min-w-[500px] ">
              <ResponsiveContainer width="95%" height={400}>
                <LineChart
                  data={getDateByMonth(entries, exits, year)}
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
            <button
              onClick={() => {
                exportChartToPDF(
                  lineChartRef,
                  "Line_Chart_Current_Year.pdf",
                  "Monthly Inflows and Outflows – Current Year"
                );
              }}
              className="bg-blue-500 p-0.5 my-4 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1"
            >
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>

        <div className="border-4 border-tertiary md:p-2 rounded w-auto h-auto flex flex-col items-center justify-center shadow-2xl shadow-tertiary">
          <div className="w-[80%]">
            <h2 className="font-bold sm:text-2xl text-xl box-info text-center">
              Bar Chart - Monthly Inflows and Outflows – Current Year
            </h2>
          </div>

          <div className="flex max-w-[350px] md:max-w-[450px] h-auto sm:m-2 border-2 border-black overflow-x-auto bg-slate-100">
            <div ref={barChartRef} className="min-w-[500px] ">
              <ResponsiveContainer width="95%" height={400}>
                <BarChart
                  data={getDateByMonth(entries, exits, year)}
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
            <button
              onClick={() => {
                exportChartToPDF(
                  barChartRef,
                  "Bar_chart_Current_Year.pdf",
                  "Monthly Inflows and Outflows – Current Year"
                );
              }}
              className="bg-blue-500 p-0.5 my-4 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1"
            >
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>

        <div className="border-4 border-tertiary md:p-2 rounded w-auto h-auto flex flex-col items-center justify-center shadow-2xl shadow-tertiary">
          <div className="w-[80%]">
            <h2 className="font-bold sm:text-2xl text-xl box-info text-center">
              Pie Chart - Entries by category - Current Year
            </h2>
          </div>

          <div className="flex max-w-[350px] md:max-w-[450px] h-auto sm:m-2 border-2 border-black overflow-x-auto bg-slate-100">
            <div ref={pieEntriesCategoryRef} className="min-w-[500px]">
              <ResponsiveContainer width="95%" height={350}>
                <PieChart>
                  <Pie
                    data={getCategoryEntriesByData(entries, year)}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {getCategoryEntriesByData(entries, year).map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={colorsEntries[index % colorsEntries.length]}
                        />
                      )
                    )}
                  </Pie>
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
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                getCategoryEntriesByData(entries, year).length > 0 &&
                  exportChartToPDF(
                    pieEntriesCategoryRef,
                    "Pie_Chart_Entries_categories.pdf",
                    "Entries by category - Current Year"
                  );
              }}
              className="bg-blue-500 p-0.5 my-4 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1"
            >
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>

        <div className="border-4 border-tertiary md:p-2 rounded w-auto h-auto flex flex-col items-center justify-center shadow-2xl shadow-tertiary">
          <div className="w-[80%]">
            <h2 className="font-bold sm:text-2xl text-xl box-info text-center">
              Pie Chart - Exits by category - Current Year
            </h2>
          </div>

          <div className="flex max-w-[350px] md:max-w-[450px] h-auto sm:m-2 border-2 border-black overflow-x-auto bg-slate-100">
            <div ref={pieExitsCategoryRef} className="min-w-[500px]">
              <ResponsiveContainer width="95%" height={400}>
                <PieChart>
                  <Pie
                    data={getCatergoryExitsByData(exits, year)}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {getCatergoryExitsByData(exits, year).map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={colorsExits[index % colorsExits.length]}
                        />
                      )
                    )}
                  </Pie>
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
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                getCatergoryExitsByData(exits, year).length > 0 &&
                  exportChartToPDF(
                    pieExitsCategoryRef,
                    "Pie_Chart_Exits_Categories.pdf",
                    "Exits by category - Current Year"
                  );
              }}
              className="bg-blue-500 p-0.5 my-4 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1"
            >
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>

        <div className="border-4 border-tertiary md:p-2 rounded w-auto h-auto flex flex-col items-center justify-center shadow-2xl shadow-tertiary">
          <div className="w-[80%]">
            <h2 className="font-bold sm:text-2xl text-xl box-info text-center">
              Area Chart - Annual entries
            </h2>
          </div>

          <div className="flex max-w-[350px] md:max-w-[450px] h-auto sm:m-2 border-2 border-black overflow-x-auto bg-slate-100">
            <div ref={areaEntriesRef} className="min-w-[500px]">
              <ResponsiveContainer width="95%" height={400}>
                <AreaChart
                  data={getYearlyEntriesData(entries)}
                  margin={{ top: 10, right: 10, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
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
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="green"
                    fill="green"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                exportChartToPDF(
                  areaEntriesRef,
                  "Area_Chart_Entries.pdf",
                  "Annual entries"
                );
              }}
              className="bg-blue-500 p-0.5 my-4 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1"
            >
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>

        <div className="border-4 border-tertiary md:p-2 rounded w-auto h-auto flex flex-col items-center justify-center shadow-2xl shadow-tertiary">
          <div className="w-[80%]">
            <h2 className="font-bold sm:text-2xl text-xl box-info text-center">
              Area Chart - Annual exits
            </h2>
          </div>

          <div className="flex max-w-[350px] md:max-w-[450px] h-auto sm:m-2 border-2 border-black overflow-x-auto bg-slate-100">
            <div ref={areaExitsRef} className="min-w-[500px]">
              <ResponsiveContainer width="95%" height={400}>
                <AreaChart
                  data={getYearlyExitsData(exits)}
                  margin={{ top: 10, right: 10, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
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
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="red"
                    fill="red"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                exportChartToPDF(
                  areaExitsRef,
                  "Area_Chart_Exits.pdf",
                  "Annual exits"
                );
              }}
              className="bg-blue-500 p-0.5 my-4 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1"
            >
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>

        <div className="border-4 border-tertiary md:p-2 rounded w-auto h-auto flex flex-col items-center justify-center shadow-2xl shadow-tertiary">
          <div className="w-[80%]">
            <h2 className="font-bold sm:text-2xl text-xl box-info text-center">
              Area Chart - Annual entries and exits
            </h2>
          </div>

          <div className="flex max-w-[350px] md:max-w-[450px] h-auto sm:m-2 border-2 border-black overflow-x-auto bg-slate-100">
            <div ref={areaEntriesAndExitsRef} className="min-w-[500px]">
              <ResponsiveContainer width="95%" height={400}>
                <AreaChart
                  data={getYeatlyEntriesAndExits(entries, exits)}
                  margin={{ top: 10, right: 20, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
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
                  <Area
                    type="monotone"
                    dataKey="entries"
                    stroke="green"
                    fill="green"
                    fillOpacity={0.5}
                  />
                  <Area
                    type="monotone"
                    dataKey="exits"
                    stroke="red"
                    fill="red"
                    fillOpacity={0.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                exportChartToPDF(
                  areaEntriesAndExitsRef,
                  "Area_Chart_Entries_and_Exits.pdf",
                  "Annual entries and exits"
                );
              }}
              className="bg-blue-500 p-0.5 my-4 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1"
            >
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>

        <div className="border-4 border-tertiary md:p-2 rounded w-auto h-auto flex flex-col items-center justify-center shadow-2xl shadow-tertiary">
          <div className="w-[80%]">
            <h2 className="font-bold sm:text-2xl text-xl box-info text-center">
              Radar Chart - Entries by category - Current Year
            </h2>
          </div>

          <div className="flex max-w-[350px] md:max-w-[450px] h-auto sm:m-2 border-2 border-black overflow-x-auto bg-slate-100">
            <div ref={radarEntriesCategoryRef} className="min-w-[500px]">
              <ResponsiveContainer width="95%" height={400}>
                <RadarChart
                  data={getCategoryEntriesByData(entries, year)}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis />
                  <Radar
                    dataKey="value"
                    name="Entries"
                    stroke="green"
                    fill="green"
                    fillOpacity={0.5}
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
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                exportChartToPDF(
                  radarEntriesCategoryRef,
                  "Radar_Chart_Entries_Categories.pdf",
                  "Entries by category - Current Year"
                );
              }}
              className="bg-blue-500 p-0.5 my-4 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1"
            >
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>

        <div className="border-4 border-tertiary md:p-2 rounded w-auto h-auto flex flex-col items-center justify-center shadow-2xl shadow-tertiary">
          <div className="w-[80%]">
            <h2 className="font-bold sm:text-2xl text-xl box-info text-center">
              Radar Chart - Exits by category - Current Year
            </h2>
          </div>

          <div className="flex max-w-[350px] md:max-w-[450px] h-auto sm:m-2 border-2 border-black overflow-x-auto bg-slate-100">
            <div ref={radarExitsCategoryRef} className="min-w-[500px]">
              <ResponsiveContainer width="95%" height={400}>
                <RadarChart
                  data={getCatergoryExitsByData(exits, year)}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis />
                  <Radar
                    dataKey="value"
                    name="Entries"
                    stroke="red"
                    fill="red"
                    fillOpacity={0.5}
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
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                exportChartToPDF(
                  radarExitsCategoryRef,
                  "Radar_Chart_Exits_Categories.pdf",
                  "Exits by category - Current Year"
                );
              }}
              className="bg-blue-500 p-0.5 my-4 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1"
            >
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mb-8 w-full">
        <button
          onClick={() => {}}
          className="bg-blue-500 p-0.5 rounded w-auto h-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1 text-4xl"
        >
          <FaFilePdf /> Export todos PDF
        </button>
      </div>
    </main>
  );
}

export default Graphics;
