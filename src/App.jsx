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
                <thead className="font-medium ">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Deductions
                    </th>
                    <th
                      scope="col"
                      className=" px-6 py-4 dark:border-neutral-500"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 dark:border-neutral-500"
                    >
                      Earnings
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=" dark:border-neutral-500 bg-indigo-400">
                    <td className="whitespace-nowrap px-6 py-4 font-medium dark:border-neutral-500">
                      SSS
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 dark:border-neutral-500">
                      {isClick ? formatThousandAmount(sss) : "0.00"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 dark:border-neutral-500">
                      OT Pay
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{"0.00"}</td>
                  </tr>
                  <tr className=" dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium dark:border-neutral-500">
                      Pag-Ibig
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 dark:border-neutral-500">
                      {isClick ? Number(pagIbig).toFixed(2) : "0.00"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 dark:border-neutral-500">
                      Holiday Pay
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{"0.00"}</td>
                  </tr>
                  <tr className=" dark:border-neutral-500 bg-indigo-400">
                    <td className="whitespace-nowrap px-6 py-4 font-medium dark:border-neutral-500">
                      PhilHealth
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium dark:border-neutral-500">
                      {isClick ? Number(philhealth).toFixed(2) : "0.00"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium dark:border-neutral-500">
                      Gross
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium dark:border-neutral-500">
                      {"0.00"}
                    </td>
                  </tr>
                  <tr className=" dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-semibold dark:border-neutral-500">
                      Total Deductions
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-semibold dark:border-neutral-500">
                      {isClick ? formatThousandAmount(deductions) : "0.00"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-semibold dark:border-neutral-500">
                      Total Earnings
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4 font-semibold dark:border-neutral-500">
                      {"0.00"}
                    </td>
                  </tr>
                  <tr className=" bg-indigo-200">
                    <td></td>
                    <td></td>
                    <td
                      className="whitespace-nowrap px-6 py-4 dark:border-neutral-500 font-semibold"
                      onClick={() => alert("I love you! <3")}
                    >
                      Net Pay
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-semibold ">
                      {isClick ? formatThousandAmount(netSal) : "0.00"}
                    </td>
                  </tr>
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
