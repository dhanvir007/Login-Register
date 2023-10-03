const mongoose = require('mongoose');

const connectDB =async () =>{
    try {
        const connect = (await mongoose.connect(process.env.MONGOOSE_URL ))
        console.log(`Database server started :`, connect.connection.name)
    } catch (error) {
        console.log(`Database has some error `,{message :error.message})
    }
}

module.exports= connectDB
