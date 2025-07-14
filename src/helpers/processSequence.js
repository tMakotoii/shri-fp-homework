/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from "../tools/api";

const api = new Api();

const validateInput = (value) => {
  if (value.length < 2 || value.length > 10) return false;

  if (!/^[0-9]+(\.[0-9]+)?$/.test(value)) return false;

  if (parseFloat(value) <= 0) return false;

  return true;
};

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  writeLog(value);

  if (!validateInput(value)) {
    handleError("ValidationError");
    return;
  }

  const num = Math.round(parseFloat(value));
  writeLog(num);

  api
    .get("https://api.tech/numbers/base", { from: 10, to: 2, number: num })
    .then(({ result }) => {
      writeLog(result);
      return result;
    })
    .then((binaryStr) => {
      const length = binaryStr.length;
      writeLog(length);
      return length;
    })
    .then((length) => {
      const squared = length * length;
      writeLog(squared);
      return squared;
    })
    .then((squared) => {
      const mod = squared % 3;
      writeLog(mod);
      return mod;
    })
    .then((mod) => api.get(`https://animals.tech/${mod}`, {}))
    .then(({ result }) => {
      handleSuccess(result);
    })
    .catch((error) => {
      handleError("API Error");
    });
};

export default processSequence;
