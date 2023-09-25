
<template>
    <v-card>
        <div class='container'>

            <div class="header">
                <div class="step">
                    <p class="title">Código</p>
                </div>
                <div class="step">
                    <p class="title">CEP Inicial</p>
                </div>
                <div class="step">
                    <p class="title">CEP Final</p>
                </div>
                <div class="step">
                    <p class="title">Ok</p>
                </div>
            </div>

            <div class="content" v-for="item in getData" @click="getList2(item)">
                <div class="step">
                    <span>{{ item.faixa_Localidade_Id ? item.faixa_Localidade_Id : 'Sem dados' }}</span>
                </div>
                <div class="step">
                    <span>{{ item.cep_Ini ? item.cep_Ini : 'Sem dados' }}</span>
                </div>
                <div class="step">
                    <span>{{ item.cep_Fim ? item.cep_Fim : 'Sem dados' }}</span>
                </div>
                <div class="step">
                    <button @click="getItemInTable(item)" class="btna">Ok</button>

                </div>
            </div>
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
                { name: 'Ok', id: 4 },
            ]
        }
    },
    props: {
        dataa: Array,
        getList2: Function,
        getItemInTable: Function
    },
    computed: {
        ...mapGetters({
            getInserir: "usuario/getInserir",
            getData: "usuario/getData"
        }),

    }
}

</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;

}


.header {
    border-bottom: 1px solid #cdcdcd;
    display: flex;
    justify-content: space-between;
}

.content {
    height: 47px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #cdcdcd;
    align-items: center;
}

.step {
    width: 50%
}

.title {
    font-size: 10px;
    font-family: sans-serif;
    color: #0d0c0c;
    margin-left: 20px;
}

.btna {
    border-radius: 30px;
    width: 70px;
    border: 2px solid #3498db;
    color: #3498db !important;
    height: 35px;
    display: block;
    margin: 50 auto;
}

span {
    margin-left: 20px;
}
</style>