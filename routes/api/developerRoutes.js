const { 
    getDevelopers, 
    getOneDeveloper, 
    createOneDeveloper, 
    updateOneDeveloper, 
    deleteOneDeveloper, 
    addConnection, 
    deleteConnection,
 } = require("../../controllers/developerController");

const router = require('express').Router();


// ============================= Developer Routes =============================

router.get('/', getDevelopers);

router.get('/:developerId', getOneDeveloper);

router.post('/', createOneDeveloper);

router.put('/:developerId', updateOneDeveloper);

router.delete('/:developerId', deleteOneDeveloper);



// ============================= Connection Routes =============================

router.post('/:developerId/connections/:connectionId', addConnection);

router.delete('/:developerId/connections/:connectionId', deleteConnection);

module.exports = router;
