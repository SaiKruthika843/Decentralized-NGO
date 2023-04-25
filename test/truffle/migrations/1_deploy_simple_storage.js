const NGO = artifacts.require("NGODonation");

module.exports = function (deployer) {
  deployer.deploy(NGO);
};
