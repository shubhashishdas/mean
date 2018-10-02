const express = require('express');
const router = express.Router();
const Company = require('../Models/Company');


router.get('', (req, res, next) => {
    Company.find().then((companies) => {
        res.status(200).json({ isSuccess: true, data: companies });
    }).catch(() => {
        res.status(400).json({ isSuccess: false });
    })
});

router.post('/add', (req, res, next) => {
    const company = new Company({
        companyName: req.body.companyName,
        address: req.body.address
    });
    company.save()
        .then((response) => {
            console.log('Company added');
            console.log(response);
            res.status(201).json({ isSuccess: true, id: response._id });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ isSuccess: false });
        });
});

router.get('/:id', (req, res, next) => {
    let companyId = req.params.id;
    Company.findById(companyId)
        .then((response) => {
            console.log(response);
            res.status(200).json({ isSuccess: true, data: response });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ isSuccess: false });
        });
});

router.put('/:id', (req, res, next) => {
    let companyId = req.params.id;
    const company = new Company({
        _id: req.body.id,
        companyName: req.body.companyName,
        address: req.body.address
    });
    Company.updateOne({ _id: companyId }, company)
        .then((response) => {
            console.log(response);
            res.status(200).json({ isSuccess: true });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ isSuccess: false });
        });
});

router.delete('/:id', (req, res, next) => {
    Company.deleteOne({ _id: req.params.id })
        .then((response) => {
            console.log(response);
            res.status(200).json({ isSuccess: true })
        })
        .catch((error) => {
            res.status(400).json({ isSuccess: false })
        });
});

module.exports = router;