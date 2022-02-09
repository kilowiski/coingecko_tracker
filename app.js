const express = require('express')
const fs = require('fs')
const app = new express()
//1. Import coingecko-api
const CoinGecko = require('coingecko-api');

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
var btc_usd = async() =>{
  let data = await CoinGeckoClient.coins.fetchMarketChart('bitcoin',{"vs_currency":"usd"});
  return data
}
//4. print price only
btc_usd().then((data)=>{
  printer(data)
})

function printer(data){
  let prices = data.data.prices
  fs.writeFileSync('mindata.json', "[")
  for (let i =0; i<prices.length ; i=i+1){
    let mindata={
      "date":unixToHuman(prices[i][0]).toLocaleDateString(),
      "time":`${unixToHuman(prices[i][0]).getHours()}:${unixToHuman(prices[i][0]).getMinutes()}:${unixToHuman(prices[i][0]).getSeconds()}`,
      "price":prices[i][1]
    }
    let mindataJSON = JSON.stringify(mindata, null, 2);
    fs.appendFileSync('mindata.json',  `${mindataJSON},`)
    console.log(mindata)
  }
  fs.appendFileSync('mindata.json', "]")
}

function unixToHuman(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
  var humanDateFormat = a.toLocaleString() //2019-12-9 10:30:15
  return a;
}


app.get('')
app.listen(80)
