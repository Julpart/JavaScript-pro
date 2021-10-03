Vue.component('error',{
    data(){
        return {
            showError: false,
        
        }
    },
    methods:{
        errorTrue(){
            this.showError = true;
        },
        errorFalse(){
            this.showError = false;
        }

    },

    template: `
    <div class = "error-block" v-show="showError">
    <p class = "error-text">Errrrrror</p>
    <button class="del-btn" @click="errorFalse">&times;</button>
    </div>
    `



})