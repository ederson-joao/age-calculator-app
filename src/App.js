import React, { useState } from 'react';
import './App.css';
import arrowImage from './img/icon-arrow.svg';


function App() {
  
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [errorDay, setErrorDay] = useState('');
  const [errorMonth, setErrorMonth] = useState('');
  const [errorYear, setErrorYear] = useState('');

  const [resultDay, setResultDay] = useState('--');
  const [resultMonth, setResultMonth] = useState('--');
  const [resultYear, setResultYear] = useState('--');

  const currentDate = new Date();

  const calculate = () => {
    const birthDate = new Date(`${year}-${month}-${day}`);
    const differenceDate = new Date (currentDate - birthDate);
  
    setResultYear (differenceDate.getUTCFullYear() - 1970);
    setResultMonth (differenceDate.getUTCMonth());
    setResultDay (differenceDate.getUTCDate() -1);
  }

  const validateField = (setError,message,field,a,b) => {
    if(field === ''){
      setError('Campo Obrigatório');
    }else if (a < field || field < b) {
      setError(`${message} Inválido`);
    }else {
      setError('');
    }
  }

  const subjects = [
    {
      label: 'Dia',
      placeholder: 'DD',
      value: day,
      onBlur: () => validateField(setErrorDay,'Dia',day,31,1),
      onChange: e => setDay(e.target.value),
      error: errorDay
    },  
    {
      label: 'Mês',
      placeholder: 'MM',
      value: month,
      onBlur: () => validateField(setErrorMonth,'Mês',month,12,1),
      onChange: e => setMonth(e.target.value),
      error: errorMonth
    },  
    {
      label: 'Ano',
      placeholder: 'AAAA',
      value: year,
      onBlur: () => validateField(setErrorYear,'Ano',year,currentDate.getFullYear()),
      onChange: e => setYear(e.target.value),
      error: errorYear
    }  
  ] 

  const results = [
    {
      span: resultYear,
      h1: resultYear === 1 ? 'ano' : 'anos'
    },
    {
      span: resultMonth,
      h1: resultMonth === 1 ? 'mês' : 'meses'
    },
    {
      span: resultDay,
      h1: resultDay === 1 ? 'dia' : 'dias'
    }
  ]

  return (
    <div className="App">
      <div className="content">
        <div className="inputDates">
          {subjects.map((subject, index) => (
            <div key={index}>
              <p className="description">{subject.label}</p>
              <input type="number" placeholder={subject.placeholder} value={subject.value} onChange={subject.onChange} onBlur={subject.onBlur}/>
              <p className="error">{subject.error}</p>
            </div>
            ))}
        </div>

        <hr/>

        <div className="Btn">
          <button className="calculateBtn" onClick={() => calculate()}>
            <img src={arrowImage} alt="Arrow"/>
          </button>
        </div>
          
        {results.map((result, index) => (
          <div className="result" key={index}>
            <h1><span>{result.span}</span>{result.h1}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
