// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library Validacoes {

    function validarNome(string memory nome) internal pure {
        require(bytes(nome).length > 0, "Nome obrigatorio");
    }

    function validarCPF(string memory cpf) internal pure {
        require(bytes(cpf).length > 0, "CPF obrigatorio");
    }

    function validarIdade(uint idade) internal pure {
        require(idade > 12, "Idade deve ser maior que 12");
    }

}