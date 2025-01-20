import { createPool, Pool, PoolConnection } from "mariadb";

export class Database {
	private static pool: Pool;

	public static connect() {
		try {
			this.pool = createPool({
				host: "localhost",
				user: "fluxora",
				password: "3G2;Yx29*c[qDLf~(7Es",
				database: "fluxora"
			});

			console.log("Successfully connected to database !");
		} catch (err) {
			console.error(`Database connection failed: ${err}`)
			process.exit(1)
		}
	}

	private static async isAlive(): Promise<boolean> {
		try {
			const connection = await this.pool.getConnection();

			await connection.ping();

			connection.release();

			return true;
		} catch (err) {
			console.error(`Connection ping test to database failed: ${err}`);

			return false;
		}
	}

	public static async monitor(): Promise<void> {
		while (true) {
			const isAlive = await this.isAlive();

			if (!isAlive) {
				console.error("Connection to database failed. Exiting...");
				process.exit(1);
			} else {
				await new Promise(r => setTimeout(r, 5000));
			}
		}
	}

	public static async execute(query: string, params: any[] = []): Promise<any> {
		let connection: PoolConnection | undefined = undefined;

		try {
			connection = await this.pool.getConnection();

			const result = await connection.query(query, params);

			return result;
		} catch (err) {
			console.log(`Error when executing query '${query}': ${err} `);
			throw err;
		} finally {
			if (connection) {
				connection.release();
			}
		}
	}

	public static async select(query: string, params: any[] = []): Promise<any[]> {
		return this.execute(query, params);
	}
}