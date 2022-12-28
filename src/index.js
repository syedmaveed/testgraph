import React from "react";
import ReactDOM from "react-dom/client";
import {
   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
} from 'recharts';

const data = [
  {
    name: 'Page A', uv: 3000, pv: 2400, amt: 2600, red: 5630
  },
  {
    name: 'Page B', uv: 5500, pv: 1398, amt: 2210, red: 7000,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 999, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 2200, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2299, pv: 2800, amt: 2500,
  },
  {
    name: 'Page G', uv: 2200, pv: 4300, amt: 2100,
  },
];

const color = ["#8884d8", "#82ca9d", "orange", "pink"]
class App extends React.Component {
  state = {
    type: "Line"
  }
  fetchChart = () => {
    const {type} = this.state
    return <MyLineChart key={type}/>
  }
  render(){
    return (
      <div>
      {this.fetchChart()}
      </div>
    )
  }
}

class MyLineChart extends React.Component {
  getLineChart = () => {
    console.log(data)
    const keysArr = Object.keys(data[0]).slice(1);
    console.log("data",Object.keys(data[0]))
    const lineArr= [];
    keysArr.forEach((item, index)=> {
      lineArr.push(<Line type="monotone" dataKey={item} stroke={color[index]} />)
    })
    console.log("Line")
    return lineArr;

  }

  modifyFormatter = (value, name, props) => {
    const nameJSX = <span><span style={{
      display: "inline-block",
      marginRight: "5px",
      borderRadius: "10px",
      width: "10px",
      height: "10px",
      backgroundColor: props.color
    }}></span>{name} : {value}</span>
    return [nameJSX];
  }
  render() {
    return (
      // <ResponsiveContainer>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false}/>
          <XAxis dataKey={Object.keys(data[0])[0]} />
          <YAxis />
          <Tooltip formatter={this.modifyFormatter}/>
          <Legend />
        {this.getLineChart()}
        </LineChart>
      //  </ResponsiveContainer>
    );
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);