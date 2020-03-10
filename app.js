const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
app.use('/static', express.static('public'))
// app.use();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.redirect('/static/');
})
app.post('/api/calculateEmi', (req, res) => {
    console.log("Request Body --->", req.body);
    /*
    totalPrincipal: totalPrincipal,
    rateOfInterest: rateOfInterest,
    timePeriod: timePeriod
    */
    let responseBody = {
        statusMessage: ''
    }
    if (isNaN(req.body.totalPrincipal) || req.body.totalPrincipal <= 0) {
        responseBody.statusMessage = "Enter totalPrincipal";
        console.log(responseBody, "no totalPrincipal")
        res.status(201).send(responseBody)
    }
    else if (isNaN(req.body.rateOfInterest) || req.body.rateOfInterest <= 0) {
        responseBody.statusMessage = "Enter rateOfInterest";
        console.log(responseBody, "no rateOfInterest")
        res.status(201).send(responseBody)
    }
    else if (isNaN(req.body.timePeriod) || req.body.timePeriod <= 0) {
        responseBody.statusMessage = "Enter timePeriod";
        console.log(responseBody, "no timePeriod")
        res.status(201).send(responseBody)
    }
    else {

        responseBody.emiPerMonth = parseFloat((req.body.totalAmount / req.body.noOfMonths));
        console.log(responseBody, "response body")
        responseBody.statusMessage ="Your per month emi is $"+ parseFloat((req.body.totalAmount / req.body.noOfMonths));


        responseBody.paymentAmount = req.body.totalPrincipal;
        responseBody.principalAmountPaid = 0;
        responseBody.intrestAmountPaid = 0;
        responseBody.loanOutstanding =  req.body.totalPrincipal;
        res.status(200).send(responseBody);
    }
})

app.listen(port, () => console.log(`calculateEmi app listening on port ${port}!`))

