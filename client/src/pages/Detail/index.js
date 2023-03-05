import { useParams } from "react-router-dom";
import { useMutation, useSubscription } from "@apollo/client";
import { QUESTION_DETAIL_SUBSCRIPTION, NEW_VOTE_MUTATION } from "./queries";
import { useState } from "react";
import style from "./styles.module.css";

import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";

const Detail = () => {
  const [isVoted, setIsVoted] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState();
  const { id } = useParams();
  const { loading, error, data } = useSubscription(
    QUESTION_DETAIL_SUBSCRIPTION,
    {
      variables: {
        id,
      },
    }
  );
  const [newVote, { loading: loadingVote }] = useMutation(NEW_VOTE_MUTATION, {
    onCompleted: () => {
      setIsVoted(true);
    },
  });
  const handleClickVote = (optionId) => {
    newVote({
      variables: {
        input: {
          option_id: selectedOptionId,
        },
      },
    });
  };
  if (loading) {
    return <LoadingPage />;
  }
  if (error) {
    return <ErrorPage message={error.message} />;
  }

  const {
    questions_by_pk: { options, title },
  } = data;
  const total = options.reduce(
    (t, value) => t + value.votes_aggregate.aggregate.count,
    0
  );
  return (
    <div style={{ marginLeft: "20px" }}>
      <div>
        <h2>{title}</h2>
      </div>
      {options.map((option, i) => (
        <div key={i}>
          <label htmlFor={i}>
            <input
              type="radio"
              name="selected"
              id={i}
              value={option.id}
              onChange={({ target }) => setSelectedOptionId(target.value)}
            />
            <span>{option.title}</span>
            {isVoted && (
              <span className={style.voteCount}>
                (%
                {(
                  (option.votes_aggregate.aggregate.count * 100) /
                  (total === 0 ? 1 : total)
                ).toFixed(2)}
                )
              </span>
            )}
          </label>
          {isVoted && (
            <div>
              <progress
                value={option.votes_aggregate.aggregate.count}
                max={total}
              />
            </div>
          )}
        </div>
      ))}
      {!isVoted && (
        <button
          className={style.buttonVote}
          disabled={loadingVote}
          onClick={handleClickVote}
        >
          Vote
        </button>
      )}
    </div>
  );
};

export default Detail;
