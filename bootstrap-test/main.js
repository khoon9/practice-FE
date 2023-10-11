const exampleInputEl = document.querySelector('#exampleInputEmail1')
const modalEl = document.querySelector('#exampleModal')

// shown.bs.modal 이벤트 발생시 exampleInputEl.focus() 수행
modalEl.addEventListener('shown.bs.modal', function(){
    exampleInputEl.focus()
})