const express = require('express');
const router = express.Router();
const Company = require('../Models/Company');
const multer = require('multer');
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "./backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

router.get('', (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const companyQuery = Company.find();
    if (pageSize && currentPage) {
        companyQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    companyQuery
        .then((companies) => {
            return Company.count().then((count) => {
                return [count, companies];
            })
        })
        .then((result) => {
            res.status(200).json({ isSuccess: true, totalRecords: result[0], data: result[1] });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ isSuccess: false });
        })
});

router.post('/add', multer({ storage: storage }).single('image'), (req, res, next) => {
    const baseUrl = req.protocol + '://' + req.get('host');
    const company = new Company({
        companyName: req.body.companyName,
        address: req.body.address,
        imagePath: baseUrl + '/images/' + req.file.filename
    });
    company.save()
        .then((data) => {
            res.status(201).json({
                isSuccess: true,
                post: {
                    id: data._id,
                    companyName: data.companyName,
                    address: data.address,
                    imagePath: data.imagePath,
                }
            });
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
            res.status(200).json({ isSuccess: true, data: response });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ isSuccess: false });
        });
});

router.put('/:id', multer({ storage: storage }).single('image'), (req, res, next) => {
    let imagepath = req.body.imagePath | '';

    if (req.file) {
        const baseUrl = req.protocol + '://' + req.get('host');
        imagePath = baseUrl + '/images/' + req.file.filename
    }
    let companyId = req.params.id;
    const company = new Company({
        _id: req.body.id,
        companyName: req.body.companyName,
        address: req.body.address,
        imagePath: imagePath
    });
    Company.updateOne({ _id: companyId }, company)
        .then((response) => {
            res.status(200).json({ isSuccess: true });
        })
        .catch((error) => {
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