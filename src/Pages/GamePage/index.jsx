import "./style.scss";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import QuestionCard from "./QuestionCard";
import Pyramid from "./assets/pyramid.png";
import Perso1 from "./assets/perso1.png";
import Perso2 from "./assets/perso2.png";
import Countdown from "./Countdown/index";
import ModalDiv from "./Modal/index";
import { motion } from "framer-motion";
import { Prompt } from "react-router-dom";
import { updateScorePlayer } from "../../Components/Fetch/index";

const Game = () => {
  let { id } = useParams();
  const userId = useSelector((state) => state.id);
  const tokenCookie = Cookie.get("token");
  const [game, setGame] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [gameOn, setGameOn] = useState(false);
  const [newQuestionTime, setNewQuestionTime] = useState(new Date(Date.now()));
  const [currentStep, setCurrentStep] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [gameHistories, setGameHistories] = useState([]);
  const [perso1animation, setPerso1Animation] = useState({ x: 0, y: 0 });
  const [perso2animation, setPerso2Animation] = useState({ x: 0, y: 0 });
  const [firstGameHistory, setFirstGameHistory] = useState({});
  const history = useHistory();
  const pyramidRef = useRef();
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [timePlayer1, setTimePlayer1] = useState(0);
  const [timePlayer2, setTimePlayer2] = useState(0);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    history.push("/gameinfos");
  };

  useEffect(() => {
    if (questions.length === 12) {
      setCurrentQuestion(questions[currentQuestionIndex]);
      setGameOn(true);
      setTimePlayer1(Date.now());
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }, [questions]);

  useEffect(() => {
    fetchGame();
  }, []);

  useEffect(() => {
    if (game && count === 2) {
      if (userId === game.player2_id) {
        fetchHistoryPlayer1();
      }
      fetchQuestions();
    }
    return () => {
      if (game){
        console.log("test usablecallback")
        userId === game.player1_id ? destroyGame() : forfeitGame();      
      }
    };
  }, [count, game]);

  useEffect(() => {
    setCount(count + 1);
  }, [game]);

  const fetchGame = () => {
    fetch(`https://pyramid-race-api.herokuapp.com/games/${id}`)
      .then((response) => response.json())
      .then((data) => setGame(data))
      .catch((error) => console.log(error));
  };

  const fetchQuestions = () => {
    fetch(
      `https://opentdb.com/api.php?amount=12&category=${game.category}&difficulty=${game.difficulty}&type=multiple`
    )
      .then((response) => response.json())
      .then((data) => setQuestions(data.results));
  };

  const fetchHistoryPlayer1 = () => {
    fetch(`https://pyramid-race-api.herokuapp.com/games/${id}/game_histories`)
      .then((response) => response.json())
      .then((data) => {
        setGameHistories(data);
        console.log(data[0]);
        setFirstGameHistory(data[0]);
      })
      .catch((error) => console.log(error));
  };

  const gameEnd = (firstWinnerId) => {
    let winner_id;
    console.log(timePlayer1);
    console.log(timePlayer2);
    if (!firstWinnerId) {
      let player1_correct_answers = gameHistories.filter(
        (game_history) => game_history.response_correct === true
      ).length;
      let player1_wrong_answers = gameHistories.filter(
        (game_history) => game_history.response_correct !== true
      ).length;
      let player1_step = player1_correct_answers - player1_wrong_answers;
      if (player1_step > currentStep) {
        winner_id = game.player1_id;
      } else if (player1_step < currentStep) {
        winner_id = game.player2_id;
      } else if (player1_step === currentStep) {
        if (timePlayer1 >= timePlayer2) {
          winner_id = game.player2_id;
        } else if (timePlayer1 < timePlayer2) {
          winner_id = game.player1_id;
        }
      }
    } else {
      winner_id = firstWinnerId;
    }

    console.log(winner_id);
    const data = {
      game: {
        winner_id: winner_id,
        turn: "gameEnded",
      },
    };
    fetch(`https://pyramid-race-api.herokuapp.com/games/${id}`, {
      method: "put",
      headers: {
        Authorization: `${tokenCookie}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (userId === winner_id) {
          history.push(`/games/${id}/victory`);
        } else if (userId != winner_id) {
          history.push(`/games/${id}/defeat`);
        }
      })
      .catch((error) => console.log(error));
  };

  const nextTurn = () => {
    const data = {
      game: {
        turn: "player2",
      },
    };
    fetch(`https://pyramid-race-api.herokuapp.com/games/${id}`, {
      method: "put",
      headers: {
        Authorization: `${tokenCookie}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => console.log(error));
  };

  const nextQuestion = (answer_choice, correct_answer) => {
    const data = {
      game_history: {
        user_id: userId,
        game_id: id,
        response_correct:
          !!answer_choice &&
          !!correct_answer &&
          answer_choice === correct_answer,
        question_time: newQuestionTime,
        response_time: new Date(Date.now()),
      },
    };
    fetch(`https://pyramid-race-api.herokuapp.com/game_histories`, {
      method: "post",
      headers: {
        Authorization: `${tokenCookie}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => console.log(error));

    if (answer_choice && answer_choice === correct_answer && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else if (
      answer_choice &&
      answer_choice === correct_answer &&
      currentStep === 5
    ) {
      setCurrentStep(currentStep + 1);
      setGameOn(false);
      setCurrentQuestion({});
      if (userId === game.player1_id) {
        nextTurn();
        openModal();
      } else if (userId === game.player2_id) {
        gameEnd(game.player2_id);
      }
    } else if (
      (!answer_choice && currentStep > 0) ||
      (answer_choice !== correct_answer && currentStep > 0)
    ) {
      setCurrentStep(currentStep - 1);
    }

    if (currentQuestionIndex < 12) {
      setCurrentQuestion(questions[currentQuestionIndex]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setNewQuestionTime(new Date(Date.now()));
    } else {
      setGameOn(false);
      setCurrentQuestion({});
      setCurrentQuestionIndex("");
      if (userId === game.player1_id) {
        nextTurn();
        openModal();
      } else if (userId === game.player2_id) {
        let totalTime = Date.now() - timePlayer1;
        console.log(totalTime);
        setTimePlayer1(totalTime);
      }
    }
  };

  useEffect(() => {
    console.log("tesssttttttt");
    if (count3 === 2) {
      console.log(timePlayer1);
      gameEnd();
    }
    setCount3(count3 + 1);
  }, [timePlayer1]);

  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const destroyGame = () => {
    console.log("test destroy");
    fetch(`https://pyramid-race-api.herokuapp.com/games/${id}`, {
      method: "delete",
      headers: {
        Authorization: `${tokenCookie}`,
        "Content-Type": "application/json",
      },
    }).catch((error) => console.log(error));
  };

  const forfeitGame = () => {
    console.log("test forfeit");
    if (!gameOn) {
      return;
    }
    const data = {
      game: {
        winner_id: game.player1_id,
        turn: "gameEnded",
      },
    };
    fetch(`https://pyramid-race-api.herokuapp.com/games/${id}`, {
      method: "put",
      headers: {
        Authorization: `${tokenCookie}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => console.log(error));
  };

  const movePlayer1 = (step) => {
    if (!pyramidRef.current) {
      return;
    }
    console.log("movePlayer1 launched");
    const pyramidHeight = pyramidRef.current.getBoundingClientRect().height;
    const pyramidWidth = pyramidRef.current.getBoundingClientRect().width;
    const marchHeight = pyramidHeight / 6.57;
    const groundHeight = pyramidHeight / 100;
    const marchWidth = pyramidWidth / 2 / 7;

    if (step >= 0) {
      if (step < 6) {
        setPerso1Animation({
          x: step * marchWidth,
          y: -step * marchHeight - groundHeight,
        });
      } else if (step === 6) {
        setPerso1Animation({
          x: step * marchWidth + marchWidth / 1.3,
          y: -5 * marchHeight - groundHeight,
        });
      }
    } else if (step < 0) {
      if (step > -6) {
        setPerso2Animation({
          x: step * marchWidth,
          y: step * marchHeight - groundHeight,
        });
      } else if (step === -6) {
        setPerso2Animation({
          x: step * marchWidth - marchWidth / 1.3,
          y: -5 * marchHeight - groundHeight,
        });
        setGameOn(false);
        gameEnd(game.player1_id);
      }
    }
  };

  const movePlayer2 = () => {
    console.log("movePlayer2 initialization");
    let step = 0;
    const startOpponentGame = Date.parse(gameHistories[0].question_time);
    const endOpponentGame = Date.parse(
      gameHistories[gameHistories.length - 1].response_time
    );
    const totalTimeOpponent = endOpponentGame - startOpponentGame;
    setTimePlayer2(totalTimeOpponent);
    gameHistories.forEach((game_history) => {
      setTimeout(function () {
        if (game_history.response_correct) {
          step += 1;
        } else if (step > 0 && !game_history.response_correct) {
          step -= 1;
        }
        movePlayer1(-step);
        console.log("setTimeout working");
      }, Date.parse(game_history.response_time) - startOpponentGame);
    });
  };

  useEffect(() => {
    console.log("current step : ", currentStep);
    movePlayer1(currentStep);
  }, [currentStep]);

  useEffect(() => {
    console.log(perso1animation);
  }, [perso1animation]);

  useEffect(() => {
    console.log(gameHistories);
    console.log(firstGameHistory);
    setCount2(count2 + 1);
    if (count2 === 1) {
      movePlayer2();
    }
  }, [firstGameHistory]);

  useEffect(() => {
    window.addEventListener("resize", movePlayer1);
    return () => {
      window.removeEventListener("resize", movePlayer1);
    };
  }, []);

  return (
    <div className="game_page">
      {userId === game.player1_id && gameOn && (
        <Prompt
          message={() => "Si vous quittez cette page la partie sera perdue !"}
        />
      )}
      {userId === game.player2_id && gameOn && (
        <Prompt
          message={() =>
            "Si vous quittez cette page, vous serez automatiquement déclaré forfait !"
          }
        />
      )}

      <ModalDiv
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        step={currentStep}
      />
      {((gameOn && userId === game.player2_id && game.turn === "player2") ||
        (gameOn && userId === game.player1_id && game.turn === "player1")) && (
        <>
          <Countdown onExpire={nextQuestion} resetTick={currentQuestionIndex} />
          <QuestionCard
            question={currentQuestion.question}
            correct_answer={currentQuestion.correct_answer}
            incorrect_answers={currentQuestion.incorrect_answers}
            nextQuestion={nextQuestion}
          />
        </>
      )}
      <div className="game_content">
        <img className="pyramid" src={Pyramid} ref={pyramidRef} />
        <motion.div
          className="perso1"
          animate={perso1animation}
          transition={{ type: "Tween", stiffness: 100 }}
        >
          <img className="perso" src={Perso1} />
        </motion.div>
        <motion.div
          className="perso2"
          animate={perso2animation}
          transition={{ type: "Tween", stiffness: 100 }}
        >
          <img className="perso" src={Perso2} />
        </motion.div>
      </div>
    </div>
  );
};

export default Game;
