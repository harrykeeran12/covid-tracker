# covid-tracker
A covid tracking website using React, Node, Axios, Express and Chart.js
I used the code from https://github.com/harrykeeran12/covid-scraper that I rewrote in JavaScript. 

Then I put the backend together, using Express. I created endpoints using the asynchronous functions I had. 
I then connected the backend and frontend together, using Axios, and requests. I had to use the useEffect hook for this.  
I added a selectable component using https://github.com/JedWatson/react-select, so that you can choose the data you want to get. 

This allowed me to then display the data that I wanted, by requesting it from the backend. 
My secondary objective was to display this data in a more reader-friendly format, so I looked at https://github.com/chartjs/Chart.js. 
This was a component library that took in data and outputted it as a chart. 
I had to use the framework for React specifically; https://github.com/reactchartjs/react-chartjs-2.
