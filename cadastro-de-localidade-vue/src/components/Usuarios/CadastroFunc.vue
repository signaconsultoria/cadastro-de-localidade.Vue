<template>
  <div class="container">
    <div id="teste">
      <v-card class="container__card" flat>
    <div>
      <v-card class="container__card pa-10">
        <v-row>
          <v-card-title>Cadastro de Clientes</v-card-title>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field label="id" outlined v-model="id"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Nome" aria-required="" outlined v-model="nome"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Endereço" outlined v-model="endereco"></v-text-field>
          </v-col>
        </v-row>
        <div>
          <v-btn @click="cadastrar" color="teal accent-3 ">Cadastrar
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </div>
      </v-card>
    </div>
    </v-card>
    <div class="container__table mt-10">
    </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
  data() {
    return {
      modal: false,
      nome: "",
      endereco: "",
      id: ""
    };
  },
  components: {
   //
  },
  methods: {
    async cadastrar() {
     await this.$store.dispatch("client/setClient", {
      idCliente: this.id,
        nomeCliente: this.nome,
        endCliente: this.endereco
       })
       await this.$store.dispatch("client/getAllClients")
       this.nome = "",
       this.endereco = "",
       this.id = ""
       alert("Cliente Cadastrado!")
    },
  },
};
</script>
  
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__card {
    background: #f8f5f5f5;
    color: rgb(9, 138, 116);
    align-items: center;
    border: 2px solid rgb(22, 211, 186);

  }
.teste {
  width: 25%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  align-self: center;
}
}
</style>