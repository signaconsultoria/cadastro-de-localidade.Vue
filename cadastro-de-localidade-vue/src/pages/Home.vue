<template>
	<div class="container">
		<v-card class="container__card">
			<v-card-title class="container__card__title">
				Cadastro de Localidade
				<div :style="{ width: '300px', display: 'flex', justifyContent: 'space-between', marginRight: '140px' }">
					<v-btn @click="goToFaixaCep" rounded outlined color="#0672b9">Faixa De Cep
					</v-btn>
					<v-btn @click="goTopesquisa" rounded outlined color="#0672b9">Pesquisar
					</v-btn>
				</div>

			</v-card-title>
			<v-card-subtitle class="container__card__subtitle">
				<font color="black"><b>Informe os dados abaixo para realizar o cadastro</b></font>
			</v-card-subtitle>
			<p><v-row>
					<v-col cols="3">
						<b>Código: {{ cod }}</b>
					</v-col>

					<v-col cols="3">
						<b>Status: {{ stat }}</b>
					</v-col>
				</v-row>
			</p>
			<v-row>
				<v-col cols="5">
					<v-text-field :clear="clear" label="Localidade" outlined v-model="locality">
					</v-text-field>

				</v-col>
				<v-col cols="3">
					<v-Autocomplete isAsync label="Empresa" outlined v-model="company" item-text="razaO_SOCIAL"
						item-value="empresa_Id" returnObject :items="getLocalidade">
					</v-Autocomplete>

				</v-col>
				<v-col cols="3">
					<v-text-field label="Praça" outlined v-model="square"></v-text-field>
				</v-col>
			</v-row>
			<v-card-subtitle class="container__card__subtitle">
				<font color="black"><b>Tipo veículo</b></font>
			</v-card-subtitle>
			<div class="radio">
				<v-row>
					<v-radio-group v-model="radio" row>
						<v-radio color="teal" label="Só truck" value="T"></v-radio>
						<v-radio color="teal" label="Só carreta" value="C"></v-radio>
						<v-radio color="teal" label="Ambos" value="A"></v-radio>
					</v-radio-group>
					<v-switch v-model="flag" color="teal" label="Aplicar TRT">
					</v-switch>
				</v-row>
			</div>
			<br>

			<v-container :clear="clear" fluid class="bo">
				<v-btn @click="impress" class="btna" rounded color="#349BFF">Gravar</v-btn>
				<v-btn @click="cdelete" class="btn" rounded outlined color="#0672b9">Excluir</v-btn>
				<v-btn @click="clean" class="btn" rounded outlined color="#0672b9">Limpar</v-btn>
				<v-btn @click="back" class="btn" rounded outlined color="#0672b9">Voltar</v-btn>
			</v-container>
			<TablePesquisa v-if="getAllPesquisa && getAllPesquisa.length > 0" />
		</v-card>
	</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import usuario from '@/services/usuario'
import TablePesquisa from '../components/commom/TablePesquisa/index.vue'

export default {
	data() {
		return {
			itens: [],
			cod: "",
			stat: "",
			locality: null,
			company: null,
			square: null,
			radio: '',
			flag: true,
			name: null,
			clear: false,
			teste2: 0,


		}

	},
	mounted() {
		this.$store.dispatch('grupo/getLocalidade')
		// this.$store.dispatch('usuario/getInserir')
		if (this.getListInLine) {
			this.$store.dispatch('pesquisa/getAllPesquisa')
			this.cod = this.getListInLine.localidadE_ID
			this.square = this.getListInLine.localidadE_ID
			this.locality = this.getListInLine.desC_LOCALIDADE
			this.stat = "Ativo"
		}


	},
	components: {
		TablePesquisa
	},
	watch: {
		getFaixaLoc() {
			this.locality = this.getFaixaLoc.locality
			this.square = this.getFaixaLoc.square
			this.cod = this.getFaixaLoc.cod

			console.log(this.getFaixaLoc, 'mudou')
		}
	},
	computed: {
		...mapGetters({
			getLocalidade: 'grupo/getLocalidade',
			snackbarMessage: 'snackbarMessage',
			loading: 'loading',
			getInserir: 'usuario/getInserir',
			usuario: "usuario/getUsuario",
			getListInLine: "usuario/getListInLine",
			getStep: "grupo/getStep",
			getAllPesquisa: 'pesquisa/getAllPesquisa',
			getData: "usuario/getData"
		}),


	},
	methods: {
		usuarioDados() {
			this.dispatch('usuario/getInserir')
		},
		...mapActions({
			excluir: 'usuario/excluir',
			inserir: 'usuario/getInserir',
		}),

		getItemInList(item) {
			console.log(item, 'item');
			this.$store.commit('usuario/setListInLine', item)
			this.$router.push('/FaixaCep')

		},

		async impress() {
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

			this.$store.commit('usuario/setUserStep', false)
			this.$store.dispatch('setLoading', true)

			if (

				this.locality === null ||
				this.company === null ||
				this.square === null
			) {
				this.$store.dispatch('setLoading', true)
			} else {
				try {

					const obj = {
						desc_localidade: this.locality,
						localidade_id: this.cod ? this.cod : this.locality.localidade_id,
						setor_id: null,
						cep_ini: "",
						cep_fim: "",
						empresa_Id: this.company.empresa_Id,
						hora_max_coleta: "",
						hora_ja_pronto: "",
						tipo_veiculo: this.radio,
						id_sistema_externo: 0,
						deposito_id: 0,
						cod_praca: 0,
						praca: this.square,
						flag_aplica_trt: 0
					}

					const data = await usuario.getInserir(obj)
					this.$store.commit("grupo/setStep", 1)
					this.$store.commit('grupo/setFaixaLoc', this.locality)
					this.cod = data.data.localidade_id
					this.stat = "ativo"

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
			await this.$store.dispatch('usuario/getExcluir', this.cod)
		},
		goTopesquisa() {
			this.$router.push('/pesquisa')
		},
		goToFaixaCep() {
			if (this.getStep === 0) {
				this.$store.dispatch(
					'setSnackbar',
					{
						status: true,
						message: 'Informe alguma localidade para efetuar a consulta.',
					},
					{ root: true }
				)
			} else {
				this.$router.push('/FaixaCep')
			}
		},

		getItemInTable(item) {
			console.log(item, 'itemTable')
			this.cod = item.localidadE_ID
			this.locality = item.desC_LOCALIDADE
			this.square = item.praca
			this.stat = 'Ativo'
		},

		clean() {
			this.locality = null
			this.company = null
			this.square = null
			this.cod = null
			this.stat = null

		},
		back() {
			window.location.reload();
		},
	},
};
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


