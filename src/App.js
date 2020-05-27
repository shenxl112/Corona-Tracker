import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

import coronaImage from './images/covid_19.jpg';

class App extends React.Component {
  state = {      //this is for pass date to Cards
    data: {},
    country: '',
  }
  // Called immediately after a component is mounted. 
  // Setting state here will trigger re-rendering.
  async componentDidMount() {   //content visible on screen
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
    // console.log(fetchedData); //내가 수치보려고 추가한것
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);  // fetch the data (get the country to here)
    this.setState({ data: fetchedData, country: country })  //after set state card should show specific country data on Cards
    // console.log(country);
    // console.log(fetchedData);
  }

  render() {
    return (
      <div className={styles.container}>
        <img src={coronaImage} className={styles.image} alt="COVID-19"/>
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Cards data={this.state.data} />
        <Chart data={this.state.data} country={this.state.country}/>
      </div>
    );
  }
}

export default App;
