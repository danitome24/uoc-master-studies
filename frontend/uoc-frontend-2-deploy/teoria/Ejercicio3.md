## Angular Universal con Schematics

Los ficheros que se han generado y/o modificado son:

* src/
  * main.server.ts: Se encarga de exportar el servidor node para su uso.
  * main.ts: Se ha modificado para que el servidor carge el AppModule.
  * app/:
    * app.module.ts: Se ha añadido el BrowserModule.
    * app.server.module.ts: Encargado de cargar el ServerModule.
* server.ts: El fichero JS con todo el contenido del Servidor http usando express.
* tsconfig.server.json: Configuración del servidor como donde depositar los ficheros compilados, los ficheros 
referentes al servidor, etc.

