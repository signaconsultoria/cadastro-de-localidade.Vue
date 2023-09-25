
<template>
    <v-card>
        <div class='container'>
            <div class="header">
                <div class="step">
                    <p class="title">Localidade</p>
                </div>
                <div class="step">
                    <p class="title">Código</p>
                </div>

                <!-- <div class="step">
                    <p class="title">Ok</p>
                </div> -->
            </div>
            <!-- <div v-if="getAllPesquisa && getAllPesquisa.length > 0"> -->

            <div class="content" v-for="item in getAllPesquisa">
                <div class="step">
                    <span>{{ item.desC_LOCALIDADE ? item.desC_LOCALIDADE : 'Sem dados' }}</span>
                </div>
                <div class="step">
                    <span>{{ item.localidadE_ID ? item.localidadE_ID : 'Sem dados' }}</span>
                </div>
                <!-- <div class="step">
                    <button @click="getItemInTable(item)" class="btna">Ok</button>

                </div> -->
            </div>
            <!-- </div> -->
        </div>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {

            data: [

                { name: 'KElly', id: 1 },
                { name: 'João', id: 2 },
                { name: 'Gustavo', id: 3 },
            ]
        }
    },
    props: {
        dataa: Array,
        getList2: Function,
        // getItemInTable: Function
    },
    computed: {
        ...mapGetters({
            getInserir: "usuario/getInserir",
            getData: "usuario/getData",
            getAllPesquisa: 'pesquisa/getAllPesquisa',

        }),

    },
    methods: {
        getItemInTable(item) {
            console.log(item, 'itemTable')
            this.cod = item.localidadE_ID
            this.locality = item.desC_LOCALIDADE
            this.square = item.praca
            this.stat = 'Ativo'
            this.codeSquare = {
                locality: item.desC_LOCALIDADE,
                cod: item.localidadE_ID
            },
                this.$store.commit('grupo/setFaixaLoc', this.codeSquare)

        },
    }

}

</script>

<style scoped>
.header {
    border-bottom: 1px solid #cdcdcd;
    display: flex;
    justify-content: space-between;
}

.content {
    height: 50px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #cdcdcd;
    align-items: center;

}

.step {
    width: 80%
}

.title {
    font-size: 30px;
    font-family: sans-serif;
    color: #0d0c0c;
    margin-left: 30%;
}


span {
    margin-left: 30%;


}
</style>