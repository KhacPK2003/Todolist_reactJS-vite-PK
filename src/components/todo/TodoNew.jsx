import { useState } from "react";

const TodoNew = (props) => {
  
    //useState hook
//   const valueInput =  "Khac"
    const [valueInput, setValueInput] = useState("Khac")

  const { addNewTodo } = props;

  // addNewTodo("PhamKhac")
  const handleClick = () => {
    addNewTodo(valueInput)
    setValueInput("")
  }

  const handleOnChange = (name) => {
    setValueInput(name)
  }
  return (
    <div className="todo-new">
      <input type="text" 
            onChange={(event) => handleOnChange(event.target.value)}
            value={valueInput}
      />
      <button 
            style={{ cursor: "pointer" }} 
            onClick={handleClick}>
      Add</button>
      <div>
        My text input is = {valueInput}
      </div>
    </div>
  );
};

export default TodoNew;
