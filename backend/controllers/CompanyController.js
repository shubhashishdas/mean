const Company = require('../models/Company');

module.exports.companyList = (req, res, next) => {
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
};

module.exports.createCompany = (req, res, next) => {
    const baseUrl = req.protocol + '://' + req.get('host');
    const company = new Company({
        companyName: req.body.companyName,
        address: req.body.address,
        // imagePath: baseUrl + '/images/' + req.file.filename,
        creator: req.userData.userId
    });
    company.save()
        .then((data) => {
            res.status(201).json({
                isSuccess: true,
                post: {
                    id: data._id,
                    companyName: data.companyName,
                    address: data.address,
                    // imagePath: data.imagePath,
                    creator: data.creator
                }
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ isSuccess: false });
        });
};

module.exports.getCompany = (req, res, next) => {
    let companyId = req.params.id;
    Company.findById(companyId)
        .then((response) => {
            res.status(200).json({ isSuccess: true, data: response });
        })
        .catch((error) => {
            res.status(400).json({ isSuccess: false });
        });
};

module.exports.updateCompany = (req, res, next) => {
    // let imagepath = req.body.imagePath | '';
    let companyId = req.params.id;
    const company = new Company({
        _id: req.body.id,
        companyName: req.body.companyName,
        address: req.body.address,
        // imagePath: imagepath
    });
    Company.updateOne({ _id: companyId, creator: req.userData.userId }, company)
        .then((response) => {
            if (response.n > 0) {
                res.status(200).json({ isSuccess: true, message: 'Record successfully updated.' });
            } else {
                res.status(401).json({ isSuccess: false, message: 'Unauthorized access' });
            }
        })
        .catch((error) => {
            res.status(400).json({ isSuccess: false });
        });
};

module.exports.deleteCompany = (req, res, next) => {
    Company.deleteOne({ _id: req.params.id, creator: req.userData.userId })
        .then((response) => {
            if (response.n > 0) {
                res.status(200).json({ isSuccess: true, message: 'Company deleted successfully.' });
            } else {
                res.status(401).json({ isSuccess: false, message: 'Unauthorized access' });
            }
        })
        .catch((error) => {
            res.status(400).json({ isSuccess: false })
        });
};
