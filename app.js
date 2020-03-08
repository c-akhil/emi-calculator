const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 5555
app.use('/static', express.static('public'))
// app.use();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/api/calculateEmi', (req, res) => {
    console.log("Request Body --->", req.body);
    /*
    totalPrincipal: totalPrincipal,
    rateOfInterest: rateOfInterest,
    timePeriod: timePeriod
    */
    let responseBody = {
        statuMessage: ''
    }
    if (isNaN(req.body.totalPrincipal) || req.body.totalPrincipal <= 0) {
        responseBody.statuMessage = "Enter totalPrincipal";
        console.log(responseBody, "no totalPrincipal")
        res.status(201).send(responseBody)
    }
    else if (isNaN(req.body.rateOfInterest) || req.body.rateOfInterest <= 0) {
        responseBody.statuMessage = "Enter rateOfInterest";
        console.log(responseBody, "no rateOfInterest")
        res.status(201).send(responseBody)
    }
    else if (isNaN(req.body.timePeriod) || req.body.timePeriod <= 0) {
        responseBody.statuMessage = "Enter timePeriod";
        console.log(responseBody, "no timePeriod")
        res.status(201).send(responseBody)
    }
    else {
        
        // responseBody.emiPerMonth = parseFloat((req.body.totalAmount / req.body.noOfMonths));
        console.log(responseBody, "response body")
        responseBody.statuMessage = "Please write calculation logic"
        res.status(200).send(responseBody)
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

