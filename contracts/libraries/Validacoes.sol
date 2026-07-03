// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

library Validacoes {

    function validarNome(string memory nome) internal pure {
        require(bytes(nome).length > 0, "Nome obrigatorio");
    }

    function validarCPF(string memory cpf) internal pure {

        bytes memory cpfBytes = bytes(cpf);

        require(cpfBytes.length == 11, "CPF deve possuir 11 digitos");

        for (uint i = 0; i < cpfBytes.length; i++) {
            require(
                cpfBytes[i] >= bytes1("0") &&
                cpfBytes[i] <= bytes1("9"),
                "CPF deve conter apenas numeros"
            );
        }
    }

    function validarIdade(uint idade) internal pure {
        require(idade > 12, "Idade deve ser maior que 12");
    }

}