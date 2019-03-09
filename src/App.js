import React, { Component } from 'react';
import XMLParser from 'react-xml-parser';
import html2canvas from "html2canvas";
import './App.css';
import { mockxml } from "./mockxml.js";
import { saveAs } from './utils';
class App extends Component {
  state = {
    parsed: {},
  }

  componentDidMount() {
    // Receive Data from HTTP Request or File...
    this.parseXML(mockxml);
  }

  saveScreenShot = () => {
    const input = document.getElementById('screenshot-element');
    html2canvas(input).then((canvas) => {
      saveAs(canvas.toDataURL(), 'screenshot.png');
    });
  }

  parseXML = (source) => {
    const parsed = new XMLParser().parseFromString(source);
    this.setState({ parsed })
  }

  generateTable = (source) => {
    if (Array.isArray(source.children)) {
      const HeadersRow = [];
      const DataRows = source.children.map((item, index) => {
        const ID = item.id;
        const TableColumns = item.children.map((tItem, tIndx) => {
          if (index === 0) {
            HeadersRow.push(
              <th key={`header_${tIndx}`}>
                {tItem.name.split(/[_-]/g).join(' ').toUpperCase()}
              </th>
            )
          }
          return (
            <td key={`${ID}_${tIndx}`} >
              {tItem.value}
            </td>
          )
        })
        return (<tr key={`${ID}_${index}`}>{TableColumns}</tr>)
      })
      return (
        <table>
          <thead>
            <tr>
              {HeadersRow}
            </tr>
          </thead>
          <tbody>
            {DataRows}
          </tbody>
        </table>
      );
    } else {
      return null;
    }
  }

  render() {
    const { parsed } = this.state;

    const Table = this.generateTable(parsed);

    return (
      <div className="App" >
        <div className="app-container">
          <div id='screenshot-element'>
            {Table}
          </div>
          <div className="app-footer">
            <button onClick={this.saveScreenShot} >SAVE SCREENSHOT</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
