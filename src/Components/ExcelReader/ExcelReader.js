import React, { useState, useEffect } from "react";
import { TEXT } from "../Container/text";
import Card from "../Card/Card";
import * as XLSX from "xlsx";

import "./ExcelReader.css";

const subjectList = [
  "Physics",
  "Chemistry",
  "Biology",
  "Math",
  "Reasoning",
  "CDP",
  "General Knowledge",
  "General Awareness",
  "Current Affairs",
  "Polity",
  "History",
  "Geography",
  "Economy",
  "Static GK",
  "Computer Awareness",
  "Science",
  "English",
  "Hindi",
  "Environmental Studies",
  "Quantitative Aptitude",
  "Data Interpretation",
  "Logical Reasoning",
  "Teaching Aptitude",
  "Pedagogy",
  "Child Psychology",
];
const ExcelReader = () => {
  const [data, setData] = useState([]);
  const [downloadAll, setDownloadAll] = useState(false);
  const [paper, setPaper] = useState(subjectList[0]);
  const [start, setStart] = useState(0);
  const [numOfQuestion, setNumOfQuestion] = useState(5);
  const [screenType, setScreenType] = useState("shorts");
  const [language, setLanguage] = useState(TEXT.ENGLISH);
  const [bodyFontSize, setBodyFontSize] = useState(16);
  const [textColor, setTextColor] = useState("Black");
  const [examName, setExamName] = useState(null);
  const [extraInfo, setExtraInfo] = useState(null);

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

  const handleLanguage = (language) => {
    setLanguage(language);
  };

  const handleBodyFontSize = (fontSize) => {
    setBodyFontSize(fontSize);
  };

  useEffect(() => {
    if (data) {
      console.log("data => ", data);
    }
  }, [data]);

  return (
    <>
      <div className="excel-reader-container">
        <div className="nav-bar">
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="nav-bar-item"
          />

          <button onClick={() => setDownloadAll(true)} className="nav-bar-item">
            Download All
          </button>

          <div className="nav-bar-item">
            <label htmlFor="paper-type">Paper Type:</label>
            <select
              id="paper-type"
              name="paper-type"
              onChange={(event) => {
                handlePaperType(event.target.value);
              }}
            >
              {subjectList.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          <div className="nav-bar-item">
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
          </div>

          <div className="nav-bar-item">
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
          </div>

          {/* SCREEN RESOLUATION */}
          <div className="nav-bar-item">
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
          </div>

          {/* SELECH LANGUAGE */}
          <div className="nav-bar-item">
            {" "}
            <label htmlFor="screen-type">Language :</label>
            <select
              id="screen-type"
              name="screen-type"
              onChange={(event) => {
                handleLanguage(event.target.value);
              }}
            >
              <option value={TEXT.ENGLISH}>{TEXT.ENGLISH}</option>
              <option value={TEXT.HINDI}>{TEXT.HINDI}</option>
              <option value={TEXT.HINGLISH}>{TEXT.HINGLISH}</option>
            </select>
          </div>

          {/* Body font size */}
          <div className="nav-bar-item">
            <label htmlFor="bodyFontSize">Body font size</label>
            <input
              id="bodyFontSize"
              className="inputField"
              type="number"
              value={bodyFontSize}
              onChange={(event) => {
                handleBodyFontSize(event.target.value);
              }}
              min={1}
            />
          </div>

          {/* Body text color */}
          <div className="nav-bar-item">
            <label htmlFor="screen-type">Text color :</label>
            <select
              id="screen-type"
              name="screen-type"
              onChange={(event) => {
                setTextColor(event.target.value);
              }}
            >
              <option value="Black">Black</option>
              <option value="White">White</option>
            </select>
          </div>

          {/* Exam name */}
          <div className="nav-bar-item">
            <label htmlFor="examName">Exam name</label>
            <input
              id="examName"
              className="inputField"
              type="text"
              value={examName}
              onChange={(event) => {
                setExamName(event.target.value);
              }}
              placeholder="ex: JEE"
            />
          </div>

          {/* Extra info */}
          <div className="nav-bar-item">
            <label htmlFor="extraInfo">Extra Info</label>
            <input
              id="extraInfo"
              className="inputField"
              type="text"
              value={extraInfo}
              onChange={(event) => {
                setExtraInfo(event.target.value);
              }}
              placeholder="info"
            />
          </div>
        </div>

        {data &&
          data.map((item, index) => {
            if (index >= start && index < +numOfQuestion + +start) {
              return (
                <div key={index} className="card-container">
                  <div>
                    <Card
                      data={item}
                      Qno={index + 1 - start}
                      downloadAll={downloadAll}
                      setDownloadAll={setDownloadAll}
                      paper={paper}
                      screenType={screenType}
                      showAnswer={false}
                      language={language}
                      bodyFontSize={bodyFontSize}
                      textColor={textColor}
                      examName={examName}
                      extraInfo={extraInfo}
                    />
                    <Card
                      data={item}
                      Qno={index + 1 - start}
                      downloadAll={downloadAll}
                      setDownloadAll={setDownloadAll}
                      paper={paper}
                      screenType={screenType}
                      showAnswer={true}
                      language={language}
                      bodyFontSize={bodyFontSize}
                      textColor={textColor}
                      examName={examName}
                      extraInfo={extraInfo}
                    />
                  </div>
                </div>
              );
            }
          })}
      </div>
    </>
  );
};

export default ExcelReader;
