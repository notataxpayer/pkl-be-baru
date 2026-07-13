import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

// swagger
import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from './config/swagger.js';

const app = express();

const allowedOrigins = ['http://localhost:5173','https://laporan-keuangan-tani-fe-production.up.railway.app/'];

app.use(
	cors({
		origin(origin, callback) {
			if (!origin || allowedOrigins.includes(origin)) {
				return callback(null, true);
			}
			return callback(new Error('Not allowed by CORS'));
		},
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	})
);
app.use(express.json());

// route swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => res.json(swaggerSpec));
app.get('/', (req, res) => res.redirect(302, '/api-docs'));

// route api
app.use('/api', routes);

export default app;
