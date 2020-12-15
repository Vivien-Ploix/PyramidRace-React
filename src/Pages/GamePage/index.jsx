import "./style.scss";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import QuestionCard from "./QuestionCard";
import Pyramid from "./assets/pyramid.png";
import Countdown from './Countdown/index'
import ModalDiv from './Modal/index'
import {Prompt} from 'react-router-dom'

const Game = () => {
  let { id } = useParams();
  const userId = useSelector((state) => state.id);
  const tokenCookie = Cookie.get("token");
  const [game, setGame] = useState({});
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [gameOn, setGameOn] = useState(false);
  const [newQuestionTime, setNewQuestionTime] = useState(new Date(Date.now()))
  const [currentStep, setCurrentStep] = useState(0)
  const [modalIsOpen,setIsOpen] = useState(false);
  const [gameHistories, setGameHistories] = useState([])
  const history = useHistory()



  const openModal = () =>  {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
    history.push('/gameinfos')
  }

  useEffect(() => {
    console.log(gameHistories)
  }, [gameHistories])

  useEffect(() => {
    console.log(questions);
    if (questions.length === 12) {
      setCurrentQuestion(questions[currentQuestionIndex]);
      setGameOn(true);
      console.log(currentQuestion);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }, [questions]);

  useEffect(() => {
    console.log(currentQuestion)
  }, [currentQuestion])

  useEffect(() => {
    fetchGame();

  }, []);

  useEffect(() => {
    console.log(newQuestionTime)
  }, [newQuestionTime])

  useEffect(() => {
    setCount(count + 1);
    if (count === 1) {
      console.log("test ongoing")
      console.log(game)
      if (userId == game.player2_id){
        console.log("test succeeded")
        fetchHistoryPlayer1()
      }
      console.log(game)
      fetchQuestions();
    };
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
      console.log(data)
      setGameHistories(data)
    })
    .catch((error) => console.log(error))
  }

  const gameEnd = () => {
    let player1_correct_answers = gameHistories.filter((game_history) => game_history.correct_answer === true).length
    console.log("game histories : correct answers")
    console.log(player1_correct_answers)
    let player1_wrong_answers = gameHistories.filter((game_history) => game_history.correct_answer !== true).length
    console.log("game histories : wronf answers")
    console.log(player1_wrong_answers)
    let player1_step = player1_correct_answers - player1_wrong_answers
    console.log("player 1 step : ", player1_step)
    let winner_id;
    console.log("winner_id :", winner_id)
    if (player1_step >= currentStep){
      winner_id = game.player1_id
    } else {
      winner_id = game.player2_id
    }
    const data = {
      game: {
        winner_id: winner_id,
        turn: "gameEnded"
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
  }

  useEffect(() => {
    console.log(currentStep)
  }, [currentStep])

  const nextQuestion = (answer_choice, correct_answer) => {
    const data = {
      game_history: {
        user_id: userId,
        game_id: id,
        response_correct:
          (!!answer_choice && !!correct_answer && answer_choice === correct_answer),
        question_time: newQuestionTime,
        response_time: new Date(Date.now())
      },
    };
    fetch(`https://pyramid-race-api.herokuapp.com/game_histories`, {
      method: "post",
      headers: {
        Authorization: `${tokenCookie}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());

    if (answer_choice && answer_choice === correct_answer && currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else if (answer_choice && answer_choice === correct_answer && currentStep === 5) {
      setCurrentStep(currentStep + 1);
      setGameOn(false);
      setCurrentQuestion({});
      setCurrentQuestionIndex("");
    } else if (!answer_choice && currentStep > 0 || answer_choice !== correct_answer && currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }

    if (currentQuestionIndex < 12) {
      setCurrentQuestion(questions[currentQuestionIndex]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setNewQuestionTime(new Date(Date.now()));
    } else {
      setGameOn(false);
      setCurrentQuestion({});
      setCurrentQuestionIndex("");
      if (userId == game.player1_id) {
        openModal()
      } else if (userId == game.player2_id) {
        console.log("partie terminee")
        gameEnd()
      }
    }
  };


  // Prompt before leaving page 


  // useEffect(() => {
  //   window.addEventListener('beforeunload', alertUser)
  //   if(userId == game.player1_id){
  //     console.log("testtesttets")
  //       window.addEventListener('unload', destroyGame)
  //     } else if (userId == game.payer2_id){
  //       window.addEventListener('unload', forfeitGame)
  //   }

  //   if(userId == game.player1_id){
  //     console.log("teeeeeeeeest")
  //     return () => {
  //       window.removeEventListener('beforeunload', alertUser)
  //       window.removeEventListener('unload', destroyGame)
  //       destroyGame()
  //     } 
  //   } else if (userId == game.player2_id) {
  //     return () => {
  //       window.removeEventListener('beforeunload', alertUser)
  //       window.removeEventListener('unload', forfeitGame)
  //       forfeitGame()
  //     }
  //   }
  // }, [])

  const alertUser = e => {
    e.preventDefault()
    e.returnValue = ''
  }
  const destroyGame = () => {
    fetch(`https://pyramid-race-api.herokuapp.com/games/${id}`, {
      method: "delete",
      headers: {
        Authorization: `${tokenCookie}`,
        "Content-Type": "application/json",
      },
    })
  }

  const forfeitGame = () => {
    const data = {
      game: {
        winner_id: game.player1_id,
        turn: "gameEnded"
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
  }



  return (
    <div className="game_page">
      { userId == game.player1_id && (
        <Prompt
          message={() => 'Si vous quittez cette page la partie sera perdue !'}
        />
      )}
      { userId == game.player2_id && (
        <Prompt
          message={() => 'Si vous quittez cette page, vous serez automatiquement déclaré forfait !'}
        />
      )}

      <ModalDiv modalIsOpen={modalIsOpen} closeModal={closeModal} step={currentStep}/>
      {((gameOn && userId == game.player2_id && game.turn == "player2") || (gameOn && userId == game.player1_id && !game.turn)) && (
        <>
          <Countdown onExpire = {nextQuestion} resetTick = {currentQuestionIndex}/>
          <QuestionCard
            question = {currentQuestion.question}
            correct_answer = {currentQuestion.correct_answer}
            incorrect_answers = {currentQuestion.incorrect_answers}
            nextQuestion = {nextQuestion}
          />
          <div id="test"></div>
        </>
      )}
      <div className="game_content">
        <img className="pyramid" src={Pyramid} />
      </div>
    </div>
  );
};

export default Game;
