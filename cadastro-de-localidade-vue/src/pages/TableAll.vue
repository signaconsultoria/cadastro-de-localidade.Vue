<template>
	<div class="container">
		<v-card class="container__card">
			<v-card-title class="container__card__title">
				Cadastro de Localidade
				<v-btn @click="downloadExcel" class="pes btn" rounded outlined color="#0672b9">
					Visualizar em Planilha <v-icon>mdi-microsoft-excel</v-icon></v-btn>
			</v-card-title>
			<v-data-table :headers="headers" :items="items" :search="search">

				<template #item.localidadE_ID="{ item }"><a><span @click="getItemInList(item)"
							:style="{ cursor: 'pointer' }">
							Código</span></a>
				</template>
			</v-data-table>
			<hr />
			<div>
				<v-btn @click="goToPesquisa" class="btn" rounded outlined color="#0672b9">Voltar</v-btn>
			</div>

		</v-card>
	</div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
	data() {
		return {
			teste: [],
			search: '',
			items: [],
			headers: [
				{
					text: 'Código',
					align: 'start',
					filterable: false,
					value: 'localidadE_ID',
				},
				{ text: 'Localidade', value: 'desC_LOCALIDADE' },

			],
			tableFooterProps: {
				'items-per-page-text': 'Linhas por página',
				'items-per-page-all-text': 'Todos',
				'items-per-page-of-text': 'de',
			},
			auxItem: {},
			excelData: [],
		}
	},
	computed: {
		...mapGetters({
			allItemsInLine: 'pesquisa/allItemsInLine',
			getStepCode: 'pesquisa/getStepCode',
			idUsuarioId: 'Usuario/idUsuarioId',
			getAllPesquisa: 'pesquisa/getAllPesquisa',
			usuarioId: 'pesquisa/usuarioId',
			inserir: 'usuario/getInserir',
			usuario: 'usuario/getUsuario',
			getFilterDate: 'pesquisa/getFilterDate'
		}),
	},
	mounted() {
		console.log(this.getFilterDate, "ress1")

		const res = this.getAllPesquisa.filter(item => item?.localidadE_ID === this.getFilterDate?.localidadE_ID)

		console.log(res, "ress")
		const arr = res.map(item => {
			return {
				localidadE_ID: item?.localidadE_ID ? item.localidadE_ID : null,
				// pesquisaCod: item.pesquisaCod ? item.pesquisaCod : null,
				desC_LOCALIDADE: item.desC_LOCALIDADE ? item.desC_LOCALIDADE : null,
			}
		})
		console.log(arr, "arr")
		this.items = arr
		if (this.items.length === 0) {
			this.items = this.getAllPesquisa
		}
	},
	methods: {
		async getList(item) {
			this.$store.commit('usuario/setUserState', item)
			this.$store.commit('usuario/setUserStep', true)
			this.$router.push('/Home')

		},
		getItemInList(item) {
			console.log(item, 'item');
			this.$store.commit('usuario/setListInLine', item)
			this.$router.push('/')

		},
		async downloadExcel() {

			const localidade = this.items.map(i => {
				return {
					localidadE_ID: i.localidadE_ID,
					desC_LOCALIDADE: i.desC_LOCALIDADE,
				}
			})
			const objExcel = {
				fields: localidade,
				title: 'Consulta de Localidade',
				headers: this.headers.filter(item => item.localidadeExcel ?? true),
			}

			await this.$store.dispatch('pesquisa/postExcel', objExcel)
		},
		goToPesquisa() {
			this.$router.push('/pesquisa')
		},
		...mapMutations({
			setItemsInLine: 'setItemsInLine',
			setUsuarioId: 'setUsuarioId',
		}),
	},
}
</script>
<style lang="scss" scoped>
.container {

	align-items: center;

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
	right: 4%;
}

.btn {
	margin-top: 2%;
	margin-left: 2%;
}
</style>