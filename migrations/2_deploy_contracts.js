const ZirconToken = artifacts.require("ZirconToken");
const Voting = artifacts.require("Voting");

module.exports = async function (deployer) {
  await deployer.deploy(ZirconToken);
  await deployer.deploy(Voting);
};
