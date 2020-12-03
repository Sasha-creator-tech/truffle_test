const DudleToken = artifacts.require("DudleToken");

module.exports = function (deployer) {
  deployer.deploy(DudleToken, 1000);
};