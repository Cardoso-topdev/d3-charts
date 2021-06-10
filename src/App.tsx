import React from 'react'
import logo from './logo.svg'
import './App.scss'
import BasicLineChart from './components/BasicLineChart/BasicLineChart'
import BasicAreaChart from './components/BasicAreaChart/BasicAreaChart'
import BasicBarChart from './components/BasicBarChart/BasicBarChart'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BasicLineChart top={10} right={50} bottom={50} left={50} width={800} height={400} fill="yellow" />
        <BasicAreaChart top={10} right={50} bottom={50} left={50} width={1000} height={400} fill="tomato" />
        <BasicBarChart top={10} right={50} bottom={50} left={50} width={900} height={400} fill="tomato" />
      </header>
    </div>
  )
}

export default App
