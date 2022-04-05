import mqtt from "mqtt/dist/mqtt"

/**
 * this function helps to connect mqtt
 * @returns mqtt client
 */
export function connectMqtt() {
	// TODO: Nhét vô đây
	const client = mqtt.connect(
		`wss://${host}:${port}/mqtt`,
		{
			keepalive: 30,
			clean: true,
			useTLS: true,
			protocolVersion: 4,
			reconnectPeriod: 1000,
			connectTimeout: 30 * 1000,
			clientId,
			username,
			password,
			will: {
				topic: "WillMsg",
				payload:
					"Connection Closed abnormally..!",
				qos: 0,
				retain: false,
			},
			rejectUnauthorized: false,
		},
	)

	client.on("connect", function () {
		client.subscribe("presence", function (err) {
			if (err) {
				console.error(err)
				return
			}
		})
	})

	return client
}
