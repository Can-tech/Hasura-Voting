import { useState } from "react";
import style from "./styles.module.css";
import { useMutation } from "@apollo/client";
import { NEW_QUESTION_MUTATION } from "./queries";

const initialOptions = [{ title: "" }, { title: "" }];

const NewQuestion = () => {
  const [addQuestion, { loading, data }] = useMutation(NEW_QUESTION_MUTATION);
  console.log(loading);
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(initialOptions);

  const handleChangeOption = ({ target }) => {
    const newArray = options;
    newArray[target.id].title = target.value;

    setOptions([...newArray]);
  };
  const handleSave = () => {
    const filledOptions = options.filter((option) => option.title !== "");

    if (title === "" || filledOptions.length < 2) return false;

    addQuestion({
      variables: {
        input: {
          title,
          options: {
            data: filledOptions,
          },
        },
      },
    });
    setTitle("");
    setOptions(initialOptions);
  };

  return (
    <div className={style.bodyContent}>
      <h2>New Question</h2>
      <input
        className={style.inputStyle}
        placeholder="Type Your Question"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        disabled={loading}
      />
      <h2>Question Options</h2>
      {options.map((options, index) => (
        <div className={style.optionsWrapperDiv} key={index}>
          <input
            disabled={loading}
            className={style.options}
            type="text"
            placeholder="Type your option..."
            id={index}
            value={options.title}
            onChange={handleChangeOption}
          />
        </div>
      ))}
      <div>
        <button
          disabled={loading}
          className={style.saveOptionButton}
          onClick={() => setOptions([...options, { title: "" }])}
        >
          New Option
        </button>
        <button
          disabled={loading}
          onClick={handleSave}
          className={style.saveOptionButton}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default NewQuestion;
