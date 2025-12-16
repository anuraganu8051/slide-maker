import React, { useEffect } from "react";
import html2canvas from "html2canvas";
import "./Card.css";
import { TEXT } from "../Container/text";

const Card = ({
  data,
  Qno,
  downloadAll,
  setDownloadAll,
  paper,
  screenType,
  showAnswer,
  language,
  bodyFontSize,
  textColor,
  examName,
  extraInfo,
}) => {
  const {
    option_A,
    option_B,
    option_C,
    option_D,
    answer,
    option_A_H,
    option_B_H,
    option_C_H,
    option_D_H,
    answer_H,
  } = data;

  const handleDownload = (id) => {
    const card = document.getElementById(id);
    html2canvas(card, { scale: 3 }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${paper}_${Qno}.png`;
      link.click();
    });
  };

  const optionFormate = (option_A, option_A_H) => {
    return language == TEXT.HINGLISH
      ? `${option_A_H} / ${option_A}`
      : language == TEXT.ENGLISH
      ? option_A
      : option_A_H;
  };

  useEffect(() => {
    if (downloadAll) {
      handleDownload(`card_${Qno}${showAnswer ? "_A" : ""}`);
      setDownloadAll(false);
    }
  }, [downloadAll]);

  //   /* Warm Sunset */
  // background: linear-gradient(135deg, #ff5f6d, #ffc371);

  // /* Ocean Breeze */
  // background: linear-gradient(135deg, #56ccf2, #2f80ed);

  // /* Lush Green */
  // background: linear-gradient(135deg, #11998e, #38ef7d);

  // /* Purple Haze */
  // background: linear-gradient(135deg, #8e44ad, #c39bd3);

  // /* Candy Floss */
  // background: linear-gradient(135deg, #ff9a9e, #fad0c4);

  // /* Tropical Sunset */
  // background: linear-gradient(135deg, #f6d365, #fda085);

  // /* Cool Mint */
  // background: linear-gradient(135deg, #a8e063, #56ab2f);

  // /* Twilight Blues */
  // background: linear-gradient(135deg, #4b79a1, #283e51);

  return (
    <div key={Qno} className="card-container ">
      <div
        id={`card_${Qno}${showAnswer ? "_A" : ""}`}
        className={`card-background ${screenType} ${paper.replace(/\s+/g, "")}`}
      >
        <div className="d-flex flex-column align-items-center justify-content-center bg-light px-2 mt-4 ">
          <h4 className="card-title underline-text fs-6 fw-bold  w-100 py-1 my-1">
            {paper?.toUpperCase()} {examName ? `- ${examName}` : ""}
          </h4>
          <h5 className="card-title fs-6 fw-bold">{extraInfo}</h5>
        </div>
        <div
          className={`card-body ${
            textColor == "White" ? "text-light" : "text-dark"
          }`}
          style={{ fontSize: `${bodyFontSize}px` }}
        >
          <div
            className="question-container "
            style={{ fontSize: "inherit", color: "inherit" }}
          >
            <div
              className="question-number-column"
              style={{ fontSize: "inherit", color: "inherit" }}
            >
              ({Qno})
            </div>
            <div
              className="question-text-column "
              style={{ fontSize: "inherit", color: "inherit" }}
            >
              {(language == TEXT.HINDI || language == TEXT.HINGLISH) && (
                <div>{data.question_H}</div>
              )}
              {/* {language == TEXT.HINGLISH && <br />} */}
              {(language == TEXT.ENGLISH || language == TEXT.HINGLISH) && (
                <div>{data.question}</div>
              )}
            </div>
          </div>
          <div
            className={`option-container ${
              showAnswer
                ? answer == option_A
                  ? "correct-answer"
                  : "wrong-answer"
                : ""
            }`}
          >
            <div className="option-letter" style={{ fontSize: "inherit" }}>
              (A)
            </div>

            <div className="option-text" style={{ fontSize: "inherit" }}>
              {optionFormate(option_A, option_A_H)}{" "}
              {showAnswer && answer == option_A ? "✅" : ""}
            </div>
            {/* <div>{option_A_H}</div> */}
          </div>

          <div
            className={`option-container ${
              showAnswer
                ? answer == option_B
                  ? "correct-answer"
                  : "wrong-answer"
                : ""
            }`}
          >
            <div className="option-letter" style={{ fontSize: "inherit" }}>
              (B)
            </div>
            <div className="option-text" style={{ fontSize: "inherit" }}>
              {optionFormate(option_B, option_B_H)}{" "}
              {showAnswer && answer == option_B ? "✅" : ""}
            </div>
          </div>
          <div
            className={`option-container ${
              showAnswer
                ? answer == option_C
                  ? "correct-answer"
                  : "wrong-answer"
                : ""
            }`}
          >
            <div className="option-letter" style={{ fontSize: "inherit" }}>
              (C)
            </div>
            <div className="option-text" style={{ fontSize: "inherit" }}>
              {optionFormate(option_C, option_C_H)}{" "}
              {showAnswer && answer == option_C ? "✅" : ""}
            </div>
          </div>
          <div
            className={`option-container ${
              showAnswer
                ? answer == option_D
                  ? "correct-answer"
                  : "wrong-answer"
                : ""
            }`}
          >
            <div className="option-letter" style={{ fontSize: "inherit" }}>
              (D)
            </div>
            <div className="option-text" style={{ fontSize: "inherit" }}>
              {optionFormate(option_D, option_D_H)}{" "}
              {showAnswer && answer == option_D ? "✅" : ""}
            </div>
          </div>
          {/* <div className="correct-answer-container">
          <div className="correct-answer-letter">(D)</div>
          <div className="correct-answer-text">{data.Option_4}</div>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
