const express = require("express");
const {asyncHandler} = require('./utils/utils');
const {Event, City, User,Attendee} = require('../models');
const router = express.Router();



router.get('/', asyncHandler( async (req,res)=>{
    res.render('dashboard');
}));
router.get('/cities/:id(\\d+)',asyncHandler( async (req,res)=>{
    let userId = req.params.id;
    let userIdN = Number.parseInt(userId);
    let user = await User.findByPk(userIdN);
    const events = await Event.findAll({where:{cityId:user.cityId},include:{model:City}});
    events.push(user.firstName);
    const aEvents = await Attendee.findAll({attributes:['id','eventId'],where:{userId},include:{model:Event,as:'event'}});
    // const aEvents = aEvents[0].Attendee.dataValues.event
    res.json({events, aEvents});
}))












module.exports = router;
