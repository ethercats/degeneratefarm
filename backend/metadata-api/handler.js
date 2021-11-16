const { buildMetadata, validateTokenId } = require('./helpers')

module.exports.getTokenMetadata = async (event) => {
    let statusCode = 200;
    let body;
    try {
        const tokenId = validateTokenId(event);
        const { pig } = buildMetadata(tokenId);
        body = JSON.stringify(
            {
                ...pig
            },
            null,
            2
        );
    } catch (err) {
        statusCode = 500;
        body = JSON.stringify(
            {
                error: err.message
            },
            null,
            2
        )
    }
    return {
        statusCode,
        body
    };
};
