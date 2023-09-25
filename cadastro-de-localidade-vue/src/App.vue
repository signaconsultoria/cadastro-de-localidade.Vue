<template>
	<v-app>
		<v-main>
			<router-view />
		</v-main>
		<v-snackbar :color="snackbarColor" v-model="snackbar" @input="change">
			{{ snackbarMessage }}
		</v-snackbar>
	</v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'App',
	data: () => ({
		snackbar: false,
		snackbarColor: ''
	}),
	async mounted() {
		await this.$store.dispatch('auth/getPermissao')
	},
	computed: {
		...mapGetters({
			getSnackbar: 'snackbar',
			snackbarMessage: 'snackbarMessage',
		}),
	},
	watch: {
		getSnackbar() {
			this.snackbar = this.getSnackbar
		},
		snackbarMessage() {
			/*
			Altera a cor da snackbar dependendo da mensagem no padrão de cores 
			atuais do figma | VERDE -> SUCESSO | AMARELO -> AVISO | VERMELHO -> ERRO
			*/
			if (this.snackbarMessage.startsWith('Inclusão efetuada com sucesso.') == true || this.snackbarMessage === 'Alteração efetuada com sucesso.' || this.snackbarMessage === 'Exclusão efetuada com sucesso.') this.snackbarColor = '#00BFA1'
			if (this.snackbarMessage === 'Preencha Localidade' || this.snackbarMessage === 'Apenas valores numericos' || this.snackbarMessage === 'Informe uma Localidade.' || this.snackbarMessage === 'Os CEPS tem que conter 8 caracteres' || this.snackbarMessage === 'Informe alguma localidade para efetuar a consulta.' || this.snackbarMessage === 'Localidade, Código, CEP, Código Externo: um destes filtros deve ser preenchido.' || this.snackbarMessage.startsWith('O fornecedor já está ligado ao grupo') === true) this.snackbarColor = '#FFAB00'
			if (this.snackbarMessage.startsWith('Nada encontrado.') === true) this.snackbarColor = '#FFAB00'

		}
	},
	methods: {
		change() {
			this.$store.dispatch('setSnackbar', { status: false, message: '' })
		},
	},
}
</script>
