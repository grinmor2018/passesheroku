const functionsCtrl = {};

const Pass = require("../models/pass");

functionsCtrl.getPasses = async (req, res) => {
    const passes = await Pass.find();
    res.json(passes);
};

functionsCtrl.createPass = async (req, res) => {
    const { web, user, password, email, clave, observations } = req.body;
    const pass = new Pass({
      web,
      user,
      password,
      email,
      clave,
      observations,
    });
    await pass.save();
    res.json({ status: "Pass saved" });
  };

  functionsCtrl.editPass = async (req, res) => {
    const { web, user, password, email, clave, observations } = req.body;
    const newPass = {
      web,
      user,
      password,
      email,
      clave,
      observations,
    };
    await Pass.findByIdAndUpdate(req.params.id, newPass);
    res.json({ status: "Pass updated" });
  };

  functionsCtrl.deletePass = async (req, res) => {
    await Pass.findByIdAndRemove(req.params.id);
    res.json({ status: "Pass deleted" });
  };

  functionsCtrl.getPass = async (req, res) => {
    const pass = await Pass.findById(req.params.id);
    res.json(pass);   
};


module.exports = functionsCtrl;