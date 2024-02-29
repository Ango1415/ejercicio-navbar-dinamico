<template>
    <form action="" class="container mb-3">
        <div class="row">
            <div class="col-md-8">
                <div class="mb-3">
                    <label for="" class="form-label">
                        Page Title
                    </label>
                    <input 
                    type="text" 
                    class="form-control"
                    v-model="pageTitle"> <!--Two way binding-->
                    <!--:value="pageTitle" //One way binding
                    @input="(e) => pageTitle = e.target.value"-->  <!--e es el evento, target es el elemento sobre el que se encuentra el evento, es decir la caja input, y value es el valor que tenga el input en el momento en el que se capturó el evento-->
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">
                        Content
                    </label>
                    <textarea 
                        type="text"
                        class="form-control"
                        rows="5"
                        v-model="content">
                    </textarea>
                </div>
            </div>
            <div class="col">
                <div class="mb-3">
                    <label for="" class="form-label">
                        Link Text
                    </label>
                    <input 
                        type="text" 
                        class="form-control"
                        v-model="linkText">
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">
                        Link URL
                    </label>
                    <input 
                        type="text" 
                        class="form-control"
                        v-model="linkURL">
                </div>
                <div class="row mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="published">
                        <label class="form-check-label" for="gridCheck1">
                            Published
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="mb-3">
            <button
                class="btn btn-primary"
                :disabled="isFormInvalid"
                @click.prevent="submitForm">
                Create Page
            </button>
        </div>
    </form>
</template>

<script setup>
    import {ref, inject, computed, watch} from 'vue'
    import {useRouter} from 'vue-router'

    const router = useRouter()
    const bus = inject('$bus')
    const pages = inject('$pages')

    let pageTitle = ref('')
    let content = ref('')
    let linkText = ref('')
    let linkURL = ref('')
    let published = ref(true)

    function submitForm(){
        if(!pageTitle.value || !content.value || !linkText.value || !linkURL.value){
            alert('Please fill all the form fields')
            return
        }

        let newPage = {
            link : { text: linkText.value, url: linkURL.value },
            pageTitle: pageTitle.value,
            content: content.value,
            published: published.value
        }

        pages.addPage(newPage)
        bus.$emit('page-created', newPage)
        router.push({path: '/pages'})
    }

    const isFormInvalid = computed( () => !pageTitle || !content || !linkText || !linkURL )

    //Importante, solo se puede hacer watch a variables reactivas, es decir que sean ref o reactive
    watch(pageTitle, (newTitle, oldTitle) => {
        if(linkText.value === oldTitle){
            linkText.value = newTitle
        }
    })

</script>
<!--
<script>
    export default{

        //emits: [pageCreated]  //Se pueden declarar los métodos emitidos de esta forma, pero usando objetos podemos realizar validaciones sobre los métodos que estemos emitiendo

        /*
        emits:{ //Tenga presente que la declaración de emits y estás validaciones son 100% opcionales, sin necesidad de esta declaración $emits funcionaría perfectamente
            pageCreated(pageObj){   //Ten presente que estas validaciones NO EVITARÁN la ejecución de la función, en caso que algún dato esté erroneo, lo único que hará esta val es enviar mensajes de error a la consola del navegador.
                if(!pageObj.pageTitle){
                    console.log('No se registró un título para la página')
                    return false
                }
                if(!pageObj.content){
                    console.log('No se registró contenido para la página')
                    return false
                }
                if(!pageObj.link || !pageObj.link.text || !pageObj.link.url){
                    console.log('No se registró contenido para la página')
                    return false
                }
                return true
            }
        },
        */
        /*
        computed:{
            isFormInvalid(){
                return (!this.pageTitle || !this.content || !this.linkText || !this.linkURL)
            }
        },
        */
        /*
        data(){
            return{
                pageTitle: '',
                content: '',
                linkText: '',
                linkURL: '',
                published: true,
            }
        },
        */

        /*
        methods:{
            submitForm(){
                if(!this.pageTitle || !this.content || !this.linkText || !this.linkURL){
                    alert('Please fill all the form fields')
                    return
                }

                /*Ejemplo de custom events*/
                //el signo $ indica que es una propiedad pública del objeto.
                //En el primer parámetro pasamos el método que vamos a emitir (o ejecutar) y en el segundo pasamos el parámetro para dicha func.
                /*
                this.$emit('pageCreated', {
                    link : {text: this.linkText, url: this.linkURL},
                    pageTitle: this.pageTitle,
                    content: this.content,
                    published: this.published
                })

                /*Limpiar el formulario*/
                /*
                this.pageTitle = ''
                this.content = ''
                this.linkText = ''
                this.linkURL = ''
                this.published = true
            },
        },
        */

        /*
        watch:{ //Ponemos el nombre del valor de la var sobre la cuál queremos mirar
            pageTitle(newTitle, oldTitle){ //Cuando el valor de pageTitle cambie este watcher se va a ejecutar
                if(this.linkText === oldTitle){
                    this.linkText = newTitle
                }
            }
        /*
        /*La diferencia entre computed y watcher es que computed realiza computos o calculos con los datos ya existentes y SIEMPRE retorna un valor, no hace cambios sobre los datos
        watch vigila los cambios sobre una propiedad o variable de nuestra pág y hacen cambios sobre el estado de nuestra app, es decir, sobre las propiedades o variables*/
        }
    }
</script>
-->