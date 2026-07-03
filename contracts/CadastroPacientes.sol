// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./structs/PacienteStruct.sol";
import "./libraries/Validacoes.sol";
import "./interfaces/IPaciente.sol";

contract CadastroPacientes is IPaciente {

    using Validacoes for string;
    using Validacoes for uint;

    mapping(string => PacienteStruct.Paciente) private pacientes;

    function cadastrarPaciente(
        string memory nome,
        string memory cpf,
        uint idade,
        string memory enderecoResidencial
    ) public override {

        nome.validarNome();
        cpf.validarCPF();
        idade.validarIdade();

        require(!pacientes[cpf].existe, "CPF ja cadastrado");

        pacientes[cpf] = PacienteStruct.Paciente(
            nome,
            cpf,
            idade,
            enderecoResidencial,
            true
        );
    }

    function consultarPaciente(string memory cpf)
        public
        view
        returns (
            string memory,
            string memory,
            uint,
            string memory
        )
    {
        require(pacientes[cpf].existe, "Paciente nao encontrado");

        PacienteStruct.Paciente memory p = pacientes[cpf];

        return (
            p.nome,
            p.cpf,
            p.idade,
            p.enderecoResidencial
        );
    }

}