export const formatThousandAmount = (num) => {
  const [strNumber, decimal] = num.toString().split(".");

  let result = "";
  let count = 0;

  if (strNumber.length >= 4) {
    for (let i = strNumber.length - 1; i >= 0; i--) {
      count++;
      result = strNumber.charAt(i) + result;
      if (count % 3 === 0 && i !== 0) {
        result = "," + result;
      }
    }
    console.log("decimal:", decimal);
    if (!decimal) {
      return `${result}.00`;
    }
    return `${result}.${decimal}`;
  }

  return num;
};
