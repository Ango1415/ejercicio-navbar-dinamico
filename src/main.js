import { VueElement, createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import $bus from './utils/Events'   //Aquí tendremos definidos nuestros eventos globales
import $pages from './data'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

const app = createApp(App)

//Conectamos el router para que pueda funcionar
app.use(router)

/*VARIABLES GLOBALES*/
//Añadimos la configuración para añadir el bus de eventos globales
//app.config.globalProperties.$bus = $bus
//Hacemos uso de los datos globales 'data' para poder acceder a los datos de las páginas que hemos creado hasta el momento
//app.config.globalProperties.$pages = $pages

//De esta forma podríamos acceder a las variables globales su el uso de this
//Vue.prototype.$pages

//Esta es otra forma, usando inyección de dependencias
//En el caso de componentes hijos o rutas hijas se usaria los props para inyectar datos
//Pero en el caso de PageList, que es independiente en un inicio de los demás componentes, se necesita realizar otra forma
app.provide('$pages', $pages)   //Provee de la lista de páginas al componente App (que es el padre de todos los componentes en la app) y los transmite a todos sus componentes hijos
app.provide('$bus', $bus)

app.mount('#app')
