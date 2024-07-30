/* eslint-disable curly */
import {useCallback, useEffect, useRef, useState} from 'react';

enum Operator {
  add = '+',
  subtract = '-',
  multiply = 'x',
  divide = '÷',
}

export const useCalculator = () => {
  const [formula, setFormula] = useState('');
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  const lastOperation = useRef<Operator>();

  useEffect(() => {
    if (lastOperation.current) {
      const firstFormulaPart = formula.split(' ').at(0);
      setFormula(
        `${firstFormulaPart} ${lastOperation.current} ${
          number === '0' ? '' : number
        }`,
      );
    } else {
      setFormula(number);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number]);

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
    calculateResult();
    number.endsWith('.')
      ? setPrevNumber(number.slice(0, -1))
      : setPrevNumber(number);
    setNumber('0');
  };

  const divideOperation = () => {
    setLastNumber();
    if (formula.split(' ').at(1)?.length)
      setFormula(formula.replace(lastOperation.current!, Operator.divide));
    lastOperation.current = Operator.divide;
  };

  const multiplyOperation = () => {
    setLastNumber();
    if (formula.split(' ').at(1)?.length)
      setFormula(formula.replace(lastOperation.current!, Operator.multiply));
    lastOperation.current = Operator.multiply;
  };

  const subtractOperation = () => {
    setLastNumber();
    if (formula.split(' ').at(1)?.length)
      setFormula(formula.replace(lastOperation.current!, Operator.subtract));
    lastOperation.current = Operator.subtract;
  };

  const addOperation = () => {
    setLastNumber();
    if (formula.split(' ').at(1)?.length)
      setFormula(formula.replace(lastOperation.current!, Operator.add));
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
    lastOperation.current = undefined;
    setFormula('');
  };

  const deleteDigit = () => {
    if (number.length === 1) return setNumber('0');
    setNumber(number.slice(0, -1));

    if (number.length === 2 && number.includes('-')) return setNumber('0');
  };

  const calculateResult = () => {
    const result = calculateSubResult();
    setFormula(result.toString());
    lastOperation.current = undefined;
    setPrevNumber('0');
  };

  const calculateSubResult = useCallback((): number => {
    const [value1, _operator, value2] = formula.split(' ');

    const num1 = Number(value1);
    const num2 = Number(value2);

    if (isNaN(num2)) return num1;

    const operations = {
      [Operator.add]: num1 + num2,
      [Operator.subtract]: num1 - num2,
      [Operator.multiply]: num1 * num2,
      [Operator.divide]: num1 / num2,
    };

    return operations[lastOperation.current!];
  }, [formula]);

  useEffect(() => {
    const result = calculateSubResult();
    result && setPrevNumber(result.toString());
  }, [calculateSubResult, formula]);

  return {
    addOperation,
    buildNumber,
    calculateResult,
    clean,
    deleteDigit,
    divideOperation,
    formula,
    multiplyOperation,
    prevNumber,
    subtractOperation,
    toggleSign,
  };
};
