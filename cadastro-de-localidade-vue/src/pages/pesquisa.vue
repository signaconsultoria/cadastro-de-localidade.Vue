<template>
	<div class="container">
		<v-card class="container__card">
			<v-card-title class="container__card__title">
				Cadastro de Localidade
				<v-btn @click="goToTableAll" class="pes btn" rounded outlined color="#0672b9">Pesquisar</v-btn>
			</v-card-title>
			<v-card-subtitle class="container__card__subtitle">
				<font color="black"><b>Selecione um dos filtros desejados</b></font>

			</v-card-subtitle>
			<v-row class="3">
				<v-col cols="3">
					<v-autocomplete :fnSync="queryCode" isAsync ref="autocomplete" no-data-text v-model="code" label="Cód"
						item-text="localidadE_ID" item-value="localidadE_ID" returnObject :items="getDescLocalidade"
						outlined>
					</v-autocomplete>

				</v-col>

				<v-col cols="3">
					<v-text-field label="Cód.Externo" outlined v-model="code2"></v-text-field>

				</v-col>
				<v-col cols="3">
					<v-autocomplete :fnSync="queryLocality" isAsync ref="autocomplete" no-data-text v-model="locality"
						label="Localidade" item-text="desC_LOCALIDADE" item-value="localidadE_ID" returnObject
						:items="getDescLocalidade" outlined>
					</v-autocomplete>

				</v-col>
				<v-col cols="3">
					<v-text-field label="CEP" outlined v-model="cep"></v-text-field>
				</v-col>
			</v-row>

			<v-card-subtitle class="container__card__subtitle">
				<font color="black"><b>Posicionamento</b></font>
			</v-card-subtitle>
			<div class="radio">
				<v-row>
					<v-radio-group v-model="radio" row>
						<v-radio color="teal" label="Retrato" value="R"></v-radio>
						<v-radio color="teal" label="Paisagem" value="P"></v-radio>
						<v-radio color="teal" label="Inderterminado" value="I"></v-radio>
					</v-radio-group>
				</v-row>
			</div>

			<br />
			<v-btn @click="goToHome" class="btn" rounded outlined color="#0672b9">Voltar</v-btn>
		</v-card>
	</div>
</template>
<script>
import Autocomplete from '@/pages/Autocomplete.vue'
import { mapGetters } from 'vuex'

export default {
	name: 'app',
	data() {
		return {
			itens: [],
			locality: null,
			code: null,
			cep: "",
			radio: "R",
			code2: null,
			clear: false,
			name: "",
		}
	},
	components: {
		Autocomplete,
	},
	mounted() {
		this.$store.dispatch('grupo/getDescLocalidade'),
			this.$store.dispatch('grupo/getLocalidade')
		this.$store.dispatch('pesquisa/getAllPesquisa')
	},
	watch: {
		code() {
			this.locality = this.code
			this.$store.commit('pesquisa/setStepCod', this.code)
		},
		locality() {
			this.code = this.locality
			this.$store.commit('pesquisa/setStepCod', this.locality)
		}
	},
	computed: {
		...mapGetters({
			getDescLocalidade: 'grupo/getDescLocalidade',
			getLocalidade: 'grupo/getLocalidade',
			getAllPesquisa: 'pesquisa/getAllPesquisa',
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
		async goToTableAll() {
			if (!this.code && !this.cep) {
				this.$store.dispatch(
					'setSnackbar',
					{
						status: true,
						message: 'Localidade, Código, CEP, Código Externo: um destes filtros deve ser preenchido.',
					},
					{ root: true }
				)
				return
			}

			const obj = {
				desC_LOCALIDADE: this?.locality?.desC_LOCALIDADE ? this?.locality?.desC_LOCALIDADE : "",
				LOCALIDADE_ID: this?.code?.LOCALIDADE ? this?.code?.LOCALIDADE : 0,
				cep: this?.cep

			}
			const res = await this.$store.dispatch('pesquisa/getAllPesquisa', obj)
			this.$store.commit("pesquisa/setFilterDate", this.code)
			if (res.data.length) {
				this.$router.push('/TableAll')
			}
		},
		goTopesquisa() {
			this.$router.push('/pesquisa')
		},
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
</style>
