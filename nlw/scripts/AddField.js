document.querySelector('#add-time').addEventListener('click', cloneField)

function cloneField(){
    //Duplicar os campos, que campos?
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true) //cloneNode = estrutura html
    
    // Pegar os campos
    const fields = newFieldContainer.querySelectorAll('input')
   
    // Para cada campo, limpar
    fields.forEach(function(field){
        field.value = ''
    })

    document.querySelector('#schedule-itens').appendChild(newFieldContainer)
}