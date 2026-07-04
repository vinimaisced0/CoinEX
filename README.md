# Hospital-Fase2

Projeto de entrega de blockchain da fase 2. Este projeto necessitará entregar:

> O contrato deve permitir o cadastro de pacientes com os campos:
>       Nome (string, obrigatório)
>
>       CPF (string, obrigatório)
>       Idade (uint, obrigatório)
>       Endereço (string, opcional mas deve existir no struct)
>
>   O paciente só poderá ser cadastrado se:
>
>       Idade for maior que 12 anos.
>       Nome, CPF e Idade forem preenchidos.
>
>   Deve ser possível consultar os dados de um paciente pelo seu CPF.
>   
>   Regras de Negócio
>   Validações obrigatórias: 
>
>       nome não vazio, 
>       CPF não vazio
>       idade > 12.
>       CPF cadastrado uma única vez.

## Iniciando e Executando o projeto.
(1) Para inicializar o projeto basta instalar as dependências:
```npm install```

(2) Executar o compile + deploy:
```
npm run compile
npm run deploy
```

(3) E executar o front-end utilizando o "serve"
```
npx serve frontend
```
Caso não exista o "serve" ele perguntará se deseja instalar ele.

### Observações:
O projeto utiliza o Ganache, rodando em suas configurações padrões, neste caso ``HTTP://127.0.0.1:7545`` e network id ``5777``.