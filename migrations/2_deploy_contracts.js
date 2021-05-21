const ZirconToken = artifacts.require("ZirconToken");

module.exports = function (deployer) {
  deployer.deploy(ZirconToken);
};
