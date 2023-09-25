<template>
  <div class="container">
    <v-card class="container__card">
      <v-card-title class="container__card__title">
        Cadastro de Faixas de CEP da Localidade
      </v-card-title>
      <v-card-subtitle class="container__card__subtitle">
        <font color="black"><b>Selecione um dos filtros desejados</b></font>
      </v-card-subtitle>
      <v-col cols="3">
        <b>Código: {{ code }}</b>
      </v-col>
      <v-row class="3">
        <v-col cols="3">
          <v-text-field :fnSync="queryLocality" isAsync ref="autocomplete" no-data-text v-model="locality"
            label="Localidade" item-text="desC_LOCALIDADE" item-value="localidadE_ID" returnObject
            :items="getDescLocalidade" outlined>
          </v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field label="CEP Inicial" outlined v-model="cepIni" maxlength="8"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field label="CEP Final" outlined v-model="cepFin" maxlength="8"></v-text-field>
        </v-col>
      </v-row>
      <br />
      <Table :getItemInTable="getItemInTable" v-if="getData.length > 0" />
      <v-btn @click="impress" class="btna" rounded color="#349BFF">Gravar</v-btn>
      <v-btn @click="cdelete" class="btn" rounded outlined color="#0672b9">Excluir</v-btn>
      <v-btn @click="clean" class="btn" rounded outlined color="#0672b9">Limpar</v-btn>
      <v-btn @click="back" class="btn" rounded outlined color="#0672b9">Voltar</v-btn>
    </v-card>
  </div>
</template>
<script>
import Table from "@/components/commom/Table/index.vue";
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      itens: [],
      locality: "",
      code: "",
      cepIni: "",
      cepFin: "",
    }
  },
  components: {
    Table,
  },

  mounted() {
    if (this.getFaixaLoc) {
      this.locality = this.getFaixaLoc
    }
    this.$store.dispatch('grupo/getDescLocalidade'),
      this.$store.dispatch('grupo/getLocalidade')
    // this.$store.dispatch('grupo/getFaixaLoc')
    this.$store.dispatch('pesquisa/getAllPesquisa')

    // this.$store.dispatch('usuario/getInserir')
    if (this.getListInLine) {
      this.cod = this.getListInLine.localidadE_ID
      this.cepIni = this.getListInLine.localidadE_ID
      this.cepFin = this.getListInLine.localidadE_ID
      this.locality = this.getListInLine.desC_LOCALIDADE
    }

  },

  computed: {
    ...mapGetters({
      getDescLocalidade: 'grupo/getDescLocalidade',
      getLocalidade: 'grupo/getLocalidade',
      getListInLine: "usuario/getListInLine",
      getFaixaLoc: "grupo/getFaixaLoc",
      getInserir: "usuario/getInserir",
      getData: "usuario/getData"
    }),
    filteredItems() {
      return this.getDescLocalidade.filter((item) =>
        item.toLowerCase().includes(this.code.toLowerCase())
      );
    },
    filteredItems() {
      return this.getLocalidade.filter((item) =>
        item.toLowerCase().includes(this.locality.toLowerCase())
      );
    },
  },
  methods: {
    queryCode(val) {
      this.$store.dispatch('grupo/getDescLocalidade', val)
    },
    queryLocality(val) {
      this.$store.dispatch('grupo/getLocalidade', val)
    },

    goToHome() {
      this.$router.push('/')
    },


    goTopesquisa() {
      this.$router.push('/pesquisa')
    },
    numericValidation(value) {
      // Use uma expressão regular para verificar se o valor é numérico
      if (/^\d+$/.test(value)) {
        return true; // Valor é numérico, válido
      } else {
        return false  // Valor não é numérico, inválido
      }
    },

    async impress() {
      if (!this.numericValidation(this.cepIni) || !this.numericValidation(this.cepFin)) {
        this.$store.dispatch(
          'setSnackbar',
          {
            status: true,
            message: 'Apenas valores numericos',
          },
          { root: true }
        )
        return
      }
      if (!this.locality) {
        this.$store.dispatch(
          'setSnackbar',
          {
            status: true,
            message: 'Informe uma Localidade.',
          },
          { root: true }
        )
        return
      }
      if (this.cepIni?.length < 8 || this.cepFin?.length < 8) {
        this.$store.dispatch(
          'setSnackbar',
          {
            status: true,
            message: 'Os CEPS tem que conter 8 caracteres',
          },
          { root: true }
        )
        return
      }

      this.$store.commit('usuario/setUserStep', false)
      this.$store.dispatch('setLoading', true)

      if (

        this.cepIni === null ||
        this.cepFin === null
      ) {
        this.$store.dispatch('setLoading', true)
      } else {
        try {
          const obj = {
            localidade_Id: 1,
            localidadE_ID: 1,
            cep_Ini: this.cepIni,
            cep_Fim: this.cepFin,
            zUsuario_Id: 1,
            faixa_Localidade_Id: this.code ? this.code : 0,
            retorno: 0,
            msg_Ret: ""
          }
          console.log(obj, 'objeoCEP');
          await this.$store.dispatch("usuario/getInserir2", obj)
          this.code = this.getInserir[0].faixa_Localidade_Id
          const arr = [
            {
              cep_Ini: this.cepIni,
              cep_Fim: this.cepFin,
              faixa_Localidade_Id: this.getInserir[0].faixa_Localidade_Id,
            },
          ]
          this.$store.commit('usuario/setData', arr)
          console.log(this.code, 'code')
          if (this.teste2 === 1) {
            this.$store.dispatch(
              'setSnackbar',
              {
                status: true,
                message: 'Alteração efetuada com sucesso.',
              },
              { root: true }
            ),
              this.teste2 = 0
          } else {
            this.teste2 = 1
            this.$store.dispatch(
              'setSnackbar',
              {
                status: true,
                message: 'Inclusão efetuada com sucesso.',
              },
              { root: true }
            )
          }
          this.$store.commit('usuario/setusuarioInsert')
          this.tableCod()
          this.$store.dispatch('setLoading', false)

        } catch (e) {
          this.$store.dispatch('setLoading', false)

        }
      }
    },


    async cdelete() {
      if (!this.locality) {
        this.$store.dispatch(
          'setSnackbar',
          {
            status: true,
            message: 'Informe uma Localidade.',
          },
          { root: true }
        )
        return
      }
      await this.$store.dispatch('usuario/getExcluir', this.code)
    },

    clean() {
      this.code = ""
      this.cepIni = ""
      this.cepFin = ""
    },

    back() {
      this.$router.push('/')
    },
    getItemInTable(item) {
      this.code = item.faixa_Localidade_Id
      this.cepIni = item.cep_Ini
      this.cepFin = item.cep_Fim
    }

  },


}
</script>
<style lang="scss" scoped>
.container {
  &__card {
    padding: 1rem;
    color: black;

    &__title {
      margin-bottom: 1rem;
      color: #3498db;
      display: flex;
      justify-content: space-between;
    }
  }
}

.pes {
  position: absolute;
  right: 0%;
}

.btn {
  margin-right: 8px;
}

.btna {
  margin-right: 8px;
  color: #ffffff !important;
}

.modal {
  margin-left: 55px;
  margin-top: 25px;
}
</style>

