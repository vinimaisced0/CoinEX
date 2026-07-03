const CadastroPacientes = artifacts.require("CadastroPacientes");

contract("CadastroPacientes", accounts => {

    let contrato;

    before(async () => {
        contrato = await CadastroPacientes.deployed();
    });

    it("Deve cadastrar um paciente", async () => {

        await contrato.cadastrarPaciente(
            "Rafael",
            "12345678900",
            25,
            "Rua A"
        );

        const paciente = await contrato.consultarPaciente("12345678900");

        assert.equal(paciente[0], "Rafael");
        assert.equal(paciente[1], "12345678900");
        assert.equal(paciente[2].toNumber(), 25);
        assert.equal(paciente[3], "Rua A");
    });

});