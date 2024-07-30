/* eslint-disable curly */
import {useRef, useState} from 'react';

enum Operator {
  add,
  subtract,
  multiply,
  divide,
}

export const useCalculator = () => {
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  const lastOperation = useRef<Operator>();

  const buildNumber = (numberString: string) => {
    if (number.includes('.') && numberString === '.') return;

    if (number.startsWith('0') || number.startsWith('-0')) {
      // Punto decimal
      if (numberString === '.') return setNumber(number + numberString);

      // Evaluar si es otro cero y no hay punto
      if (numberString === '0' && !number.includes('.')) return;

      // Evaluar si es diferente de cero, no tiene punto , y es el primer numero
      if (numberString !== '0' && !number.includes('.') && number.length === 1)
        return setNumber(numberString);
    }

    setNumber(number + numberString);
  };

  const setLastNumber = () => {
    number.endsWith('.')
      ? setPrevNumber(number.slice(0, -1))
      : setPrevNumber(number);
    setNumber('0');
  };

  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  };

  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  };

  const subtractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.subtract;
  };

  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  };

  const toggleSign = () => {
    if (number === '0') return;

    if (number.includes('-')) return setNumber(number.replace('-', ''));

    setNumber('-' + number);
  };

  const clean = () => {
    setNumber('0');
    setPrevNumber('0');
  };

  const deleteDigit = () => {
    if (number.length === 1) return setNumber('0');
    setNumber(number.slice(0, -1));

    if (number.length === 2 && number.includes('-')) return setNumber('0');
  };

  const calculateResult = () => {
    const num1 = Number(number);
    const num2 = Number(prevNumber);

    if (Number.isNaN(num1) || Number.isNaN(num2)) return;

    const operations = {
      [Operator.add]: num1 + num2,
      [Operator.subtract]: num2 - num1,
      [Operator.multiply]: num1 * num2,
      [Operator.divide]: num2 / num1,
    };

    const result = operations[lastOperation.current!];
    setNumber(result.toString());
    setPrevNumber('0');
  };

  return {
    addOperation,
    buildNumber,
    calculateResult,
    clean,
    deleteDigit,
    divideOperation,
    multiplyOperation,
    number,
    prevNumber,
    subtractOperation,
    toggleSign,
  };
};
