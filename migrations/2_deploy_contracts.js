const CadastroPacientes = artifacts.require("CadastroPacientes");

module.exports = function (deployer) {
    deployer.deploy(CadastroPacientes);
};