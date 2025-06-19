function Help() {
  return (
    <div className="w-full ">
      <h1 className="text-3xl font-bold text-center mt-10 mb-5">
        Hello. We are for help
      </h1>
      <div className="max-w-3xl mx-auto px-4">
        <p className="mb-4">
          1 - To add a transaction, click on the "Transaction" menu.
        </p>
        <p className="mb-4">
          {" "}
          2 - Follow your updated balance at the top of the screen.
        </p>
        <p className="mb-4">
          3 - Use the filters to view only entries or exits.
        </p>
      </div>
    </div>
  );
}

export default Help;
