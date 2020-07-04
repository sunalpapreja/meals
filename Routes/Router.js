const express = require('express');
var users = require('../Model/Db');
var router = express.Router();

var  generateAccessToken = ()=> {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 router.post("/login",(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    users.find({email:email}).then((user)=>{
        if(user.length>0)
        {
            if(user[0].password===password)
            {
                res.send(user[0]);
            }
            else
            {
                res.send("pass")
            }            
        }
        else
        {
            res.send("");
        }
    }).catch(err=>{
        console.log(err);
    })
});

router.post("/userDetails",(req,res)=>{
    const accessToken = req.body.accessToken;
    users.find({accessToken:accessToken}).then((user)=>{
        if(user.length>0)
        {
            res.send(user[0]);
        }
        else
        {
            res.send("");
        }
    }).catch((err)=>{
        console.log(err);
    });
});

router.post("/signup",(req,res)=>{
    var email = req.body.email;
    users.find({email:email}).then((result)=>{
        if(result.length===0)
        {
            var accessToken = generateAccessToken();
            var data = req.body;
            data.accessToken = accessToken;
            data.active = false;
            data.signupDate = new Date();
            var user = new users(data);
            user.save();
            res.send(data);        
        }
        else
        {
            res.send("");
        }
    })
});

router.post("/addMeal",(req,res)=>{
    var calories = req.body.calories;
    var name = req.body.name;
    var date = req.body.date;
    var accessToken = req.body.accessToken;
    users.updateOne({accessToken:accessToken},{$push:{meals:{name:name,calories:calories,date:date}}}).then(data=>{
        if(data.nModified)
        {
            res.send("done")
        }
    })
});

router.post("/getMeals",(req,res)=>{
    var accessToken = req.body.accessToken;

    users.find({accessToken:accessToken}).then((data)=>{
        if(data.length>0 && data[0].meals.length>0)
        {
            var meals = data[0].meals;
            var combinedMeals = [];
            var mealdates = [];
            for(var i=0;i<meals.length;i++)
            {
                mealdates.push(meals[i].date);
            }
            mealdates = mealdates.filter((value,index)=>{
                return mealdates.indexOf(value)===index;
            });

            for(var j=0;j<mealdates.length;j++)
            {
                var mealset = [];
                for(var k=0;k<meals.length;k++)
                {
                    if(meals[k].date===mealdates[j])
                    {
                        mealset.push({
                            name:meals[k].name,
                            calories:meals[k].calories,
                            id:meals[k]._id
                        })
                    }
                    
                }

                combinedMeals.push({
                    date:mealdates[j],
                    meals:mealset
                })
            }

            res.send(combinedMeals);
        }
        else
        {
            res.send("");
        }
    })
})

router.post("/deleteMeal",(req,res)=>{
    var id = req.body.id;
    var accessToken = req.body.accessToken;
    users.updateOne({accessToken:accessToken},{$pull:{meals:{_id:id}}}).then((data)=>{
        if(data.nModified)
        {
            res.send("done");
        }
        else
        {
            res.send("");
        }
    })
});

router.post("/editMeal",(req,res)=>{
    var id = req.body.id;
    var name = req.body.name;
    var date = req.body.date;
    var calories = req.body.calories;
    var accessToken = req.body.accessToken;
    users.updateOne({accessToken:accessToken},{$pull:{meals:{_id:id}}}).then((data)=>{
        if(data.nModified)
        {
            users.updateOne({accessToken:accessToken},{$push:{meals:{name:name,date:date,calories:calories}}}).then((updated)=>{
                if(updated.nModified)
                {
                    res.send("done");
                }
                else
                {
                    res.send("");
                }
            })
            
        }
        else
        {
            res.send("");
        }
    })
})

module.exports = router;