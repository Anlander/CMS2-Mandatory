import React, { Component } from 'react';

class Filter extends Component {
    setSortAndFilter(e) {
        e.preventDefault();
        let filter = [];
        let checks = document.getElementsByClassName('sortAndFilter');
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
              <strong className="sorting-header">Sortera efter:</strong>
              <span><input type="radio" className="sortAndFilter" value="?_sort=Price:asc" name="price" />Pris, Stigande</span>
              <span><input type="radio" className="sortAndFilter" value="?_sort=Price:desc" name="price" />Pris, Fallande</span>
            </div>
            <div className="filter box-and-radio">
              <strong>Filtrera efter:</strong>
              <span><input type="checkbox" className="sortAndFilter" value="?StockQuantity_gt=0" id="test"/> Finns i lager</span>
              <span><input type="checkbox" className="sortAndFilter" value="?Category=Training" id="test"/> TräningsVagn</span>
              <span><input type="checkbox" className="sortAndFilter" value="?Category=American" /> JänkarVagn</span>
              <span><input type="checkbox" className="sortAndFilter" value="?Category=Vanlig" /> VanligVagn</span>
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
