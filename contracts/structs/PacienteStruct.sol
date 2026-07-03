// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library PacienteStruct {

    struct Paciente {
        string nome;
        string cpf;
        uint idade;
        string enderecoResidencial;
        bool existe;
    }

}