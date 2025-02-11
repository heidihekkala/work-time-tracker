import * as XLSX from "xlsx";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

const ExportToExcel = ({ entries }) => {
  const exportToExcel = () => {
    if (entries.length === 0) return;

    // 1️⃣ Ryhmitellään työnantajan mukaan
    const groupedData = entries.reduce((acc, entry) => {
      if (!acc[entry.employer]) acc[entry.employer] = [];
      acc[entry.employer].push(entry);
      return acc;
    }, {});

    // 2️⃣ Luodaan tyhjä lista kaikista riveistä
    let allData = [];

    Object.keys(groupedData).forEach((employer, index) => {
      if (index > 0) {
        // 3️⃣ Lisää kaksi tyhjää riviä työnantajien väliin
        allData.push({});
        allData.push({});
      }

      // 4️⃣ Lisää työnantajan nimi otsikoksi
      allData.push({ Päivämäärä: employer, Aloitusaika: "", Lopetusaika: "", Tunnit: "" });

      // 5️⃣ Järjestetään työnantajan tiedot päivämäärän mukaan
      const sortedEntries = groupedData[employer].sort(
        (a, b) => new Date(a.startTime) - new Date(b.startTime)
      );

      // 6️⃣ Muutetaan JSON-data Excel-yhteensopivaksi
      sortedEntries.forEach((entry) => {
        allData.push({
          Päivämäärä: new Date(entry.startTime).toLocaleDateString(),
          Aloitusaika: new Date(entry.startTime).toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" }),
          Lopetusaika: entry.endTime ? new Date(entry.endTime).toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" }) : "",
          Tunnit: entry.hours ? entry.hours : "",
        });
      });
    });

    // 7️⃣ Muodostetaan Excel-taulukko
    const worksheet = XLSX.utils.json_to_sheet(allData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Työtunnit");

    // 8️⃣ Tallennetaan tiedosto
    XLSX.writeFile(workbook, "tyotunnit.xlsx");
  };

  return (
    <Button
      variant="contained"
      size="large"
      onClick={exportToExcel}
      style={{ backgroundColor: "rgb(0, 123, 255)", marginTop: "1em" }}
      disabled={entries.length === 0}
    >
      Vie Exceliin
    </Button>
  );
};

// PropTypes määrittely
ExportToExcel.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      employer: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string,
      hours: PropTypes.string,
    })
  ).isRequired,
};

export default ExportToExcel;
