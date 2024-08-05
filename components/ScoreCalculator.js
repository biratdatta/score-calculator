"use client";

import { useState, useRef } from 'react';

export default function ScoreCalculator() {
  const [score, setScore] = useState(null);
   const [pastScore, setPastScore] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const formRef = useRef(null);

  function calculate() {
    const age = parseInt(document.getElementById('age').value);
    const occupation = document.getElementById('occupation').value;
    const annualIncome = parseInt(document.getElementById('annualIncome').value);
    const otherIncome = parseInt(document.getElementById('otherIncome').value);
    const netWorth = parseInt(document.getElementById('netWorth').value);
    const liabilities = parseInt(document.getElementById('liabilities').value);
     const pastScore = parseFloat(document.getElementById('pastScore').value);

      // Validate that all required fields are filled and age is above 0
    if (age <= 0 || isNaN(age) || !occupation || isNaN(annualIncome) || !annualIncome || isNaN(otherIncome) || !otherIncome || isNaN(netWorth) || !netWorth || isNaN(liabilities) || !liabilities) {
      alert('Please fill in all required fields and ensure age is above 0.');
      return;
    }

    setInputValues({ age, occupation, annualIncome, otherIncome, netWorth, liabilities });

    const score = calculateScore(age, occupation, annualIncome, otherIncome, netWorth, liabilities);
    setScore(score.toFixed(2));
    setPastScore(pastScore);
  
  }

  function calculateScore(age, occupation, annualIncome, otherIncome, netWorth, liabilities) {
    let score = 0;

    // Age weightage
    if (age < 25) {
      score += 0;
    } else if (age >= 25 && age < 35) {
      score += 0.05 * 0.05;
    } else if (age >= 35 && age < 55) {
      score += 0.05 * 0.25;
    } else {
      score += 0.05 * 0.15;
    }

    // Occupation weightage
    if (occupation === "Salaried") {
      score += 0.15 * 0.8;
    } else if (occupation === "Own Business") {
      score += 0.15 * 0.2;
    }

    // Annual Income weightage
    score += 0.4 * (annualIncome / Math.max(annualIncome, 1000000));

    // Other Income weightage
    score += 0.05 * (otherIncome / Math.max(otherIncome, 10000));

    // Net Worth weightage
    score += 0.05 * (netWorth / Math.max(netWorth, 100000));

    // Liabilities/Expenses weightage
    score += 0.3 * (1 - liabilities / Math.max(liabilities, 100000));

    return score;
  }

  function getOutcomeReport(score) {
    let report = {
      financialHealthScore: `${score} out of 1.00`,
      change: 'Increased (or decrease) will be reflected on the last assessment points.',
      financialHealthPosition: '',
      creditUtilization: ''
    };
  const change = pastScore !== null ? (score - pastScore).toFixed(2) : 'N/A';
    report.change = pastScore !== null ? `Change: ${change >= 0 ? 'Increased' : 'Decreased'} by ${Math.abs(change)} points compared to the last assessment.` : 'Change: N/A';


    if (score >= 0.75) {
      report.financialHealthPosition = 'Excellent. Has outstanding ability to pay liability using current worth and income in short run.';
      report.creditUtilization = ' Credit utilization should be monitored';
    } else if (score >= 0.50) {
      report.financialHealthPosition = 'Good. Has good ability to pay liability using current worth and income in short run.';
      report.creditUtilization = 'Credit utilization should be monitored';
    } else if (score >= 0.25) {
      report.financialHealthPosition = 'Low. Has limited ability to pay liability using current worth and income in short run.';
      report.creditUtilization = 'Credit utilization should be monitored';
    } else {
      report.financialHealthPosition = 'Weak. Has no ability to pay liability using current worth and income in short run.';
      report.creditUtilization = 'Credit utilization should be monitored';
    }

    return report;
  }

  function retry() {
    setScore(null);
    setInputValues({});
    if (formRef.current) {
      formRef.current.reset();
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border border-gray-300 rounded-lg p-6 shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Financial Score Calculator</h1>
        {score === null ? (
          <form ref={formRef} id="scoreForm" className="space-y-4">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age:</label>
              <input type="number" id="age" name="age" min="0" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div>
              <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">Occupation:</label>
              <select id="occupation" name="occupation" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="Salaried">Salaried</option>
                <option value="Own Business">Own Business</option>
                <option value="Not working/Student">Not working/Student</option>
              </select>
            </div>
            <div>
              <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700">Annual Income:</label>
              <input type="number" id="annualIncome" name="annualIncome" min="0" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div>
              <label htmlFor="otherIncome" className="block text-sm font-medium text-gray-700">Other Income:</label>
              <input type="number" id="otherIncome" name="otherIncome" min="0" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div>
              <label htmlFor="netWorth" className="block text-sm font-medium text-gray-700">Net Worth:</label>
              <input type="number" id="netWorth" name="netWorth" min="0" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div>
              <label htmlFor="liabilities" className="block text-sm font-medium text-gray-700">Liabilities/Expenses:</label>
              <input type="number" id="liabilities" name="liabilities" min="0" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div>
              <label htmlFor="pastScore" className="block text-sm font-medium text-gray-700">Past Score:</label>
              <input type="number" step="0.01" id="pastScore" name="pastScore" min="0" max="1" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <button type="button" onClick={calculate} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Calculate Score</button>
          </form>
        ) : (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-center">Your Score</h2>
            <div className="flex justify-center items-center mt-4">
              <div className="relative">
                <svg className="w-24 h-24">
                  <circle cx="50%" cy="50%" r="40" stroke="#d1d5db" strokeWidth="5" fill="none" />
                  <circle cx="50%" cy="50%" r="40" stroke="#4f46e5" strokeWidth="5" strokeDasharray={`${score * 251.2} ${251.2 - score * 251.2}`} fill="none" transform="rotate(-90 50 50)" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
                  {score}
                </div>
              </div>
            </div>
            <div className="mt-6">
              {(() => {
                const report = getOutcomeReport(score);
                return (
                  <>
                    <p><strong>Financial health score:</strong> {report.financialHealthScore}</p>
                    <p><strong>Change:</strong> {report.change}</p>
                    <p><strong>Financial health position:</strong> {report.financialHealthPosition}</p>
                    <p><strong>Credit utilization:</strong> {report.creditUtilization}</p>
                  </>
                );
              })()}
            </div>
         <div className="mt-6 grid grid-cols-2 gap-6">
  {Object.keys(inputValues).map(key => {
    
    const formattedKey = key.replace(/([a-z])([A-Z])/g, '$1 $2');
    return (
      <div key={key} className="p-4 rounded-lg shadow-md text-center text-lg font-medium" style={{ backgroundColor: `hsl(${Math.random() * 360}, 70%, 90%)` }}>
        <span className="block mb-2">
          {formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1)}:
        </span>
        {inputValues[key]}
      </div>
    );
  })}
</div>

            <button onClick={retry} className="w-full mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Retry</button>
          </div>
        )}
      </div>
    </div>
  );
}
