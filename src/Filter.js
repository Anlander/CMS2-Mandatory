import React, { Component } from 'react';
import axios from 'axios';
let API = 'http://localhost:8080/';

class Filter extends Component {
    setSortAndFilter(e) {
        e.preventDefault();
        let filter = [];
        let checks = document.getElementsByClassName('sortAndFilter');
        const getProducts = (sortUrl) => {
          if (!sortUrl) {
            sortUrl = "";
          }
          return fetch(`${API}api/collections/get/Products?filter[Stock][$gt]=0${sortUrl}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
          })
          .then(product => product.json())
          .then(product => product)
        };

        for ( let i = 0; i < checks.length; i++) {
            if(checks[i].checked) {
                filter.push(checks[i].value);
            }
        }
        this.props.checkBoxes(filter)
    }


      clearFilter(e) {
          e.preventDefault();
          let checks = document.getElementsByClassName('sortAndFilter');
          for ( let i = 0; i < checks.length; i++) {
                checks[i].checked = false;
          }
          this.props.checkBoxes([])
      }
  render() {
    return (
      <div className="filter-div">
        <form className="filter-form">

            <div className="filter box-and-radio">
              <strong>Filtrera efter:</strong>
              <span><input type="checkbox" className="sortAndFilter" value="?Stock_gt=0" id="test"/> Finns i lager</span>
            </div>
            <div className="filter-button filter">
              <button onClick={this.setSortAndFilter.bind(this)}>Filtrera</button>
              <button onClick={this.clearFilter.bind(this)}>Rensa Filter</button>
            </div>
        </form>
      </div>
    )
  }
}
export default Filter;
