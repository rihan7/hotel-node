document.querySelector('#customFile').addEventListener('change', (event) => {
   const parentHtml = document.querySelector('.row.image');
   parentHtml.innerHTML = '';

   const files = event.target.files;
   for (let file of files) {
      const reader = new FileReader();
      reader.addEventListener('load', e => {
         html = `<div class="col-2">
         <div class="form-group">
            <img src='${e.target.result}'alt="..." class="img-thumbnail">
            </div>
         </div>`;
         parentHtml.insertAdjacentHTML('beforeend', html)
      })
      reader.readAsDataURL(file);
   }
});


const extra = document.querySelector('#extra');
const extraInput = extra.lastElementChild.outerHTML;
let extraAdd = document.querySelector('#basic-addon2');
const deleteHtml = '<span class="input-group-text delete-addon" ><i class="fas fa-trash"></i></span>';
const addExtraHandler = () => {
   extra.lastElementChild.lastElementChild.lastElementChild.remove();
   extra.lastElementChild.lastElementChild.insertAdjacentHTML('beforeend', deleteHtml)
   extra.insertAdjacentHTML('beforeend', extraInput);
}
const deleteHandler = () => {
   const list = document.querySelectorAll('.delete-addon');
   for (let [i, li] of list.entries()) {
      list[i].addEventListener('click', e => {
         list[i].closest('.input-group').remove();
      })
   }
}

extra.addEventListener('click', event => {
   if (event.srcElement.id == 'basic-addon2' || event.srcElement.id == 'add') {
      addExtraHandler();
      deleteHandler();
   };
})

deleteHandler();