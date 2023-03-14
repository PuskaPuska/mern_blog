export default (req,res,next) => {
    const creator = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123');

            req.userId = decoded._id;
            next();
        } catch (err) {
            return res.status(403).json({
                message: 'нет доступа',
             });
        }
    } else {
         return res.status(403).json({
            message: 'нет доступа',
         });
    }
    
};