const express = require("express");

const constructorMethod = app => {
 
    app.get("/",(req, res) => {
      try{
      res.render('portfolio', {title: "Portfolio"});
      }catch (e) {
        res.status(404).json({error});
      }
    });

    app.use("*", (req, res) => {
      res.sendStatus(404);
      });
    };
    
    module.exports = constructorMethod;