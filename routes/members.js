const express = require('express');
const router = express.Router();

//Getting all
router.get('/', (req,res) => {
    res.send('Hello');

});
//Getting one

router.get('/:id', (req,res) => {
    
});
//creating one
router.post('/', (req,res) => {
    
});
//updating one
router.patch('/', (req,res) => {
    
});
//deleting one
router.delete('/', (req,res) => {
    
});


module.exports = router;