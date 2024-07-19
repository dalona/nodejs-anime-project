// const errorHandler = (err,req,res) => {
//     console.error(err.stack);
//     res.status(500).send({ "error": err.message, 'message' : "Ocurrio un error en el servidor" });
// }

// export default errorHandler //exportar una sola cosa una sola funcion un solo archivo, variable

// //export default el import va sin los corchetes


function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the stack trace for debugging

    // Handle specific types of errors
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ error: 'Bad JSON' }); // Example for handling JSON parsing errors
    }

    // Default error handling
    res.status(500).send('Internal Server Error');
}

export default errorHandler;