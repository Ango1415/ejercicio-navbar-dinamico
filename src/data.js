const pageKey = 'pages'
let pagesJSON = localStorage.getItem(pageKey)
let pagesStore = JSON.parse(pagesJSON)

function saveChanges(){
    localStorage.setItem(pageKey, JSON.stringify(pagesStore))
}

export default{
    getAllPages(){
        return pagesStore
    },

    getSinglePage(index){
        return pagesStore[index]
    },

    editPage(index, page){
        pagesStore[index] = page
        saveChanges()
    },

    addPage(page){
        pagesStore.push(page)
        saveChanges()
    },

    removePage(index){
        pagesStore.splice(index, 1)
        saveChanges()
    }
}