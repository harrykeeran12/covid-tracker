const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors')
const app = express();
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST']
  }
    
  )
)


/* Functions */
async function scrapeCompleteTable(){
  const url = 'https://www.worldometers.info/coronavirus/';
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  
  const data = await page.evaluate(() => {
    const trs = Array.from(document.querySelectorAll('#main_table_countries_today tbody tr:not(.total_row_world)'))
    return trs.map(tr => tr.innerText)
  });
  const listdata = data.map(function(e){
    return e.split('\t')
  })
  browser.close()
  return listdata
  
}


async function scrapeWorldData(){
  const url = 'https://www.worldometers.info/coronavirus/';
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  
  const data = await page.evaluate(() => {
    const trs = Array.from(document.querySelectorAll('#main_table_countries_today tbody .total_row_world'))
    return trs.map(tr => tr.innerText)
  });
  const listdata = data.map(function(e){
    return e.split('\t')
  })
  browser.close()
  return listdata[0]
}

async function countrySearch(data, country){
  for (let i = 0; i < data.length; i++) {
    if (data[i][1] == country) {
      return data[i]
    }
  }
}
async function allCountries(data){
  let countries = []
  for (let i = 0; i < data.length; i++) {
    countries.push(data[i][1])
  }
  return countries
}


async function findCountry(country){
  const data = await scrapeCompleteTable().then(function(result){
    return countrySearch(result, country);
  });
  return await data
}
async function getTotalCountries(){
  const data = await scrapeCompleteTable().then(function(result){
    return allCountries(result);
  });
  
  const countries = data;
  return await countries

  /* return await data; */
  
}



async function countryData(country){
  const data = findCountry(country).then(function(result){
    
    console.log('Country =', result[1])
    console.log('Total Cases =', result[2])
    console.log('Total Deaths =', result[4])
    console.log('Total Recovered =', result[6])
    let output = {'country': result[1], 'total_cases': result[2], 'total_deaths': result[4], 'total_recovered': result[6]}
    return output;
  })
  return await data
}


/* Endpoints */
app.get('/countries/:country/rawdata', function(req, res){
  const { country } = req.params
  findCountry(country).then(result => {
    res.send(result);
    console.log('Sent raw data of ' + country)
  })
})


app.get('/countries/:country', function(req, res){
  const { country } = req.params
  countryData(country).then(result => {
    res.send(result);
    console.log('Sent data of ' + country)
  })
})

app.get('/countries', function(req,res){
  getTotalCountries().then(result=>{
    res.send(result);
    console.log('Sent list of countries.')
  })
})

app.get('/alldata', function(req,res){
  scrapeCompleteTable().then(result=> {
    res.send(result)
    console.log('Sent all data.')
  })
})

app.get('/worlddata', function(req, res){
  scrapeWorldData().then(result =>{
    res.send(result)
    console.log('Sent world data.')
  })
})


const port = process.env.PORT || 3001
app.listen(port, () => console.log(`listening on port ${port}...`))