const contractAddress = "0xa0Ec28D6A4B45922EB4Cc1d427E888aBFD6d26Ac";
const contractABI = [
  "function cadastrarPaciente(string nome, string cpf, uint256 idade, string enderecoResidencial) external",
  "function consultarPaciente(string cpf) external view returns (string, string, uint256, string)"
];


const { createApp } = Vue;

createApp({
  data() {
    return {
      account: null,
      statusMessage: '',
      errorMessage: '',
      form: {
        nome: '',
        cpf: '',
        idade: null,
        endereco: ''
      },
      query: {
        cpf: ''
      },
      pacienteConsultado: null
    };
  },
  computed: {
    shortenedAccount() {
      if (!this.account) return '';
      return `${this.account.substring(0, 6)}...${this.account.substring(this.account.length - 4)}`;
    }
  },
  methods: {
    async connectWallet() {
      this.clearMessages();
      try {
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
        const signer = await provider.getSigner();
        this.account = await signer.getAddress();
      } catch (error) {
        this.errorMessage = "Erro ao conectar ao Ganache local (porta 7545). Certifique-se de que o Ganache está aberto.";
      }
    },
    async cadastrarPaciente() {
      this.clearMessages();
      this.pacienteConsultado = null;

      if (!this.form.nome.trim()) {
        this.errorMessage = "O Nome é obrigatório.";
        return;
      }
      const cpfLimpo = this.form.cpf.replace(/\D/g, '');
      if (cpfLimpo.length !== 11) {
        this.errorMessage = "O CPF deve ter 11 números.";
        return;
      }
      if (!this.form.idade || this.form.idade <= 12) {
        this.errorMessage = "A idade deve ser maior que 12.";
        return;
      }

      try {
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
        const signer = await provider.getSigner();
        this.account = await signer.getAddress();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const tx = await contract.cadastrarPaciente(
          this.form.nome,
          cpfLimpo,
          this.form.idade,
          this.form.endereco
        );
        
        this.statusMessage = "Aguardando confirmação do bloco...";
        await tx.wait();

        this.statusMessage = "Paciente cadastrado no Ganache!";
        this.form.nome = '';
        this.form.cpf = '';
        this.form.idade = null;
        this.form.endereco = '';
      } catch (error) {
        if (error.message.includes('CPF ja cadastrado')) {
          this.errorMessage = "Erro: Este CPF já está cadastrado.";
        } else {
          this.errorMessage = "Erro na transação: " + error.message;
        }
      }
    },
    async consultarPaciente() {
      this.clearMessages();
      this.pacienteConsultado = null;

      const cpfLimpo = this.query.cpf.replace(/\D/g, '');
      if (cpfLimpo.length !== 11) {
        this.errorMessage = "Digite um CPF válido de 11 números.";
        return;
      }

      try {
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const resultado = await contract.consultarPaciente(cpfLimpo);
        this.pacienteConsultado = {
          nome: resultado[0],
          cpf: resultado[1],
          idade: Number(resultado[2]),
          enderecoResidencial: resultado[3]
        };
      } catch (error) {
        console.error("Erro completo ao consultar paciente:", error);
        
        const errorMessage = error.message || "";
        const errorReason = error.reason || "";
        
        if (errorMessage.includes('Paciente nao encontrado') || errorReason.includes('Paciente nao encontrado')) {
          this.errorMessage = "Paciente não encontrado no Ganache.";
        } else {
          this.errorMessage = `Erro de conexão ou consulta: ${errorReason || errorMessage || "Erro desconhecido"}.`;
        }
      }
    },
    clearMessages() {
      this.statusMessage = '';
      this.errorMessage = '';
    }
  },
  mounted() {
    this.connectWallet();
  }
}).mount('#app');
