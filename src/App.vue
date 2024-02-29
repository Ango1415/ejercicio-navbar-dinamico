<template>
  <!--Vamos a utilizar los componentes creados-->
  <!-- pasamos los props para cada componente, no estoy realmente seguro de dónde vendra la definición formal de los nombres en html tanto de las etiquetas que usamos para cada uno de los componentes ni de sus props -->

  <!--parámetros deprecados:
    :active-page = "activePage"
  -->
  <!--
  <navbar 
    :pages = "pages"  
  ></navbar>
    -->
  <navbar></navbar>

  <router-view></router-view>

  <!--
  <page-viewer
    v-if="pages.length > 0"
    :page="pages[activePage]"
  ></page-viewer>

  <create-page
    @page-created="pageCreated"   
  ></create-page> 
   //@page-created es un ejemplo de custom events 
   -->
</template>

<script>
  import Navbar from './components/Navbar.vue'
  //import PageViewer from './views/PageViewer.vue'
  //import CreatePage from './views/CreatePage.vue'

  export default {
    components:{
      Navbar,
        //PageViewer,
        //CreatePage,
    },

    //Este created está relacionado con el ciclo de vida de los datos en Vue, created es una de las primeras etapas al ejecutar un proyecto en Vue
    //Creo que en este ciclo de vida el 'data()' tiene prioridad, osea ocurre primero, pero 'created' viene despues de este y antes de la creación de los elementos en pantalla, por eso es un muy buen método para poblar los datos necesarios para desplegar los elementos en pantalla
    /*
    created(){
      this.getPages()
      this.$bus.$on('navbarLinkActived', (index) => {
        this.activePage = index
      })
      
    },
    */

    /*
    //La razón por la que métodos y variables relacionadas con las páginas son comentadas (dejadas de lado) es porque se centralizo el uso y acceso a los datos con el script data.js
    data(){
      return {
        activePage: 0,
        pages: []
      }
    },
    */

    methods: {
      /*
      async getPages(){
        let res = await fetch('pages.json')
        let data = await res.json()
        this.pages = data
        //return data
      },
      */
      pageCreated(pageObj){
        this.pages.push(pageObj)
      }
    }
  }
</script>