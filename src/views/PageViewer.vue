<template>
    <div v-if="page" class="container">
        <h1 class="emphasize">{{ page.pageTitle }}</h1>     <!--La clase CSS emphasize fue definida en el componente NavbarLink, esto quiere decir que los estilos definidos en cierta parte del proyecto se pueden aplicar de forma global-->
        <p>{{ page.content }}</p>
    </div>
</template>

<script>
    export default{
        //props: ['page'] //Props es lo que se espera que se pase como arguentos cuando se llame al componente
        props: ['index'],
        inject: ['$pages'],
        /*
        props:{
            page:{
                typa: Object,
                default(rawProps){
                    return{
                        pageTitle: '',
                        content: ''
                    }
                }
            }
        }
        */
       created(){
            //console.log(this.$route.params)
            //Esta es una forma de solucionar el problema de refrescar el componente cuando cambiamos de indice, pero hay otra, y es recibir el indice como prop, esto se define desde el archivo de routes.js
            //this.page = this.$pages.getSinglePage(this.$route.params.index)
            //Es similar a lo que definiamos anteriormente como watch, solo que esta forma se hace programaticamente, es decir, como parte de la funcionalidad al 'crear' o desplegar inicialmente una pág.
            /*El primer parámetro de watch será los valores que estará vigilando, en este caso serán todos los parámetros de las páginas que se encuentren en el router, como segundo parametro pasaremos la función que se ejecutará cuando se realice algún tipo de cambio sobre los datos que estamos observando */
            //this.$watch(() => this.$route.params, (newParams, prevParams) => {
            //    this.page = this.$pages.getSinglePage(newParams.index)
            //})
            //IMPORTANTE: Usamos el watch de esta forma programática cuando no tenemos una variable definida dentro del mismo componente a la que tengamos que estar vigilando (watching) y por el contrario se está vigilando una variable o propiedad fuera del mismo componente (por ejemplo las variables globales $)

            //Esta es la segunda forma, recibiendo el index como prop
            this.page = this.$pages.getSinglePage(this.index)
       },

       data(){
            return{
                page: null
            }
       },

       watch:{  //Ya que tenemos nuestro index definido como una variable local para nuestro componente ahora si podremos definir el watcher para esta propiedad
            index(newIndex, oldIndex){
                this.page = this.$pages.getSinglePage(newIndex)
            }
       }
    }
</script>

<style scoped>
    .emphasize{
        color: blue;
    }
</style>