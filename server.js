const express = require('express');
const fs = require('fs');

const app = express();
// middleware
app.use(express.json());


//get the object keys
/**
 * function to write key values in body.csv
 */
function keyWrite() {
    const userInfo = {
        firstName: "firstName",
        lastName: "firstName",
        pincode: "firstName",
        address: "firstName",
        mobileNo: "firstName"
    }
    let a = []
    for (const key in userInfo) {
        if (key) {
            a.push(key);
        }
    }
    let keyAppend = a.join(',');
    console.log(keyAppend);
    fs.writeFile('./files/body.csv', keyAppend, 'utf-8', function (err) {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log('success');
    });
}

app.get('/task', (req, res) => {
    res.send('test get');
});


app.post('/task', (req, res) => {
    try {
        const userInfo = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            pincode: req.body.pincode,
            address: req.body.address,
            mobileNo: req.body.mobileNo
        }
        let value = [];
    
        for (key in userInfo) {
            if (key) {
                // keys.push(key);
                value.push(userInfo[key]);
            }
        }
        let dataToWrite = `\n${value.join(',')}`;
        fs.appendFile('./files/body.csv', dataToWrite, 'utf-8', function (err) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log(`the object values has been appended`);
        });
        res.status(200).send(
            {
                "status": 200,
                "messaage": "success",
                "data": userInfo
            });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            "status": 200,
            "messaage": "success",
            "data": userInfo
        });
    }
});

keyWrite();
app.listen(3000, () => console.log(`server running on http://localhost:3000/`))