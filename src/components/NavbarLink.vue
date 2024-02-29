<template>
    <!-- Antes era <a>
        @click.prevent="$bus.$emit('navbarLinkActived', index)" 
        :href="page.link.url"
        :class="activeClasses"
        el parámetro to remplaza al href para el router-link-->
    <router-link 
        :to="`/${index}`"
        class="nav-link"
        active-class="active emphasize"
        aria-current="page"
        :title="`This link goes to the ${page.link.text} page`"
    >{{ page.link.text }}</router-link>
</template>

<script>
export default{
    props: ['page', 'index'],
    //props: ['page', 'index', 'isActive'],
    /*
    computed:{
        activeClasses() {
            return{
                active: this.isActive,  //En este caso, si es activa la clase, se va a resaltar el texto del link que se encuentre activo
                emphasize: this.isActive,
            }
        },
    }
    */
}
</script>

<!--<style scoped> Si aplicamos la propiedad scoped a nuestros estilos de este componente ya NO SE PODRÁN aplicar de forma global a todo el proyecto, únicamente se aplican dentro de este componentes (script)-->
<style scoped>
/*.emphasize {
    text-decoration: underline !important;
}
*/
</style>