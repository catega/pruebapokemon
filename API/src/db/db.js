const mongoose = require('mongoose')

const dbStart = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('[+] DB conectada')
    } catch (err) {
        console.log(`[!] DB error: ${err}`)
    }
}

dbStart()