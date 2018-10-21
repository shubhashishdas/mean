const express = require('express');
const router = express.Router();
const fileUpload = require('../middleware/fileUpload');
const auth = require('../middleware/authenticate');
const companyController = require('../controllers/CompanyController');

router.get('', auth, companyController.companyList);

router.post('/add', auth, fileUpload, companyController.createCompany);

router.get('/:id', auth, companyController.getCompany);

router.put('/:id', auth, fileUpload, companyController.updateCompany);

router.delete('/:id', auth, companyController.deleteCompany);

module.exports = router;