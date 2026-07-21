Este proyecto corresponde al desarrollo de un Sistema de Gestión Escolar realizado como parte del curso de Base de Datos de la Universidad de Lima. Su objetivo principal es aplicar los conceptos de modelado de bases de datos, programación en Oracle y desarrollo de aplicaciones para construir una solución que permita administrar de forma eficiente la información de una institución educativa.

La aplicación fue diseñada para centralizar la gestión de los principales procesos administrativos de un colegio, reemplazando tareas manuales por un sistema organizado que facilita el registro, consulta, actualización y eliminación de información. A través de una interfaz intuitiva, el sistema permite administrar alumnos, apoderados, matrículas, personal administrativo y docente, así como el registro de pagos y la generación de reportes.

*Funcionalidades principales*

El sistema está compuesto por los siguientes módulos:

Dashboard: muestra un resumen general del estado del sistema mediante indicadores y accesos rápidos.
Gestión de Alumnos: permite registrar, consultar, actualizar y eliminar la información de los estudiantes.
Gestión de Apoderados: administra los datos personales y de contacto de los apoderados.
Gestión de Matrículas: registra la matrícula de los alumnos asociándolos a un salón y a un año escolar.
Gestión de Personal: administra la información del personal de la institución educativa.
Gestión de Pagos: registra recibos de pago y sus respectivos detalles.
Reportes: permite consultar información consolidada de la base de datos para facilitar el seguimiento de los procesos administrativos.
Base de datos

La base de datos fue desarrollada en Oracle Database Express Edition (Oracle XE) e implementa diversos mecanismos propios del gestor para garantizar la integridad y consistencia de la información.

Entre los objetos desarrollados se encuentran:

16 procedimientos almacenados, encargados de realizar operaciones de registro, actualización y eliminación con sus respectivas validaciones.
5 funciones, utilizadas para automatizar cálculos y consultas frecuentes, como el cálculo de la edad de un alumno o la cantidad de estudiantes matriculados por salón.
1 trigger de auditoría, encargado de registrar automáticamente las operaciones de matrícula para mantener un historial de cambios y demostrar el uso de mecanismos de automatización dentro de la base de datos.
Tecnologías utilizadas
Oracle Database Express Edition (Oracle XE)
Oracle SQL Developer
Node.js
Express.js
HTML5
CSS3
JavaScript
Docker Desktop (para la virtualización del entorno de Oracle)

Objetivo académico:

Más allá de desarrollar una aplicación funcional, este proyecto tuvo como finalidad integrar los conocimientos adquiridos durante el curso, aplicando conceptos de modelado entidad-relación, normalización, procedimientos almacenados, funciones, triggers, consultas SQL y desarrollo de aplicaciones conectadas a una base de datos Oracle.

El resultado es un sistema completamente funcional que demuestra la integración entre el diseño de bases de datos y el desarrollo de software, sirviendo como evidencia práctica de las competencias adquiridas durante el desarrollo del curso.
