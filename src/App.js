import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

// Fetching data using fetch Function
// fetch("https://catfact.ninja/fact")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });

// Fetching data using Axios Library
// axios
//   .get("https://catfact.ninja/fact")
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

function App() {
  const [catFact, setCatFact] = useState("");
  const [name, setName] = useState("");
  // const [age, setAge] = useState(0);
  const [age, setAge] = useState(null);
  const [excuse, setExcuse] = useState("");
  const [excuseName, setExecuseName] = useState("");

  const fetchCatFact = () => {
    axios
      .get("https://catfact.ninja/fact")
      .then((res) => {
        console.log(res.data);
        setCatFact(res.data.fact);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect is used to set the catFact when the component is rendered for firts time
  useEffect(() => {
    fetchCatFact();
  }, []);

  // If the restrict mode in index.js is used then the network request is done two times

  const predictAge = () => {
    axios
      .get(`https://api.agify.io/?name=${name}`)
      .then((res) => {
        console.log(res.data.age);
        // setAge(res.data.age);
        setAge(res.data);
      })
      .catch((err) => {
        console.log(err);
        setAge(0);
      });
  };

  const generateExcuse = (event) => {
    setExecuseName(event.target.value);
    axios
      .get(`https://excuser-three.vercel.app/v1/excuse/${excuseName}`)
      .then((res) => {
        console.log(res.data[0].excuse);
        setExcuse(res.data[0].excuse);
      })
      .catch((err) => {
        console.log(err);
        setExcuse("");
      });
  };

  return (
    <div className="App">
      <div className="catFact">
        <h1>Generate Cat Fact</h1>
        <button onClick={fetchCatFact}>Generate Cat Fact</button>
        <p>{catFact}</p>
      </div>
      <div className="predictAge">
        <h1>Predict Age using Name</h1>
        <label htmlFor="name">
          Enter the name whose age you want to predict
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Ex. Kishanlal..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <button onClick={predictAge}>Predict</button>
        <p>Name: {age?.name}</p>
        <p>Predicted Age: {age?.age}</p>
        <p>Count: {age?.count}</p>
        {/* '?' is used so that page should not brakedown when null is passed*/}
      </div>
      <div className="generateExcuse">
        <h1>Generate An Excuse</h1>
        <button onClick={generateExcuse}>college</button>
        <button onClick={generateExcuse}>family</button>
        <button onClick={generateExcuse}>office</button>
        <p>Excuse : {excuse}</p>
      </div>
    </div>
  );
}

export default App;
