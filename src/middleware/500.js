'use strict';
module.exports = (error, req, res, next) => {
    // let regex1 = /^[0-9]/;res.json(        
    // regex1.test(req.query.name) ? (error.message = "enter a string for the name") : 
    // error.message = "name empty : enter a name");
    res.status(500).send({
        code: 500,
        route: req.path,
        message: `Server Error:${error}`,      
    });
};