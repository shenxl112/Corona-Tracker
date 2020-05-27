import axios from 'axios';  // axios is used to make api call

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {  //we need call this func
    let changeableUrl = url;

    if(country) {
        changeableUrl = `${url}/countries/${country}`
    }

    try {
        const { data: {confirmed, recovered, deaths, lastUpdate }} = await axios.get(changeableUrl)
        return { confirmed, recovered, deaths, lastUpdate };

        // const modifiedData = {  //return an boject
        //     confirmed: data.confirmed,
        //     recovered: data.recovered,
        //     deaths: data.deaths,
        //     lastUpdate: data.lastUpdate,
        // }
        // return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))
        return modifiedData;
        // console.log(data); // to be able to see console log we need call the function
    } catch (error) {
        console.log(error);
    }// return an object
}

export const fetchCountries = async () => {
    try {
        const { data: { countries }} = await axios.get(`${url}/countries`);
        // console.log(data)
        return countries.map((country) => country.name) // we only need country name
    } catch (error) {
        console.log(error);
    }
}