## Instalación y ejecución

Clonar el proyecto del [repositorio de Github](https://github.com/danitome24/master-html-css-tools-2). Desde la consola
ejecutamos la comanda:

```
git clone git@github.com:danitome24/master-html-css-tools-2.git
```

Si no queremos o podemos descargar el proyecto vía Git, podemos descargarnos el proyecto des de la url https://github.com/danitome24/master-html-css-tools-2/archive/master.zip

Nos situamos con la consola en el directorio raiz del proyecto y nos disponemos a instalar las dependencias necesarias.
Para instalar las dependencias usaremos el gestor de paquetes Npm. Entonces ejecutamos:

```
npm i
```

Ahora ya tendremos las dependencias instaladas y para poder desarrollar en el proyecto, debemos ejecutar la comanda:

```
npm run dev
```

## Compilación para producción

Una vez tengamos listos los cambios y queramos preparar el proyecto para producción debemos de compilarlo para ello. Desde la consola,
ejecutando el comando `npm run build` compilamos el proyecto para desplegarlo en producción.

## Deploy a producción

Como infrastructura de producción usamos Netlify. Esta plataforma nos ofrece una plataforma como servicio que nos permite
subir aplicaciones web de forma gratuita. Al configurarlo con Github estaremos también aplicando CD (Continuous Deployment)
y por cada cambio que subamos al repositorio, se nos desplegará automáticamente en producción. Por lo tanto, una vez configurado,
no hará falta hacer ninguna otra acción extra para ver los cambios en la web.

La URL de producción para este proyecto es: https://uoc-tools.netlify.com/
