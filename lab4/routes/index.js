const userRoutes = require("./users");

const constructorMethod = (app) => {
    app.use("/api/people", userRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
      });
    };
    
    module.exports = constructorMethod; 