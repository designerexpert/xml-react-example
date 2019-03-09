import React, { Component } from 'react';
import XMLParser from 'react-xml-parser';
import html2canvas from "html2canvas";
import './App.css';
import { mockxml } from "./mockxml.js";
import { saveAs } from './utils';
class App extends Component {
  saveScreenShot = () => {
    const input = document.getElementById('screenshot-element');
    html2canvas(input).then((canvas) => {
      saveAs(canvas.toDataURL(), 'screenshot.png');
    });
  }
  render() {
    console.log('MOCK XML', mockxml)
    console.log('MOCK XML type', typeof mockxml)
    const parsedXML = new XMLParser().parseFromString(mockxml);
    console.log('PARSED XML HOPE', parsedXML)
    const BooksTableHeaders = [];
    const BooksTable = parsedXML.children.map((item, index) => {
      const bookId = item.id;
      const TableColumns = item.children.map((tItem, tIndx) => {
        if (index === 0) {
          BooksTableHeaders.push(
            <th key={'HEAD_KEY' + tIndx} style={{ backgroundColor: "black", color: "white" }}>
              {tItem.name.split(/[_-]/g).join(' ').toUpperCase()}
            </th>
          )
        }
        return (<td key={`TD_${bookId}_${Date.now()}_${tIndx}`} style={{ color: "black", border: "1px solid black" }}>
          {tItem.value}
        </td>)
      })
      return (<tr key={`TR_${bookId}_${Date.now()}_${index}`} style={{ border: "1px solid black" }}>{TableColumns}</tr>)
    })

    return (
      <div className="App" >
        <div id='screenshot-element' style={{ width: "100%" }}>
          <table>
            {BooksTableHeaders}
            {BooksTable}
          </table>
        </div>
        <button onClick={this.saveScreenShot}>SAVE SCREENSHOT</button>
      </div>
    );
  }
}

export default App;
