const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const eventProtoPath = 'event.proto';
const eventProtoDefinition = protoLoader.loadSync(eventProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const eventProto = grpc.loadPackageDefinition(eventProtoDefinition).event;

const eventService = {
  getEvent: (call, callback) => {

    const event = {
      id: call.request.event_id,
      title: 'Example Event',
      description: 'This is an example event.',
  
    };
    callback(null, {event});
  },
  searchEvents: (call, callback) => {
    const { query } = call.request;

    const events = [
      {
        id: '1',
        title: 'Example Event 1',
        description: 'This is the first example event.',
      },
      {
        id: '2',
        title: 'Example Event 2',
        description: 'This is the second example event.',
      },

    ];
    callback(null, { events });
  },
  createEvent: (call, callback) => {
    const { query } = call.request;
    const event = {
      id: call.request.event_id,
      title: call.request.title,
      description: call.request.description,

    };
    callback(null, {event});
  }

};


const server = new grpc.Server();
server.addService(eventProto.EventService.service, eventService);
const port = 50051;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error('Failed to bind server:', err);
      return;
    }
  
    console.log(`Server is running on port ${port}`);
    server.start();
  });
console.log(`Event microservice running on port ${port}`);
