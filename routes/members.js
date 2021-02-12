const express = require('express');
// to get the router 
const router = express.Router();
const Member = require('../models/memberModel');

//Getting all
router.get('/', async (req,res) => {
    try {
        const members = await Member.find()
        res.json(members);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Getting one
router.get('/:id', getMembers, (req,res) => {
    res.json(res.member);
});

//Creating one
router.post('/', async (req,res) => {
    const mem = new Member({
        name: req.body.name,
        Date_Joined: req.body.Date_Joined,
        status: req.body.status
    })
    //to save the new member
    try {
        const newMember = await mem.save();
        res.status(201).json(newMember); //send stat code of 201 for ok report
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Updating one
//patch helps for need based update
router.patch('/:id', getMembers, async (req,res) => {
    if (req.body.name != null) {
        res.member.name = req.body.name;
    }
    if (req.body.Date_Joined != null) {
        res.member.Date_Joined = req.body.Date_Joined;
    }
    if (req.body.status != null) {
        res.member.status = req.body.status;
    }
    try {
        const updatedMember = await res.member.save();
        res.json(updatedMember);
    } catch (err) {
        res.status(400).json( { message: err.message });

    }
});

//Deleting one
router.delete('/:id', getMembers, async (req,res) => {
    try {
        await res.member.remove();
        res.json({ message: "Member Deleted!"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//creating an async middle ware to use for other api calls
async function getMembers(req, res, next) {
    let member;
    try {
        member = await Member.findById(req.params.id);
        if (member == null) {
            return res.status(404).json({message: "Cannot find member" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.member = member;
    //next will allow us to move to the next part after the middle ware
    next();
}
module.exports = router;