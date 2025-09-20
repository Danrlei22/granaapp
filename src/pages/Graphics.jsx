import { FaFilePdf } from "react-icons/fa";

function Graphics() {
  return (
    <main className="flex flex-col items-center w-full min-w-[340px] text-xs sm:text-base mb-20">
      <h1 className="text-4xl font-bold mb-4 text-center my-4">Graphics</h1>

      {/* div container graphics*/}
      <div className="relative flex sm:flex-row flex-col flex-wrap items-center justify-center w-full sm:p-2 p-0 gap-4 sm:pr-[320px] mb-8">
        <div className="border-box p-2 w-[300px] h-[200px] flex flex-col items-center justify-center shadow-2xl shadow-tertiary">
          <h2>Grafico de pizza</h2>

          <div>
            <button className="bg-blue-500 p-0.5 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1">
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>

        <div className="border-box p-2 w-[300px] h-[200px] flex flex-col items-center justify-center shadow-2xl shadow-tertiary">
          <h2>Grafico de barras</h2>

          <div>
            <button className="bg-blue-500 p-0.5 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1">
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>

        <div className="border-box p-2 w-[300px] h-[200px] flex flex-col items-center justify-center shadow-2xl shadow-tertiary">
          <h2>Grafico de linha</h2>

          <div>
            <button className="bg-blue-500 p-0.5 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1">
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>

        <div className="border-box p-2 w-[300px] h-[200px] flex flex-col items-center justify-center shadow-2xl shadow-tertiary">
          <h2>Grafico de Barras horizontais</h2>

          <div>
            <button className="bg-blue-500 p-0.5 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1">
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>
      </div>

      <div className="sm:fixed sm:top-40 sm:right-4 z-40">
        <div className="border-box p-4 w-auto h-auto flex flex-col items-center justify-center">
          <h2 className="font-bold text-xl">Filtro de periodo</h2>

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

      <div className="flex flex-col items-center justify-center mb-8 w-full">
        <button className="bg-blue-500 p-0.5 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1">
          <FaFilePdf /> Export todos PDF
        </button>
      </div>
    </main>
  );
}

export default Graphics;
