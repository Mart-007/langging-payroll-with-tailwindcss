import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { formatThousandAmount } from "./helpers/pureFunctions";

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

  const notify = () =>
    toast.error("Please input salary.", {
      theme: "colored",
      autoClose: 3000,
      hideProgressBar: false,
      background: "none",
    });

  const hanldeSalChange = (e) => {
    const { value } = e.target;
    setSalValue(value);
  };

  const handleClick = () => {
    if (!salValue) {
      notify();
      return;
    }
    setIsClick(true);
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
  const withHoldingTax = (netSal - 20833) * 0.15;
  const netSalAfterTax = netSal - withHoldingTax;

  const totalDeductions = deductions + withHoldingTax;

  const dataSets = [
    {
      deducLabel: "W/H Tax",
      deducValue: formatThousandAmount(withHoldingTax),
      earnLabel: "Basic Pay",
      earnValue: formatThousandAmount(salValue),
    },
    {
      deducLabel: "SSS",
      deducValue: formatThousandAmount(sss),
      earnLabel: "OT Pay",
      earnValue: "0.00",
    },
    {
      deducLabel: "Pag-Ibig",
      deducValue: Number(pagIbig).toFixed(2),
      earnLabel: "Holiday Pay",
      earnValue: "0.00",
    },
    {
      deducLabel: "PhilHealth",
      deducValue: Number(philhealth).toFixed(2),
      earnLabel: "Gross",
      earnValue: "0.00",
    },
    {
      deducLabel: "Total Deductions",
      deducValue: formatThousandAmount(totalDeductions),
      earnLabel: "Total Earnings",
      earnValue: formatThousandAmount(salValue),
    },
    {
      deducLabel: "",
      deducValue: "",
      earnLabel: "Net Pay",
      earnValue: formatThousandAmount(netSalAfterTax),
    },
  ];

  const headerData = ["Deductions", "Amount", "Earnings", "Amount"];

  return (
    <div className="m-5 p-5">
      <div className="flex flex-row justify-between items-center mb-5">
        <div className="text-center text-l font-mono">Langging Payroll</div>
        <div className="text-sm mt-0 font-mono">{formattedDate}</div>
      </div>

      <div className="flex flex-row gap-2 items-center mt-2 border-1 border-indigo-800 mb-2">
        <input
          placeholder="Input salary..."
          type="number"
          value={salValue}
          name="salary"
          className="border rounded-lg border-indigo-400 p-2 w-60 placeholder-slate-500 bg-indigo-200 "
          onChange={(e) => hanldeSalChange(e)}
        />

        <div
          onClick={handleClick}
          className="border-1 rounded-lg hover:bg-indigo-500 border-slate-800 bg-indigo-400 p-2 w-40 text-center text-gray-200"
        >
          Enter
        </div>
        <ToastContainer />
        {isClick && (
          <div
            onClick={handleClear}
            className="border-1 rounded-lg border-slate-800 bg-gray-200 hover:bg-gray-100 p-2 w-40 text-center text-gray-600"
          >
            Clear
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light ">
                <thead className="font-medium bg-indigo-200">
                  <tr>
                    {headerData.map((dataHeader, index) => (
                      <th key={index} scope="col" className="px-6 py-4">
                        {dataHeader}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataSets.map((data, index) => {
                    const lastIndex = index === dataSets.length - 1;
                    const secondToLastIndex = index === dataSets.length - 2;
                    const semiBoldFont =
                      lastIndex || secondToLastIndex
                        ? "font-semibold"
                        : "font-medium";

                    return (
                      <tr
                        key={index}
                        className={`${index} ${
                          lastIndex ? "bg-indigo-200" : ""
                        } dark:border-neutral-500`}
                      >
                        <td
                          className={`${semiBoldFont} whitespace-nowrap px-6 py-4  dark:border-neutral-500`}
                        >
                          {data.deducLabel}
                        </td>
                        <td
                          className={`${semiBoldFont} whitespace-nowrap px-6 py-4  dark:border-neutral-500`}
                        >
                          {isClick ? data.deducValue : "0.00"}
                        </td>
                        <td
                          className={`${semiBoldFont} whitespace-nowrap px-6 py-4  dark:border-neutral-500`}
                        >
                          {data.earnLabel}
                        </td>
                        <td
                          className={`${semiBoldFont} whitespace-nowrap  px-6 py-4  dark:border-neutral-500`}
                        >
                          {isClick ? data.earnValue : "0.00"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
