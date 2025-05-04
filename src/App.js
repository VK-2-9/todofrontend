import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [eTask, setETask] = useState("");
  const [taskArr, setTaskArr] = useState([]);

  const handleChange = (e) => {
    setETask(e.target.value);
  };
// http://localhost:5000/tasklist
// https://todobackend-5o3r.onrender.com
  useEffect(() => {
    axios.get("https://todobackend-5o3r.onrender.com/tasklist").then((data) => {
      setTaskArr(data.data);
    });
  }, []);

  const add=()=>{
    if(eTask!==""){
      axios.post("https://todobackend-5o3r.onrender.com/addtask",{eTask:eTask}).then((data)=>{
        setTaskArr([...taskArr,data.data])
      })
     
    }
    }
  const remove=(task,id)=>{
      console.log(task)
      axios.post("https://todobackend-5o3r.onrender.com/removetask",{task:task})
      setTaskArr(taskArr.filter((item)=>{
        return id !== item._id
      }))
  }  
   

  return (
    <div className="bg-blue-600 w-[70%] md:w-[50%] ] p-2  mx-[15%] md:mx-[20%] my-14 md:my-36 md:p-9  border rounded-xl ">
      <h1 className="text-white font-bold md:text-2xl text-center my-6">
        Your personalized activities list
      </h1>

      <div className="bg-[#EFEFEF] md:my-5 p-2 md:p-6 flex-col justify-center rounded-md ">

        <div className=" border-2 rounded-3xl border-blue-600  px-3 pr-0 ml-[1rem] md:ml-[10rem] max-w-fit  my-5">
          <input
            className="p-2 bg-transparent placeholder:text-black focus:outline-none w-[8em] md:w-[250px]"
            placeholder="Enter your task"
            value={eTask}
            onChange={handleChange}
          ></input>
          <button className="bg-blue-600 rounded-3xl m-0 text-white font-bold border-blue-600 py-2 px-5 hover:scale-105" onClick={add}>Add</button>
        </div>

        <div>
          {taskArr.map((item, index) => {
            return (
              
              <div
                key={index}
                style={{backgroundColor:((index+1)%2)?"#a9d1dd":"#2563EB"}}
                className=" flex justify-between  py-2 px-6"
              >
                <p>
                  {index + 1}. {item.task}{" "}
                </p>
                <button onClick={()=>remove(item.task,item._id)}  className="hover:scale-[124%]">⛔</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
