const {
  createServer,
  useExtendContext,
  createPubSub,
} = require("@graphql-yoga/node");
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const pubSub = createPubSub();

async function main() {
  const server = createServer({
    schema: {
      typeDefs,
      resolvers
    },
    graphiql: {
      title: "Graphql Course",
      subscriptionsProtocol: "WS"
    },
    logging: true,
    plugins: [useExtendContext(() => ({ pubSub }))],
  });

  const httpServer = await server.start();

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  useServer(
    {
      execute: (args) => args.rootValue.execute(args),
      subscribe: (args) => args.rootValue.subscribe(args),
      onSubscribe: async (ctx, msg) => {
        const { schema, execute, subscribe, contextFactory, parse, validate } =
          server.getEnveloped(ctx);

        const args = {
          schema,
          operationName: msg.payload.operationName,
          document: parse(msg.payload.query),
          variableValues: msg.payload.variables,
          contextValue: await contextFactory(),
          rootValue: {
            execute,
            subscribe,
          },
        };

        const errors = validate(args.schema, args.document);
        if (errors.length) return errors;
        return args;
      },
    },
    wsServer,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});