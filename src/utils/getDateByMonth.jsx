function getDateByMonth(entries, exits, year) {
  const yearInt = parseInt(year);

  const filteredEntries = entries.filter(
    (e) => new Date(e.date + "T12:00:00").getFullYear() === yearInt
  );
  const filteredExits = exits.filter(
    (e) => new Date(e.date + "T12:00:00").getFullYear() === yearInt
  );

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const data = months.map((month) => {
    const entriesSum = filteredEntries
      .filter((e) => {
        const date = new Date(e.date + "T12:00:00");
        return (
          date.getMonth() + 1 === month && date.getFullYear() === parseInt(year)
        );
      })
      .reduce((acc, e) => acc + e.amount, 0);

    const exitsSum = filteredExits
      .filter((e) => {
        const date = new Date(e.date + "T12:00:00");
        return (
          date.getMonth() + 1 === month && date.getFullYear() === parseInt(year)
        );
      })
      .reduce((acc, e) => acc + e.amount, 0);

    const monthNames =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return {
      month: monthNames[month - 1],
      year: yearInt,
      entries: entriesSum,
      exits: exitsSum,
      total: entriesSum - exitsSum,
    };
  });

  return data;
}

export default getDateByMonth;
