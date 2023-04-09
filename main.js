window.addEventListener('DOMContentLoaded', () => {
   
    const fragment = document.createDocumentFragment();
const tablaProductos = document.querySelector('#productos');
const tablaSeleccionados = document.querySelector('#seleccionados');

const getInitialProducts = () => [
  { id: 'a-1', fruta: 'Plátano', cantidad: 1 },
  { id: 'a-2', fruta: 'Fresa', cantidad: 1 },
  { id: 'a-3', fruta: 'Coco', cantidad: 1 },
  { id: 'a-4', fruta: 'Melón', cantidad: 1 },
];

const arrayProductosSeleccionados = JSON.parse(localStorage.getItem('productos')) || [];
const arrayProductos = getInitialProducts();





    
  
    document.addEventListener("click", ({target}) => {
        if(target.matches('#add')){
          const id = target.dataset.id;
          almacenarProducto(id);
        };
        if(target.matches('#delete')){
          const id = target.dataset.id;
          eliminarProducto(id);
        };
        if(target.matches('#del-all')){
          localStorage.clear();
          location.reload();
        };
      });
      
      const pintarProductos = () => {
        arrayProductos.forEach((item) => {
          const productoTR = document.createElement('TR');
          const productoTD = document.createElement('TD');
          productoTD.id = item.id;
          productoTD.textContent = item.fruta;
          const addBtnTD = document.createElement('TD');
          const addBtn = document.createElement('BUTTON');
          addBtn.textContent = "Añadir";
          addBtn.id = 'add';
          addBtn.dataset['id'] = item.id;
          addBtnTD.append(addBtn);
          productoTR.append(productoTD, addBtnTD);
          fragment.append(productoTR);
        });
        tablaProductos.append(fragment);
      };
      
      const setLocal = () => {
        localStorage.setItem('productos', JSON.stringify(arrayProductosSeleccionados));
      };
      
      const almacenarProducto = (id) => {
        const index = arrayProductosSeleccionados.findIndex( item => item.id == id);
        if(index == -1){ // no existe el producto en localStorage
          const producto = arrayProductos.find( item => item.id == id);
          arrayProductosSeleccionados.push(producto);
          setLocal();
          pintarSeleccionados();
        } else { // sí existe el producto en localStorage
          const producto = arrayProductos.find( item => item.id == id);
          producto.cantidad++;
          setLocal();
          pintarSeleccionados();
        };
      };
      
      const pintarSeleccionados = () => {
        tablaSeleccionados.innerHTML = '';
        arrayProductosSeleccionados.forEach((item) => {
          const seleccionadoTR = document.createElement('TR');
          const seleccionadoTD = document.createElement('TD');
          seleccionadoTD.id = item.id;
          seleccionadoTD.textContent = item.fruta;
          const cantidadTD = document.createElement('P');
          cantidadTD.textContent = item.cantidad;
          const delBtnTD = document.createElement('TD');
          const delBtn = document.createElement('BUTTON');
          delBtn.id = 'delete';
          delBtn.dataset['id'] = item.id;
          delBtn.textContent = 'Eliminar';
          delBtnTD.append(delBtn);
          seleccionadoTR.append(seleccionadoTD, cantidadTD, delBtnTD);
          fragment.append(seleccionadoTR);
        });
        const delAllBtnTR = document.createElement('TR');
        const delAllBtnTD = document.createElement('TD');
        delAllBtnTD.setAttribute('colspan', 3);
        const delAllBtn = document.createElement('BUTTON');
        delAllBtn.id = 'del-all';
        delAllBtn.textContent = 'Borrar productos';
        delAllBtnTD.append(delAllBtn);
        delAllBtnTR.append(delAllBtnTD);
        tablaSeleccionados.append(fragment, delAllBtnTR);
      };
      
      const eliminarProducto = (id) => {
        const producto = arrayProductosSeleccionados.find( item => item.id == id);
        if(producto.cantidad > 1){
          producto.cantidad--
          setLocal();
          pintarSeleccionados();
        } else {
          const index = arrayProductosSeleccionados.findIndex( item => item.id == id);
          arrayProductosSeleccionados.splice(index, 1);
          setLocal();
          pintarSeleccionados();
        };
      };
      
      const init = () => {
        pintarProductos();
        pintarSeleccionados(); 
      };
      
      init();
    });//LOAD