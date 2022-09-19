const getHeader = token => {
    return {
        headers: {
            Authorization: token
        }
    }
}

export default getHeader