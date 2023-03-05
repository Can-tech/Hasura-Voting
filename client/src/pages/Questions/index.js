import { useSubscription } from "@apollo/client";

import { QUESTION_SUBSCRIPTION } from "./queries";
import ErrorPage from "../ErrorPage";
import LoadingPage from "../LoadingPage";
import { Link } from "react-router-dom";
import style from "./styles.module.css";

const Questions = () => {
  const { error, loading, data } = useSubscription(QUESTION_SUBSCRIPTION);
  if (error) {
    <ErrorPage />;
  }
  if (loading) {
    <LoadingPage />;
  }
  return (
    <div
      style={{
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2>Questions</h2>
      {data?.questions.map((question) => (
        <Link
          style={{ textDecoration: "none" }}
          key={question.id}
          to={`/q/${question.id}`}
        >
          <div className={style.questionsHeaders} key={question.id}>
            {question.title}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Questions;
