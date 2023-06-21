

const express = require('express')
const router = express.Router()
const academy = require('../Schema/academy')
const industry = require('../Schema/industry')
const Otp = require('../Schema/otp')
const bcrypt  = require('bcrypt')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
const otp = require('otp-generator')
const job=require('../Schema/jobs')
// const academyProfile=require('../Schema/academy')
const JWT_SECRET = "ciwbuconciwevccwu1229238c/idb871cb91383hc}28vwrgbw8b748{62[]()68cwv";

router.post('/', async(req, res)=>{
    console.log('hello user')
    res.send('hello world')
})


router.get('/getalljob',async(req,res)=>{
    console.log('from the getall api');
    const user=await job.find();
    if(user){
        res.json({
            user
        })
    }
    else{
        res.json({
            message:"failed"
        })
    }
}),
router.post('/job_post',async(req,res)=>{
    const user=new job(req.body)
    const result=await user.save();
    if(result)
    {
        res.json({
            message:"success"
        })
    }
    else
    {
        console.log('fail')
    }
})

router.post('/register_academy', async(req, res)=>{
    const{name, email, password, affiliation, university, degree, position, dept} = req.body;
    const encryptedPassword = await bcrypt.hash(password,10);
    try {
        const otheruser = await academy.findOne({email:email});
        if(otheruser){
            return res.json({
                status:409, 
                message:"user already registered as industry person"
            })
        }else{
            const olduser =await industry.findOne({email:email});
            if(olduser){
                return res.json({
                    status:409,
                    message:"user already exist"
                })
            }
            else{
                const data = await new academy({
                    name:name,
                    email:email,
                    affiliation:affiliation,
                    university:university,   
                    degree:degree,
                    position: position,
                    dept:dept,
                    password:encryptedPassword
                })
                const result = data.save();
                if(result){
                    const tempotp  = otp.generate(6, {lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false });
                    const existingotp = await Otp.findOne({email});
                    if(existingotp){
                        const result1 = await Otp.updateOne(
                            {
                                email:email
                            },
                            {
                                $set:{
                                    otp:tempotp
                                }
                            });
                    }else{
                        const otpdata  = await new Otp ({
                            email:email,
                            otp:tempotp
                        })
                        const result1 = otpdata.save();
                        if(result1){
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'ashwinkaranthamalai@gmail.com',
                                    pass: 'erwafncksdyciqvz'
                                }
                            });
                            var mailOptions = {
                            from: 'ashwinkaranthamalai@gmail.com',
                            to: email,
                            subject: 'otp for registeration ',
                            text: `your otp for registeration is ${tempotp}`
                            };
                            transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });
                            res.json({
                                status:"success",
                                message:"successfully inserting user details and otp details in db and have mailed the otp"
                            })
                        }
                        else{
                            res.json({
                                status:"error",
                                error:"error occured in the inserting the otp details in db"
                            })
                        }
                    }
                }
                else{
                    res.json({
                        status:"error",
                        error:"error occured in inserting the user details in db"
                    })
                }
            }
        }
    }
    catch(e){
        console.log(e);
    }
})

//verify otp

router.post('/verifyotp', async(req, res)=>{
    const {email, verify} = req.body;
    console.log('from verify api',email, verify)
    try {
        const result = await Otp.findOne({email:email});
        if(result){
            if(result.otp==verify){
                res.json({
                    status:"success",
                    message:"successfully authenticated user"
                })
            }
            else{
                res.json({
                    status:"failure",
                    error:"otp not matched"
                })
            }
        }
        else{
            res.json({
                status:"error",
                error:"user not found in otp db"
            })
        }
    } catch (error) {
        console.log(error);
    }
})



//deleting the user the otp doesnot match for two time:
router.post('/deleteuser', async(req, res)=>{
    const {email} = req.body;
    try {
        const result = await academy.deleteOne({email:email});
        if(result){
            res.json({
                status:"success",
                message:"user deleted fromt db cause of wrong otp"
            })
        }else{
            res.json({
                status:"failure",
                message:"user is still residing in the db even after 2 wrong otp"
            })
        }
    } catch (error) {
        console.log('error occured', error)
    }
})

//regsitering the user
router.post('/register_industry', async(req, res)=>{
    console.log('from register industry api',req.body)
  
    const{name, email, password, affiliation, companyname, designation, chamber} = req.body;
    // Console.log('from the destructor indutry', name, email, affiliation)
    const encryptedPassword = await bcrypt.hash(password,10);

    try {
        const exisitingUser = await academy.findOne({email});
        if(exisitingUser){
            return res.json({
                status:409,
                message:"user is already registered as a academy person"
            })
        }
        else{
            const exisitingUser =await industry.findOne({email});
            if(exisitingUser){
                res.json({
                    status:409,
                    message:"user already exist"
                })
            }
            else{

                const data = await new industry({
                    name:name,
                    email:email,
                    affiliation:affiliation,
                    companyname:companyname,
                    designation:designation,
                    chamber:chamber,
                    password:encryptedPassword
                })
                const result = data.save();
                if(result){
                    res.json({
                        status:"success",
                        message:"inserted succesfully"
                    })
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'ashwinkaranthamalai@gmail.com',
                            pass: 'erwafncksdyciqvz'
                        }
                    });
                    
                    var mailOptions = {
                        from: 'ashwinkaranthamalai@gmail.com',
                        to: email,
                        subject: 'Registeration Succesfully',
                        text: 'You are Succesfully Registered, Welcome to Industry Academy Interaction'
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                }
                else{
                    res.json({
                        status:409,
                        message:"error occured in insertion"
                    })
                }
            }
        }
        } catch (error) {
        console.log('error occured in catch of register',error)
        res.json({
            status:409,
            message:"error occured in insertion",
            data:"error occured"
        })
    }
}),


//verifying the otp



router.post('/login', async(req, res)=>{
    const {email, password}= req.body;
    // console.log('frlm the login common api ', email, password);
    const academy_user = await academy.findOne({email});
    if(academy_user){
        res.json({
            status:"success",
            message:"academy"
        })
    }
    else {
        const industry_user = industry.findOne({email});
        if(industry_user){
            res.json({
                status:"success",
                message:"industry"
            })
        }
        else{
            res.json({
                status:"failure",
                error:"no user registered"
            })
        }
    }
    

}),

// in login the details in the db is fetched and checked for the password and the home page redirected
router.post('/login_academy',async(req, res)=>{
    const {email, password} = req.body;
    console.log('from login api', req.body)
    const olduser = await academy.findOne({email});
    if(!olduser){
        res.send({
            status:"error",
            message:"user not registered"
        })
    }
    else{
        if(await bcrypt.compare(password, olduser.password)){
            const token = jwt.sign({email:olduser.email},JWT_SECRET);
            console.log('token',token);
            //need to set this token in local storage in the website;
            // window.localStorage.setItem('token', token);
            // window.location.href = "/loginpage";
            if(res.status(201)){
                return res.json({
                    status:"success for academy",
                    data:token,
                    name:olduser.name,
                    details:olduser.detailsprovided
                })
            }
            else{
                return res.json({
                    message:"error occured "
                })
            }
    }
    else{
        res.json({
            status:"error",
            error:"invalid password"
        })
    }   
}
})

router.post('/login_industry', async(req, res)=>{
    const {email, password} = req.body;
    console.log('from login api', req.body)
    const olduser = await industry.findOne({email});
    if(!olduser){
        res.send({
            status:"error",
            message:"user not registered"
        })
    }
    else{
        if(await bcrypt.compare(password, olduser.password)){
            const token = jwt.sign({email:olduser.email},JWT_SECRET);
            console.log('token',token);
            //need to set this token in local storage in the website;
            // window.localStorage.setItem('token', token);
            // window.location.href = "/loginpage";
            if(res.status(201)){
                return res.json({
                    status:"success for industry",
                    data:token,
                    name:olduser.name,
                    details: olduser.detailsprovided
                })
            }
            else{
                return res.json({
                    error:"error occured "
                })
            }
    }
    else{
        res.json({
            status:"error",
            error:"invalid password"
        })
    }   
}
})

router.post('/redirecthome', async(req, res)=>{
    const{token} = req.body;
    try {
        const check = jwt.verify(token, JWT_SECRET);
        console.log('checking check',check)
        console.log(check.email);
        user.findOne({email: check.email}).then((data)=>{
            res.send({
                status:"success",
                data:data
            })
        }).catch((err)=>{
            console.log('error occured in redirecthome', err);
            res.send({
                status:"error",
                data:"error"
            })
        });
    } catch (error) {
        console.log('error occured in catch of redirect to home', error);
    }
})
 

//sending mail - reset password

router.post('/sendmail',async(req, res)=>{
    const {link,email,sub} = req.body;
    console.log(link)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ashwinkaranthamalai@gmail.com',
            pass: 'erwafncksdyciqvz'
        }
    });
    
    var mailOptions = {
        from: 'ashwinkaranthamalai@gmail.com',
        to: email,
        subject: `${sub}`,
        text: `${link}`,
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
})


// academy and industry....
router.post('/forgetpassword', async(req, res)=>{
    // console.log('hi from the forget')
    const {email} = req.body;
    console.log(email)
    try {
        const olduser = await academy.findOne({email})
        if(!olduser){
            const user = await industry.findOne({email});
            if(!user){
                return res.json({
                    status:"error",
                    error:"user not registered to update pssword"
                })    
            }
            else{
                const secret =  JWT_SECRET + user.password;
                const token = jwt.sign({email:user.email, id:user._id},secret );
                const flag = user.affiliation;
                const link = `http://localhost:6080/resetpassword/${user._id}/${flag}/${token}`;
                console.log(link);
                //nodemailer
                res.send({
                    link:link
                })
            }
        }
        else{
            const secret =  JWT_SECRET + olduser.password;
            const token = jwt.sign({email:olduser.email, id:olduser._id},secret );
            const flag = olduser.affiliation;
            // res.render(`http://localhost:6080/reset/${olduser._id}/${token}`);
            const link = `http://localhost:6080/resetpassword/${olduser._id}/${flag}/${token}`;
            console.log(link);
            //nodemailer
            res.send({
                link:link
            })
        }
    } catch (error) {
        console.log('eror occured in forget password', error);
    }
}),

router.post('/forgot',async(req,res)=>{
    const {email} = req.body;
    console.log(email);
    const olduser = await academy.findOne({email});
    if(!olduser){
        const user = await industry.findOne({email});
        if(!user){
            return res.json({
                status:409,
                message:"user npt registered"
            });
        }
        else{
            const secret = JWT_SECRET+user.password;
            const token = jwt.sign({email:user.email, id:user._id},JWT_SECRET );

            const transfer = `http://'localhost:3000/reset/${token}/${user._id}`;
            res.send({
                status:"success",
                token:token,
                redirec:transfer
            });
        }
    }
    else{
        const secret = JWT_SECRET+olduser.password;
            const token = jwt.sign({email:olduser.email, id:olduser._id},JWT_SECRET );

            const transfer = `http://localhost:3000/reset/${token}/${olduser._id}`;
            res.send({
                status:"success",
                token:token,
                redirect:transfer
            });
    }
})

router.get('reset/:token/:id',async(req, res)=>{
    const {token, id} = req.body;
    console.log(token,'from verify');
    const check = jwt.verify(token,JWT_SECRET)
    console.log(check, 'fromt check')
})

router.post('/updatepass', async(req, res)=>{
    const {password, token} = req.body;
    const verify = jwt.verify(token, JWT_SECRET);
    console.log(verify,'from verify');    
    const testmail = verify.email; 
    const id = verify.id;
    const encryptedpassword = await bcrypt.hash(password, 10);
    console.log(encryptedpassword)
    const acad = await academy.findOne({email:testmail});
    if(!acad){
        const indus = await industry.findOne({email:testmail});
        if(!indus){
            return res.send('invalid email')
        }
        else{
            const test = await industry.updateOne(
                {
                    _id:id,
                },
                {
                    $set: {
                        password: encryptedpassword,
                    },
                },
            );
            if(!test){
                console.log('no test')
            }
            else{
                console.log('test has value')
            }
            res.json({
                status:'success',
                message:"updated"
            })
        }
    }
    else{
        try {
            const test = await academy.updateOne(
                {
                    _id:id,
                },
                {
                    $set: {
                        password: encryptedpassword,
                    },
                },
            );
            if(!test){
                console.log('no test')
            }
            else{
                console.log('test has value')
            }
            res.json({
                status:'success',
                message:"updated"
            })
        } catch (error) {
            console.log('error occured',error)
        }
    }
})

// ============================ PROFILE PAGE API CALLS====================================

router.post('/insertprofile', async (req, res) => {
    try {
      const profileData = {
        bio: req.body.bio,
        about: req.body.about,
        experience: req.body.experience,
        education: req.body.education,
        skills: req.body.skills,
        languages: req.body.languages,
        detailsprovided:true
      };
      const email = req.body.email;
  
      const academyprofile = await academy.findOne({email: email})
      const industryprofile = await industry.findOne({email:email})
      if(academyprofile){
        const updatedProfile = await academy.updateOne({ email: email }, profileData);
  
      if (updatedProfile) {
        res.status(201).json({ statusMsg: 'success' });
      } else {
        res.status(500).json({ errorMsg: 'failed' });
      }
    
    }
    else if(industryprofile){
        const updatedProfile = await industry.updateOne({ email: email }, profileData);
  
      if (updatedProfile) {
        res.status(201).json({ statusMsg: 'success' });
      } else {
        res.status(500).json({ errorMsg: 'failed' });
      }
    }
    else{
        res.json({
            message: "no user found"
        })
    }


} catch (error) {
        console.log('Error in updating the profile details:', error);
      }
      
  });
  

  router.post('/fetchProfileData', async (req, res) => {
    try {
      const email = req.body.email;
      const academyprofile = await academy.findOne({ email: email });
      const industryprofile = await industry.findOne({email:email});

    if(academyprofile){
        res.json(academyprofile)
        console.log(academyprofile)
    }
    else if(industryprofile){
        res.json(industryprofile)
        console.log(industryprofile)
    }
    else{
        return res.status(404).json({ error: 'Profile not found' });
    }

    } catch (error) {
      console.error('An error occurred while fetching the profile:', error);
      res.status(500).json({ error: 'An error occurred while fetching the profile' });
    }
  });
  


///////==============================================

  


///////==============================================
router.get('/resetpassword/:id/:flag/:token', async(req, res)=>{
    const {id,flag,token} = req.params;
    console.log(req.params)
    if(flag==='academic'){
        const olduser =  await academy.findOne({_id: id});
        if(!olduser){
            return res.json({
                status:"cannot update forget for person who are not yet registered"
            })
        }
        const secret = JWT_SECRET + olduser.password;
        try {
            console.log('hi')
            const verify = jwt.verify(token, secret);
            console.log('from verify',verify)
            res.render('forget');
        } catch (error) {
            console.log('eroor occcured in token verification' ,error)
            res.send('not verified')
        }
    }
    else{
        const user =  await industry.findOne({_id: id});
        if(!user){
            return res.json({
                status:"cannot update forget for person who are not yet registered"
            })
        }
        const secret = JWT_SECRET + user.password;
        try {
            console.log('hi')
            const verify = jwt.verify(secret, token);
            console.log('from verify',verify)
            res.render('forget', {email:verify.email, status:"not verified"});
        } catch (error) {
            console.log('eroor occcured in token verification' ,error)
            res.send('not verified')
        }
    }

})


router.post('/resetpassword/:id/:flag/:token', async(req, res)=>{
    const {id, flag, token} = req.params;
    const {pass, confpass} = req.body;
    if(flag=="academic"){
        if(pass== confpass){
            const olduser =  await academy.findOne({_id: id});
            if(!olduser){
                return res.json({
                    status:"cannot update forget for person who are not yet registered"
                })    
            }
            else{

                const secret = JWT_SECRET + olduser.password;
                try {
                    console.log('hi')
                    const verify = jwt.verify(secret, token);
                    console.log('from verify',verify)
                    const encryptedPassword =await bcrypt.hash(pass, 10);
                    await academy.updateOne(
                        {
                            _id: id,
                        },
                        {
                            $set: {
                                password: encryptedPassword,
                            },
                        },
                    );
                    res.json({
                        status:"Password Updated"
                    })
                    res.render("forget", {email:verify.email, status:"verifed"});
                }
                catch (error) {
                    console.log('eroor occcured in token verification in academy' ,error)
                    res.send('not verified')
                }
            }
        }
    }
    else if(flag=='industry'){
        if(pass== confpass){
            const user =  await industry.findOne({_id: id});
            if(!user){
                return res.json({
                    status:"cannot update forget for person who are not yet registered"
                })    
            }
            else{
                const secret = JWT_SECRET + user.password;
                try {
                    console.log('hi')
                    const verify = jwt.verify(secret, token);
                    console.log('from verify',verify)
                    const encryptedPassword =await bcrypt.hash(pass, 10);
                    await industry.updateOne(
                        {
                            _id: id,
                        },
                        {
                            $set: {
                                password: encryptedPassword,
                            },
                        },
                    );
                    res.json({
                        status:"Password Updated"
                    })
                    res.render("forget", {email:verify.email, status:"verifed"});
                }
                catch (error) {
                    console.log('eroor occcured in token verification in industry' ,error)
                    res.send('not verified')
                }
            }
        }   
    }
}
);

//getting name for navbar

router.post('/find-username',async(req,res)=>{
    const {email} = req.body
    try{
        const otheruser = await academy.findOne({email:email});
        if(otheruser){
            const name = otheruser.name;
            const college = otheruser.university;
            console.log('from the academy api',name);
            return res.json({
                uname : `${name}`,
                collegeName: `${college}`,
                resume:otheruser.resume
            })
        }else{
            const olduser =await industry.findOne({email:email});
            if(olduser){
                const name = olduser.name;
                const company = olduser.companyname
                console.log('from the api',name);
                return res.json({
                uname : `${name}`,
                companyname: `${company}`
                })
            }
            else{
                return res.json({
                    status: 409,
                    message: "user not found"
                })
            }
        }
    }
    catch(e){
        console.log(e);
    }
})



module.exports = router






