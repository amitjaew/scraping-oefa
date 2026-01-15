# Herramienta de Scraping

Esta es una herramienta de línea de comandos (CLI) para hacer scraping de sitios web.

## Prerrequisitos

Asegúrate de tener instalados Node.js y npm en tu sistema.

## Instalación

1.  Clona este repositorio o descarga los archivos.
2.  Abre una terminal en el directorio del proyecto.
3.  Instala las dependencias del proyecto con el siguiente comando:

    ```bash
    npm install
    ```

## Uso

Puedes ejecutar la herramienta de scraping utilizando el comando `npm start`, seguido de los argumentos necesarios.

### Argumentos

La herramienta acepta 2 o 3 argumentos numéricos, además de algunas banderas opcionales.

#### 2 Argumentos: `<jump>` y `<limit>`

*   `<jump>`: El número de elementos a omitir en cada iteración.
*   `<limit>`: El número máximo de elementos a scrapear.

Ejemplo:

```bash
npm start 5 10
```

Este comando iniciará el scraper, omitiendo 5 elementos en cada iteración y deteniéndose después de scrapear 10 elementos.

#### 3 Argumentos: `<start>`, `<jump>` y `<limit>`

*   `<start>`: El índice inicial desde el cual comenzar el scraping.
*   `<jump>`: El número de elementos a omitir en cada iteración.
*   `<limit>`: El número máximo de elementos a scrapear.

Ejemplo:

```bash
npm start 0 5 10
```

Este comando iniciará el scraper en el índice 0, omitirá 5 elementos en cada iteración y se detendrá después de scrapear 10 elementos.

### Banderas Opcionales

*   `--run-infinitely`: Ejecuta el scraper en un bucle infinito.
*   `--no-extract`: Evita que el scraper extraiga archivos.

Ejemplo de uso con banderas:

```bash
npm start 0 5 10 --run-infinitely --no-extract
```

## Scripts

El archivo `package.json` incluye los siguientes scripts:

*   `npm start`: Ejecuta la herramienta de scraping con los argumentos proporcionados.
*   `npm run clean`: Elimina todos los archivos de los directorios `data` y `files`.