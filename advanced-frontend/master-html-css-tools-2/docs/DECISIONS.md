## Metodología y decisiones de diseño

La metodología que he escogido ha sido BEM (Block Element Modifier). La razón es ya que me parece una metodología bastante
simple e intuitiva. Otra razón es que yo estoy acostumbrado a usar la librería de Bootstrap la cual está basada en BEM.

En el parcial `_styles.scss` podemos ver que he creado estilos con el sufijo `*-block` que hacen referencia a los bloques.
Para identificar elementos he usado el sufijo `*-item` y los modificadores los podemos encontrar en el parcial `_modifiers.scss`.

Todo lo que tenga que ver con estructura lo pondremos en el parcial `_grid.scss`. Aquí podemos tener columnas, filas, anchos, etc.
Por último, tendremos el parcial `_variables.scss` donde tendremos las variables que se usarán en nuestros ficheros.

## Dependencias

* FontAwesome: Hemos introducido las fuentes para el timeline.
