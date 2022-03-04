import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';

const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'led-object',
  }),
});

provider.register();
provider.addSpanProcessor(new SimpleSpanProcessor(new JaegerExporter()));

registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation({
      headersToSpanAttributes: {
        server: {
          requestHeaders: ['accept', 'if-none-match'],
          responseHeaders: ['etag'],
        },
      },
    }),
  ],
});
