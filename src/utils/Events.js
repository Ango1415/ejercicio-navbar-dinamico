/*Esta es una forma de implementar bus events en vue 3, los bus events, por lo que entiendo del tutorial, es una serie de eventos que se encontrarán disponibles para todos los componentes dentro del proyecto*/
const events = new Map()

export default{
    $on(eventName, fn){
        if(!events.has(eventName)){
            events.set(eventName, [])
        }

        events.get(eventName).push(fn)
    },

    $off(eventName, fn){
        throw {message: 'Not implemented'}
    },

    $emit(eventName, data){
        if(events.has(eventName)){
            events.get(eventName).forEach( fn => fn(data) )
        }
    }
}