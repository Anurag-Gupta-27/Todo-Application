import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import './App.css';

function App() {
  const [todo, setTodo] = useState(""); //we make states so that on render we update the data and present it
  const [todos, setTodos] = useState([]); //we make states so that on render we update the data and present it
  const [showFinished, setshowFinished] = useState(true); //we make states so that on render we update the data and present it

  useEffect(() => {
    //here we fetch data from localstorage and set data if there exists some
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos)); //here we stringify the todos array and save it as json text i.e key-value pair
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished); //here we toggle the checkbox which shows us the task which are completed
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id); //here we are selecting the id of the element we want to edit to show it in the input to make changes to it
    setTodo(t[0].todo); //here we did 0 because on 0th place we have the id of the element which has to be edited
    let newTodos = todos.filter((item) => {
      return item.id !== id; //it returns use all the elements present in the todos array so that we can set it in on display
    });
    setTodos(newTodos); //here we set our new todos after editing that is
    saveToLS(newTodos); //all the tasks are then saved to localStorage
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      //here we filter all the elements which are not selected from the tasklist
      console.log(item)
      return item.id != id;
    });
    setTodos(newTodos); //and set them as our new tasks list
    saveToLS(newTodos); //and save the new list to localstorage
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]); //here we are adding data in our todos in format id, todo, isCompleted here our todo is what we gave value to our input text box
    setTodo(""); //here we are setting it blank for the user
    saveToLS(); //if we don't do this everytime we refresh our page it will have no tasks
  };

  const handleChange = (e) => {
    setTodo(e.target.value); //here we just takes the input from the user i.e his task
  };

  const handleCheckbox = (e) => {
    let id = e.target.name; //here we get the task whose checkbox was hit
    let index = todos.findIndex((item) => {
      //here we bring out its index
      return item.id === id;
    });
    let newTodos = [...todos]; //here we write [...todos] because it will render updated array to task every single space will be added in the file and we will be making and saving changes on this file and serving it on the web
    newTodos[index].isCompleted = !newTodos[index].isCompleted; //here we change it if it is ticked so we untick it and vice-versa
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <div className="container w-1/2 bg-green-300 mx-auto h-full">
        <h1 className="font-bold text-xl text-green-800 p-[12p]">
          Task Manager For All Your Tasks
        </h1>
        <h2 className="mt-3 text-start mx-[40px] font-bold text-lg">
          Add Your Tasks
        </h2>
        <div className="p-[15px] flex gap-4 justify-center">
          <input
            type="text"
            onChange={handleChange}
            value={todo}
            className="w-3/4 rounded-sm p-2"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-amber-600 rounded-sm w-[55px]"
          >
            Save
          </button>
        </div>
        <input
          className="my-4"
          id="show"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        <label className="mx-2" htmlFor="show">
          Show Finished
        </label>
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-2xl font-bold p-5">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className="flex p-6 justify-between">
                  <div className="content flex gap-4">
                    <input
                      onChange={handleCheckbox}
                      checked={item.isCompleted}
                      type="checkbox"
                      name={item.id}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex gap-3">
                    <button
                      className="bg-orange-300 rounded-sm w-[55px]"
                      onClick={(e) => handleEdit(e, item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-orange-300 rounded-sm w-[55px]"
                      onClick={(e) => {handleDelete(e, item.id)}}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
