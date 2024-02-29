import {createRouter, createWebHashHistory} from 'vue-router'
import PageViewer from './views/PageViewer.vue'
import CreatePage from './views/CreatePage.vue'
import Pages from './views/Pages.vue'
import PagesList from './views/PagesList.vue'
import PageEdit from './views/PageEdit.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        //Parecen query params, en este caso estamos indicando que se debe pasar un index (1,2,3,etc...) para la pág, pero con el signo ? indicamos que no es obligatorio, es opcional
        //Al definir props como true habilitamos la posibilidad de enviar los query params como props para el componente que se desplegará, lo único que faltaría sería definir dichos props en el script del componente
        {path: '/:index?', component: PageViewer, props: true},

        {
            path: '/pages', 
            component: Pages, 
            children: [
                //{ path: '/create', component: CreatePage },   //Para las rutas hijas no hay necesidad de poner backslash al principio
                { path: '', component: PagesList },
                { path: 'create', component: CreatePage },
                { path: ':index/edit', component: PageEdit, props: true },
            ],
        },
    ]
})

export default router