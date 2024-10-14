import React, { useState, useEffect } from "react";
import { TEXT } from "../Container/text";
import Card from "../Card/Card";
import * as XLSX from "xlsx";

import "./ExcelReader.css";

const ExcelReader = () => {
  const [data, setData] = useState([]);
  const [downloadAll, setDownloadAll] = useState(false);
  const [paper, setPaper] = useState(TEXT.Physics);
  const [start, setStart] = useState(0);
  const [numOfQuestion, setNumOfQuestion] = useState(5);
  const [screenType, setScreenType] = useState("shorts");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const handlePaperType = (text) => {
    setPaper(text);
  };
  const handleStart = (number) => {
    setStart(number);
  };

  const handleQuestionChange = (numOfQuestion) => {
    setNumOfQuestion(numOfQuestion);
  };

  const handleScreenType = (type) => {
    setScreenType(type);
  };

  useEffect(() => {
    if (data) {
      console.log("data => ", data);
    }
  }, [data]);

  return (
    <>
      <div className="excel-reader-container">
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

        <button onClick={() => setDownloadAll(true)}>Download All</button>

        <label htmlFor="paper-type">Paper Type:</label>
        <select
          id="paper-type"
          name="paper-type"
          onChange={(event) => {
            handlePaperType(event.target.value);
          }}
        >
          <option value={TEXT.Physics}>{TEXT.Physics}</option>
          <option value={TEXT.Chemistry}>{TEXT.Chemistry}</option>
          <option value={TEXT.Biology}>{TEXT.Biology}</option>
          <option value={TEXT.Math}>{TEXT.Math}</option>
          <option value={TEXT.Reasoning}>{TEXT.Reasoning}</option>
        </select>
        <label htmlFor="startFrom">Start from</label>
        <input
          id="startFrom"
          className="inputField"
          type="number"
          value={start}
          onChange={(event) => {
            handleStart(event.target.value);
          }}
          // placeholder="Start from"
          min={0}
        />

        <label htmlFor="questionCount">No. of question</label>
        <input
          id="questionCount"
          className="inputField"
          type="number"
          value={numOfQuestion}
          onChange={(event) => {
            handleQuestionChange(event.target.value);
          }}
          min={1}
        />

        <label htmlFor="screen-type">Screen Type:</label>
        <select
          id="screen-type"
          name="screen-type"
          onChange={(event) => {
            handleScreenType(event.target.value);
          }}
        >
          <option value="shorts">Shorts</option>
          <option value="videos">Videos</option>
        </select>

        {data &&
          data.map((item, index) => {
            if (index >= start && index < +numOfQuestion + +start) {
              return (
                <div key={index}>
                  <Card
                    data={item}
                    Qno={index + 1 - start}
                    downloadAll={downloadAll}
                    setDownloadAll={setDownloadAll}
                    paper={paper}
                    screenType={screenType}
                    showAnswer={false}
                  />
                  <Card
                    data={item}
                    Qno={index + 1 - start}
                    downloadAll={downloadAll}
                    setDownloadAll={setDownloadAll}
                    paper={paper}
                    screenType={screenType}
                    showAnswer={true}
                  />
                </div>
              );
            }
          })}
      </div>
    </>
  );
};

export default ExcelReader;
