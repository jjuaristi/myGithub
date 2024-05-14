const enlacesImagenes = document.querySelectorAll('.contenedor-imagenes a');
const imagenPrincipal = document.getElementById('imagen-principal');

enlacesImagenes.forEach(enlace => {
    enlace.addEventListener('mouseover', () => {
        const rutaImagen = enlace.getAttribute('data-imagen');
        imagenPrincipal.src = rutaImagen;
    });

    enlace.addEventListener('mouseout', () => {
        imagenPrincipal.src = 'img/flores.webp'; // Imagen por defecto
    });
});
