<template>
  <div>
    

    <v-simple-table teal accent-3>
      <template v-slot:default>
        <thead>
          <tr class="table">
            <th class="text-left">ID</th> 
            <th class="text-left">Nome</th>
             <th class="text-left">Endereço</th>
             <th class="text-left">Ações</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in allClients" :key="index">
            <td>{{ item.idCliente }}</td>
            <td>{{ item.nomeCliente }}</td>
            <td>{{ item.endCliente }}</td>
            <td>
              <v-btn icon @click="carregaInfo($event, item)">
                <v-icon color="primary">mdi-account-edit</v-icon>
              </v-btn>
              <v-btn icon @click="deletaUsuario($event, item.id)">
                <v-icon color="error">mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <Modal v-if="modal === true">
      <div class="d-flex justify-end">
        <v-btn icon @click="modal = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      
      <v-card class="pa-5" flat>
        <v-card-title>Editar Cliente</v-card-title>
        <v-row>
          <v-col cols="6">
            <v-text-field label="Id" outlined v-model="editar.id"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Cliente" outlined v-model="editar.nome"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Endereco" outlined v-model="editar.endereco"></v-text-field>
          </v-col>
        </v-row>

     
        <v-btn dark @click="editarUsuario" color="teal accent-3">
          Editar <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-card>
    </Modal>
  </div>
</template>
  
<script>
import axios from "axios";
import Modal from "@/components/Modal/Modal.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      modal: false,
      cliente: [],
      editar: {
        id: "",
        nome: "",
        endereco: ""
       
      },
      rules: {
        email: [
          (v) => !!v || "E-mail é obrigatorio!",
          (v) => /.+@.+\..+/.test(v) || "E-mail não é valido!",
        ],
      },
    };
  },
  components: {
    Modal,
  },
   async mounted() {
    await this.$store.dispatch("client/getAllClients")
    
  },
  computed:{
    ...mapGetters({
      allClients:"client/allClients"
    }),
  },

  methods: {
    carregaInfo(e, item) {
      e.preventDefault();
      this.editar.id = item.idCliente;
      this.editar.nome= item.nomeCliente;
      this.editar.endereco= item.endCliente;
      this.modal = true;
    },
    async editarUsuario(e) {
      e.preventDefault();
      await this.$store.dispatch("client/setClient", {
        idCliente: this.editar.id,
        nomeCliente: this.editar.nome,
        endCliente: this.editar.endereco
       })
       await this.$store.dispatch("client/getAllClients")
       this.modal = false
       alert("Cliente editado!")
    },
    async deletaUsuario(e, item) {
      e.preventDefault();
      await axios.delete(`https://localhost:44381/funcionarios/${item}`);
      window.location.reload();
    },
  },
};
</script>
<style lang="scss" scoped>
.table {
  background: rgb(22, 211, 186);
  }
</style>