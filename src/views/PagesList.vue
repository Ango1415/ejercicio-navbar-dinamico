<!--Usaremos este componente para estudiar Composition API-->
<template>
    <!--<p>{{ counter }}</p>-->
    <h4>Pages</h4>
    <div class="text-end">
        <router-link
            to="/pages/create"
            class="btn btn-primary btn-sm"
        >New Page</router-link>

    </div>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>Title</th>
                <th>Link Text</th>
                <th>Is Published?</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(page, index) in $pages.getAllPages()"
            :key="index"
            @click="goToPage(index)">
                <td>{{ page.pageTitle }}</td>
                <td>{{ page.link.text }}</td>
                <td>{{ page.published ? 'Yes' : 'No'}}</td>
            </tr>
        </tbody>
    </table>
    <!--
    <p>{{ data.counter }}</p>
    <button @click.prevent="click">Click me</button>
    -->
</template>

<script setup>  //Para que Composition API funcione es importante usar el parámetro 'setup' de nuestra etiqueta script
    //Esta es la version de Vue 3 Composition API
    import { ref, reactive, inject } from 'vue'    //Estas dos nos servirán para crear valores reactivos
    import { useRouter } from 'vue-router'
    
    const data = reactive({counter: 0})   //Esto es solo para objetos
    const $pages = inject('$pages')
    const router = useRouter()
    
    function click(){
        data.counter++
    }
    
    function goToPage(index){
        router.push({path: `pages/${index}/edit`})
    }
    
    /*
    const counter = ref(0) //{value:0} ref es para hacer reactiva una variable, se puede de cualquier tipo
    function click(){
        counter.value++
    }

    */
    // Esta es la versión de Vue Options API
    /*
    export default{
        data(){
            return{
                counter: 0
            }
        },

        methods:{
            click(){
                this.counter++
            }
        }
    }
    */

   //Esta es la versión de Vue 2 Composition API
   /*
    let counter = 0

    function setup(){
        return{
            counter,
            click: () =>{}
        }
   }
   */

</script>

<style scoped>
    .table.table-hover tr:hover{
        cursor: pointer;
    }
</style>