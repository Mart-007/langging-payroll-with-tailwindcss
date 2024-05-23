import { useState } from "react";

function App() {
  const currentDate = new Date();
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Manila",
  };
  const formattedDate = currentDate.toLocaleDateString("en-PH", options);

  const [salValue, setSalValue] = useState("");
  const [isClick, setIsClick] = useState(false);

  const hanldeSalChange = (e) => {
    const { value } = e.target;
    setSalValue(value);
  };

  const handleClear = () => {
    setIsClick(false);
    setSalValue("");
  };

  const sss = 1350;
  const pagIbig = 200;
  const philhealth = 875;
  const deductions = sss + pagIbig + philhealth;
  const netSal = !salValue ? 0 : salValue - deductions;

  return (
    <div className="border-2 border-slate-400 m-5 p-5">
      <div className="text-center text-xl">Langging Payroll</div>
      <div className="text-sm">
        <span className="font-bold">as of</span> {formattedDate}
      </div>
      <div className="flex flex-col gap-2 items-center mt-2 border-1 border-indigo-800">
        <input
          placeholder="Input salary"
          type="number"
          value={salValue}
          name="salary"
          className="bg-slate-100 p-2 w-60"
          onChange={(e) => hanldeSalChange(e)}
        />
        <div
          onClick={() => setIsClick(true)}
          className="border-1 border-slate-800 bg-green-50 p-2 w-60 text-center"
        >
          Enter
        </div>
        <div
          onClick={handleClear}
          className="border-1 border-slate-800 bg-red-50 p-2 w-60 text-center"
        >
          Clear
        </div>
      </div>
      <div>SSS: {isClick && sss}</div>
      <div>Pag-Ibig: {isClick && pagIbig}</div>
      <div>PhilHealth: {isClick && philhealth}</div>
      <div>net: {isClick && netSal}</div>
    </div>
  );
}

export default App;
