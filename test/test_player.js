import chai from "chai"
import io from "socket.io-client"
import {startServer, configureStore} from './helpers/server'
import Board from '../src/server/models/Board'
import params from '../params'

chai.should()

describe('Board class test', function(){
  let socket;
  let tetrisServer
  before(cb => startServer( params.server, function(err, server){
    tetrisServer = server
    cb()
  }))
  before(() => {
    socket = io.connect(params.server.host + ':' + params.server.port);
  })

  after(function(done){tetrisServer.stop(done)})

  it('should create board', function(done){
    socket.on("disconnect", function(){
      console.log("client disconnected from server");
    });
    done()
  })
});