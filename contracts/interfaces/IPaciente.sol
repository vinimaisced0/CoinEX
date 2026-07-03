// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPaciente {

    function cadastrarPaciente(
        string memory nome,
        string memory cpf,
        uint idade,
        string memory enderecoResidencial
    ) external;

}