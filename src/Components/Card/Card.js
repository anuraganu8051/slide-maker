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
    <div key={Qno} className="card-container">
      <div
        id={`card_${Qno}${showAnswer ? "_A" : ""}`}
        className={`card-background ${screenType} ${paper}`}
      >
        <h2 className="card-title underline-text">{paper.toUpperCase()}</h2>
        <div className="card-body">
          <div className="question-container">
            <div className="question-number-column">({Qno})</div>
            <div className="question-text-column">
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
            <div className="option-letter">(A)</div>

            <div className="option-text">
              {optionFormate(option_A, option_A_H)}
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
            <div className="option-letter">(B)</div>
            <div className="option-text">
              {optionFormate(option_B, option_B_H)}
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
            <div className="option-letter">(C)</div>
            <div className="option-text">
              {optionFormate(option_C, option_C_H)}
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
            <div className="option-letter">(D)</div>
            <div className="option-text">
              {optionFormate(option_D, option_D_H)}
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
