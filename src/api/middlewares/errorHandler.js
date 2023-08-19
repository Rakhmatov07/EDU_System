export const errorHandler = (err, _, res) => {
    if( err instanceof Error ) {
        res.status(500).json({error: 'Internal server error'});
    }else{
        res.status(err.statusCode).json({error: err.message});
    }
};
