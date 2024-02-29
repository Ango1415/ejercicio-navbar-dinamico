<template>
    <nav :class="[`navbar-${theme}`, `bg-${theme}`, `navbar`, `navbar-expand-lg`]">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">My Vue</a>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <!--parametros que se usaron antes pero ya no
                    class="nav-item"
                    :key="index"
                    :isActive="activePage === index"
                    @actived="$emit('actived')"-->
                <li v-for="(page, index) in pages" :key="index">
                    <navbar-link
                        v-if="page.published"
                        :page="page"
                        :index = "index"
                    ></navbar-link>
                </li>
                <li>
                    <router-link 
                        to="/pages"
                        class="nav-link"
                        active-class="active"
                        aria-current="page"
                    >Pages</router-link>
                </li>
            </ul>
            <form class="d-flex">
                <button
                    class="btn btn-primary"
                    @click.prevent="changeTheme()"
                >Toggle</button>
            </form>
        </div>
    </nav>
</template>

<script>
import { inject } from 'vue'
    import NavbarLink from './NavbarLink.vue'
    export default{
        //props: ['pages', 'activePage'],
        //props: ['pages'], //Ya no se recibe como prop porque ahora se pueden acceder a los datos de las páginas de forma global mediante el script data.js
        inject: ['$pages', '$bus'],

        components:{
            NavbarLink,
        },

        created(){
            this.getThemeSetting()
            this.pages = this.$pages.getAllPages()
            //Esto lo hacemos para que se actualice el navbar al agregar una nueva pág
            this.$bus.$on('page-updated', () => {
                this.pages = [... this.$pages.getAllPages()]    //Esto se hace para crear un array nuevo y poblarlo con los datos existentes en this.$pages.getAllPages(), se hace porque al pasar solo la referencia anterior se obtiene el array viejo y no detecta los cambios, según le entendí al man
            })

            this.$bus.$on('page-created', () => {
                this.pages = [... this.$pages.getAllPages()]    //Esto se hace para crear un array nuevo y poblarlo con los datos existentes en this.$pages.getAllPages(), se hace porque al pasar solo la referencia anterior se obtiene el array viejo y no detecta los cambios, según le entendí al man
            })

            this.$bus.$on('page-deleted', () => {
                this.pages = [... this.$pages.getAllPages()]    //Esto se hace para crear un array nuevo y poblarlo con los datos existentes en this.$pages.getAllPages(), se hace porque al pasar solo la referencia anterior se obtiene el array viejo y no detecta los cambios, según le entendí al man
            })
        },
        
        data(){
            return{
                theme: 'light',
                pages: []
            }
        },

        methods: {
            changeTheme(){
                let theme = 'light'     //Esta es una variable local del método
                if(this.theme === 'light'){     //Cuando hace referencia a 'this.theme' es el valor del 'objeto' definido en data() y que se aplicará a todo el componente. no solo a este métod
                    theme = 'dark'
                }
                this.theme = theme
                this.storeThemeSetting()
            },
            storeThemeSetting(){
                localStorage.setItem('theme', this.theme)   //Este localStorage almacena datos en una memoria corta del navegador
            },
            getThemeSetting(){
                let theme = localStorage.getItem('theme')
                if(theme){
                    this.theme = theme
                }
            }
        },
        /*
        computed:{
            publishedPages(){
                return this.pages.filter(page => page.published)
            }
        }
        */
    }
</script>