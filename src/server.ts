import express from 'express'


class Server {
    app: express.Application
    constructor() {
        this.app = express()
        this.config()
    }

    config(){
        this.app.set('port', process.env.PORT || 4000)
    }

    routes() {

    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server listening on port', this.app.get('port'));
            
        })
    }

}

const server = new Server()
server.start()